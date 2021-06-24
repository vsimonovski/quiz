import * as express from 'express';
import IRouter from '../../common/IRouter.interface';
import IApplicationResources from '../../common/IApplicationResources.interface';
import AuthController from './controller';
import AuthMiddleware from '../../middleware/auth.middleware';

export default class AuthRouter implements IRouter {
    public setUpRoutes(
        application: express.Application,
        resources: IApplicationResources
    ) {
        const authController: AuthController = new AuthController(resources);

        application.post(
            '/auth/login',
            authController.userLogin.bind(authController)
        );

        application.post(
            '/auth/register',
            authController.userRegister.bind(authController)
        );

        application.post(
            '/auth/refresh',
            authController.userRefreshToken.bind(authController)
        );

        application.get(
            '/auth/user/ok',
            AuthMiddleware.getVerifier(),
            authController.sendOk.bind(authController)
        );
    }
}
