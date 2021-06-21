import BaseController from '../../common/BaseController';
import { Request, Response } from 'express';
import { IUser, userValidator } from '../user/dto/User';
import UserModel from '../user/model';
import * as bcrypt from 'bcrypt';
import ITokenData from './dto/ITokenData.interface';
import * as jwt from 'jsonwebtoken';
import Config from '../../config/dev';
import {
    RefreshToken,
    refreshTokenValidator,
} from './dto/RefreshToken.interface';

export default class AuthController extends BaseController {
    private static signTokens(user: UserModel): [string, string] {
        const authTokenData: ITokenData = {
            id: user.userId,
            identity: user.username,
            role: 'user',
        };

        const refreshTokenData: ITokenData = {
            id: user.userId,
            identity: user.username,
            role: 'user',
        };

        const authToken = jwt.sign(
            authTokenData,
            Config.auth.user.auth.private,
            {
                algorithm: Config.auth.user.algorithm,
                issuer: Config.auth.user.issuer,
                expiresIn: Config.auth.user.auth.duration,
            }
        );

        const refreshToken = jwt.sign(
            refreshTokenData,
            Config.auth.user.refresh.private,
            {
                algorithm: Config.auth.user.algorithm,
                issuer: Config.auth.user.issuer,
                expiresIn: Config.auth.user.refresh.duration,
            }
        );

        return [authToken, refreshToken];
    }

    public async userLogin(req: Request, res: Response) {
        if (!userValidator(req.body)) {
            return res.status(400).send(userValidator.errors);
        }

        const data = req.body as IUser;
        const user = await this.services.userService.getByUsername(
            data.username
        );
        if (!(user instanceof UserModel)) {
            return res.status(404).send({
                errorCode: user.errorCode,
                errorMessage: user.errorMessage,
            });
        }

        if (!(await bcrypt.compare(data.password, user.passwordHash))) {
            await new Promise((resolve) => setTimeout(resolve, 1000));
            return res.status(403).send({
                errorCode: 403,
                errorMessage: 'Invalid user password.',
            });
        }

        const [authToken, refreshToken] = AuthController.signTokens(user);

        res.send({
            authToken,
            refreshToken,
        });
    }

    public async userRegister(req: Request, res: Response) {
        if (!userValidator(req.body)) {
            return res.status(400).send(userValidator.errors);
        }

        const data = req.body as IUser;
        const user = await this.services.userService.add({
            username: data.username,
            password: data.password,
        });

        if (!(user instanceof UserModel)) {
            return res.status(400).send({
                errorCode: user.errorCode,
                errorMessage: user.errorMessage,
            });
        }

        const [authToken, refreshToken] = AuthController.signTokens(user);

        res.send({
            authToken,
            refreshToken,
        });
    }

    public async userRefreshToken(req: Request, res: Response) {
        if (!refreshTokenValidator(req.body)) {
            return res.send(refreshTokenValidator.errors);
        }

        const tokenString: string = (req.body as RefreshToken).refreshToken;

        try {
            const existingData = jwt.verify(
                tokenString,
                Config.auth.user.auth.public
            ) as ITokenData;

            const newTokenData: ITokenData = {
                id: existingData.id,
                identity: existingData.identity,
                role: existingData.role
            }

            const authToken = jwt.sign(
                newTokenData,
                Config.auth.user.auth.private,
                {
                    algorithm: Config.auth.user.algorithm,
                    issuer: Config.auth.user.issuer,
                    expiresIn: Config.auth.user.auth.duration,
                }
            );

            res.send({
                authToken: authToken,
                refreshToken: null,
            });
        } catch (e) {
            return res.status(400).send(`Invalid refresh token: ${e?.message}`);
        }
    }
}
