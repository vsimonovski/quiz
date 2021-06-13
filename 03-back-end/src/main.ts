import * as express from "express";
import { Request, Response, NextFunction } from "express";
import * as cors from "cors";
import Config from "./config/dev";
import * as mysql2 from "mysql2/promise";
import IApplicationResources from "./common/IApplicationResources.interface";
import QuestionRouter from "./components/question/router";

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

  QuestionRouter.setUpRoutes(application, resources);

  application.use((req: Request, res: Response) => {
    res.sendStatus(404);
  });

  application.listen(Config.server.port);
}

main();
