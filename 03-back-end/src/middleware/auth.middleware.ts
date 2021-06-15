import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';

export default class AuthMiddleware {
    public static verifyAuthToken(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        if (typeof req.headers.authorization !== 'string') {
            return res.status(401).send('No auth token specified.');
        }

        const [tokenType, tokenString]: string[] = req.headers.authorization
            .trim()
            .split(' ');

        if (tokenType !== 'Bearer') {
            return res.status(400).send('Invalid token type specified.');
        }

        if (typeof tokenString !== 'string' || tokenString.length === 0) {
            return res.status(400).send('Invalid auth token length.');
        }

        if (jwt.ve) next();
    }
}
