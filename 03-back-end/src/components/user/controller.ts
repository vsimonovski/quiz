import BaseController from '../../common/BaseController';
import { Request, Response } from 'express';
import UserModel from './model';
import IErrorResponse from '../../common/IErrorResponse.interface';
import { IUser, userValidator } from './dto/User';

class UserController extends BaseController {
    async getAll(req: Request, res: Response) {
        const users = await this.services.userService.getAll();

        if (users instanceof Array) {
            res.send(users);
            return;
        }

        res.status(500).send(users);
    }

    async getById(req: Request, res: Response) {
        const userId: number = +req.params.id;

        if (userId <= 0 || isNaN(userId)) {
            res.sendStatus(400);
            return;
        }

        const data: UserModel | IErrorResponse =
            await this.services.userService.getById(userId);

        if (!(data instanceof UserModel)) {
            res.status(404).send({
                errorCode: 404,
                errorMessage: data.errorMessage,
            });
            return;
        }

        if (data instanceof UserModel) {
            res.send(data);
            return;
        }

        res.status(500).send(data);
    }

    async add(req: Request, res: Response) {
        const data: IUser = req.body;

        if (!userValidator(data)) {
            res.status(400).send(userValidator.errors);
            return;
        }

        const result: UserModel | IErrorResponse =
            await this.services.userService.add(data);

        res.send(result);
    }
}

export default UserController;
