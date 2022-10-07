import { rest } from 'msw';
import { appConfiguration } from '../config/app.config';

export const handlers = [
    rest.post(`${appConfiguration.api.baseUrl}/auth/login`, (req, res, ctx) => {
        return res(ctx.status(200));
    }),
];
