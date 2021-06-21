import { Algorithm } from 'jsonwebtoken';

interface ITokenKeyOptions {
    private: string;
    public: string;
    duration: number;
}

interface ITokenOptions {
    auth: ITokenKeyOptions;
    refresh: ITokenKeyOptions;
    issuer: string;
    algorithm: Algorithm;
}

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
    auth: {
        user: ITokenOptions;
    };
}

export default IConfig;
