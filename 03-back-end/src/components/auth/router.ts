import * as express from "express";
import IRouter from "../../common/IRouter.interface";
import IApplicationResources from "../../common/IApplicationResources.interface";
import AuthController from "./controller";

export default class AuthRouter implements IRouter {
  public setUpRoutes(
    application: express.Application,
    resources: IApplicationResources
  ) {
    const authController: AuthController = new AuthController(resources);

    application.post(
      "/auth/login",
      authController.userLogin.bind(authController)
    );
  }
}
