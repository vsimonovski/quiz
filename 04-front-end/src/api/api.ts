import axios, { AxiosResponse } from 'axios';
import { appConfiguration } from '../config/app.config';

type ApiMethod = 'get' | 'post' | 'put' | 'delete';
type ApiRole = 'user' | 'guest';
type ApiResponseStatus = 'ok' | 'error';

export interface ApiResponse {
    status: ApiResponseStatus;
    data: any;
}

export const api = (
    method: ApiMethod,
    path: string,
    role: ApiRole = 'user',
    body: any | undefined = undefined,
    attemptToRefresh: boolean = true
): Promise<ApiResponse> => {
    return new Promise<ApiResponse>((resolve) => {
        axios({
            method: method,
            baseURL: appConfiguration.api.baseUrl,
            url: path,
            data: body ? JSON.stringify(body) : '',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${getAuthToken()}`,
            },
        })
            .then((res) => responseHandler(res, resolve))
            .catch(async (err) => {
                const errResponse = err?.response;

                if (attemptToRefresh && ('' + errResponse).includes('401')) {
                    const newToken: string | ApiResponse = await refreshToken();

                    if (typeof newToken !== 'string') {
                        return resolve({
                            status: 'error',
                            data: {
                                error: 'Not able to generate new refresh token',
                            },
                        });
                    }

                    setAuthToken(newToken);

                    api(method, path, role, body, false)
                        .then((res) => resolve(res))
                        .catch(() => {
                            resolve({
                                status: 'error',
                                data: { error: 'Request failed' },
                            });
                        });
                    return;
                }

                // 401 Unauthorized
                // 403 Access Denied
                if (
                    errResponse?.status === 401 ||
                    errResponse?.status === 403
                ) {
                    return resolve({
                        status: 'error',
                        data: {
                            error: `${errResponse.data.errorMessage}`
                        },
                    });
                }

                return resolve({
                    status: 'error',
                    data: { error: `${errResponse.data.errorMessage}` },
                });
            });
    });
};

const refreshToken = (): Promise<string | ApiResponse> => {
    return new Promise<string | ApiResponse>((resolve) => {
        axios({
            method: 'post',
            baseURL: appConfiguration.api.baseUrl,
            url: '/auth/user/refresh',
            data: JSON.stringify({
                refreshToken: getRefreshToken(),
            }),
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((res) => refreshTokenResponseHandler(res, resolve))
            .catch((e) => {
                resolve({ status: 'error', data: { error: e?.data?.error } });
            });
    });
};

export const responseHandler = (
    res: AxiosResponse,
    resolve: (data: ApiResponse) => void
) => {
    if (res?.status < 200 || res?.status > 300) {
        return resolve({
            status: 'error',
            data: '' + res,
        });
    }

    return resolve({
        status: 'ok',
        data: res.data,
    });
};

const refreshTokenResponseHandler = (
    res: AxiosResponse,
    resolve: (data: string | ApiResponse) => void
) => {
    if (res.status !== 200) {
        return resolve({
            status: 'error',
            data: { error: 'Unable to get new refresh token' },
        });
    }

    resolve(res.data?.authToken);
};

export const getAuthToken = (): string => {
    return localStorage.getItem('auth-token') ?? '';
};

export const getRefreshToken = (): string => {
    return localStorage.getItem('refresh-token') ?? '';
};

export const setAuthToken = (token: string): void => {
    localStorage.setItem('auth-token', token);
};

export const setRefreshToken = (token: string): void => {
    localStorage.setItem('refresh-token', token);
};
