import * as express from "express";
import IApplicationResources from "./common/IApplicationResources.interface";
import IRouter from "./common/IRouter.interface";

export default class Router {
  static setUpRoutes(
    application: express.Application,
    resources: IApplicationResources,
    routers: IRouter[]
  ) {
    for (const router of routers) {
      router.setUpRoutes(application, resources);
    }
  }
}
