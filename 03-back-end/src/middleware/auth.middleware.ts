import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import Config from '../config/dev';
import ITokenData from '../components/auth/dto/ITokenData.interface';

export default class AuthMiddleware {
    private static verifyAuthToken(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        try {
            if (Config.auth.allowRequestsEvenWithoutValidTokens) {
                return next();
            }

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

            const result = jwt.verify(
                tokenString,
                Config.auth.user.auth.public
            );

            if (typeof result !== 'object') {
                return res.status(401).send('Bad auth token data.');
            }

            req.authorized = result as ITokenData;

            next();
        } catch (e) {
            return res
                .status(500)
                .send(`Token validation error: ${e?.message}`);
        }
    }

    public static getVerifier(): (
        req: Request,
        res: Response,
        next: NextFunction
    ) => void {
        return (req: Request, res: Response, next: NextFunction) => {
            this.verifyAuthToken(req, res, next);
        };
    }
}
