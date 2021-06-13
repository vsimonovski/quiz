import IConfig from "../common/IConfig.interface";

const Config: IConfig = {
  server: {
    port: 8080,
  },
  database: {
    host: "localhost",
    port: 3306,
    user: "root",
    password: "root",
    database: "quiz",
    charset: "utf8",
    timezone: "+01:00"
  }
};

export default Config;
