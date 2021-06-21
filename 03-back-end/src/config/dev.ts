import IConfig from '../common/IConfig.interface';
import { readFileSync } from 'fs';
import * as dotenv from 'dotenv';

// initialize .env
dotenv.config();

const Config: IConfig = {
    server: {
        port: +process.env.SERVER_PORT,
    },
    database: {
        host: process.env.DB_HOST,
        port: +process.env.DB_PORT,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        charset: 'utf8',
        timezone: '+01:00',
    },
    auth: {
        user: {
            algorithm: 'RS256',
            issuer: 'localhost',
            auth: {
                duration: 60 * 60 * 24 * 7, // TODO: change later to 60 * 60 * 5
                public: readFileSync('keystore/user-auth.public', 'utf-8'),
                private: readFileSync('keystore/user-auth.private', 'utf-8'),
            },
            refresh: {
                duration: 60 * 60 * 24 * 365, // TODO: change later to 60 * 60 * 24 * 31
                public: readFileSync('keystore/user-refresh.public', 'utf-8'),
                private: readFileSync('keystore/user-refresh.private', 'utf-8'),
            },
        },
        allowRequestsEvenWithoutValidTokens: true,
    },
};

export default Config;
