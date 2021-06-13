import * as express from "express";
import * as cors from "cors";
import Config from "./config/dev";

const application: express.Application = express();

application.use(cors());
application.use(express.json());

application.use((req, res) => {
  res.sendStatus(404);
});

application.listen(Config.server.port);
