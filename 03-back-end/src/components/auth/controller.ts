import BaseController from '../../common/BaseController';
import { Request, Response } from 'express';
import { IUser, userValidator } from '../user/dto/User';
import UserModel from '../user/model';
import * as bcrypt from 'bcrypt';
import ITokenData from './dto/ITokenData.interface';
import * as jwt from 'jsonwebtoken';
import Config from '../../config/dev';

export default class AuthController extends BaseController {
    public async userLogin(req: Request, res: Response) {
        if (!userValidator(req.body)) {
            return res.status(400).send(userValidator.errors);
        }

        const data = req.body as IUser;
        const user = await this.services.userService.getByUsername(
            data.username
        );
        if (!(user instanceof UserModel)) {
            return res
                .status(404)
                .send({
                    errorCode: user.errorCode,
                    errorMessage: user.errorMessage,
                });
        }

        if (!(await bcrypt.compare(data.password, user.passwordHash))) {
            await new Promise((resolve) => setTimeout(resolve, 1000));
            return res
                .status(403)
                .send({
                    errorCode: 403,
                    errorMessage: 'Invalid user password.',
                });
        }

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

        res.send({
            authToken,
            refreshToken,
        });
    }
}
