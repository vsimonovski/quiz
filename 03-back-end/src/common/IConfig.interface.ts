interface IConfig {
  server: {
    port: number;
  };
  database: {
    host: string;
    port: number;
    user: string;
    password: string;
    database: string;
    charset: string;
    timezone: string;
  };
}

export default IConfig;
