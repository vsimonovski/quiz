import * as express from "express";
import IApplicationResources from "./IApplicationResources.interface";

export default interface IRouter {
  setUpRoutes(
    application: express.Application,
    resources: IApplicationResources
  );
}
