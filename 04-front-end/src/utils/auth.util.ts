import { api, ApiResponse } from '../api/api';
import { Rule } from 'antd/lib/form';

// Form validation rules
export const usernameRules: Rule[] = [
    {
        required: true,
        message: 'Username is required',
    },
    {
        min: 5,
        message: 'Username is too short',
    },
];

export const passwordRules: Rule[] = [
    {
        required: true,
        message: 'Password is required',
    },
    { min: 6, message: 'Password is too short' },
];

export const confirmPasswordRules: Rule[] = [
    {
        required: true,
        message: 'Confirm your password',
    },
    ({ getFieldValue }) => ({
        validator(_, value) {
            if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
            }
            return Promise.reject(new Error('Password do not match'));
        },
    }),
]

export const attemptUserLogin = (
    username: string,
    password: string
): Promise<ApiResponse> => {
    return api('post', '/auth/login', 'guest', { username, password }, false);
};

export const attemptUserRegistration = (
    username: string,
    password: string
): Promise<ApiResponse> => {
    return api(
        'post',
        '/auth/register',
        'guest',
        { username, password },
        false
    );
};

export const isLoggedIn = () => {
    return api('get', '/auth/user/ok', 'user', true);
};
