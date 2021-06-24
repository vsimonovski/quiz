import * as express from 'express';
import IApplicationResources from '../../common/IApplicationResources.interface';
import IRouter from '../../common/IRouter.interface';
import UserController from './controller';
import AuthMiddleware from '../../middleware/auth.middleware';

export default class UserRouter implements IRouter {
    public setUpRoutes(
        application: express.Application,
        resources: IApplicationResources
    ) {
        const userController: UserController = new UserController(resources);

        application.get(
            '/user',
            AuthMiddleware.getVerifier(),
            userController.getAll.bind(userController)
        );

        application.get(
            '/user/:id',
            AuthMiddleware.getVerifier(),
            userController.getById.bind(userController)
        );

        application.post(
            '/user',
            AuthMiddleware.getVerifier(),
            userController.add.bind(userController)
        );
    }
}
