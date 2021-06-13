import * as express from "express";
import IApplicationResources from "../../common/IApplicationResources.interface";
import QuestionService from "./service";
import QuestionController from "./controller";
import IRouter from "../../common/IRouter.interface";

export default class QuestionRouter implements IRouter {
  public setUpRoutes(
    application: express.Application,
    resources: IApplicationResources
  ) {
    const questionService: QuestionService = new QuestionService(
      resources.databaseConnection
    );
    const questionController: QuestionController = new QuestionController(
      questionService
    );

    application.get(
      "/question",
      questionController.getAll.bind(questionController)
    );
  }
}
