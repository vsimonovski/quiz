import * as express from 'express';
import IApplicationResources from '../../common/IApplicationResources.interface';
import IRouter from '../../common/IRouter.interface';
import UserController from './controller';

export default class UserRouter implements IRouter {
    public setUpRoutes(
        application: express.Application,
        resources: IApplicationResources
    ) {
        const userController: UserController = new UserController(resources);

        application.get('/user', userController.getAll.bind(userController));

        application.get(
            '/user/:id',
            userController.getById.bind(userController)
        );

        application.post('/user', userController.add.bind(userController));
    }
}
