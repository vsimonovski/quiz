import { api, ApiResponse } from '../../api/api';

const attemptUserLogin = (
    username: string,
    password: string
): Promise<ApiResponse> => {
    return api('post', '/auth/login', 'user', { username, password }, false);
};

const attemptUserRegister = (
    username: string,
    password: string
): Promise<ApiResponse> => {
    return api('post', '/auth/register', 'user', { username, password }, false);
};

export { attemptUserLogin, attemptUserRegister };
