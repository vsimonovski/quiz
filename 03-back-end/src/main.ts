import * as express from "express";
import { Request, Response } from "express";
import * as cors from "cors";
import Config from "./config/dev";
import * as mysql2 from "mysql2/promise";
import IApplicationResources from "./common/IApplicationResources.interface";
import QuestionRouter from "./components/question/router";
import Router from "./router";
import QuestionService from "./components/question/service";
import AnswerRouter from "./components/answer/router";
import AnswerService from "./components/answer/service";
import CategoryService from "./components/category/service";
import CategoryRouter from "./components/category/router";
import UserService from "./components/user/service";
import UserRouter from "./components/user/router";

async function main() {
  const application: express.Application = express();

  application.use(cors());
  application.use(express.json());

  const resources: IApplicationResources = {
    databaseConnection: await mysql2.createConnection({
      host: Config.database.host,
      port: Config.database.port,
      user: Config.database.user,
      password: Config.database.password,
      database: Config.database.database,
      charset: Config.database.charset,
      timezone: Config.database.timezone,
    }),
  };

  await resources.databaseConnection.connect();

  resources.services = {
    questionService: new QuestionService(resources),
    answerService: new AnswerService(resources),
    categoryService: new CategoryService(resources),
    userService: new UserService(resources),
  };

  Router.setUpRoutes(application, resources, [
    new QuestionRouter(),
    new AnswerRouter(),
    new CategoryRouter(),
    new UserRouter(),
  ]);

  application.use((req: Request, res: Response) => {
    res.sendStatus(404);
  });

  application.use((err: any, req: Request, res: Response) => {
    res.status(err.status).send(err.type);
  });

  application.listen(Config.server.port);

  return `Application is running on port: ${Config.server.port}, Database is running on port: ${Config.database.port}`;
}

main()
  .then((data) => console.log(data))
  .catch((e) => console.log(e));
