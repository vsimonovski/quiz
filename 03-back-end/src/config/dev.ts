import IConfig from '../common/IConfig.interface';
import { readFileSync } from 'fs';

const Config: IConfig = {
    server: {
        port: 8080,
    },
    database: {
        host: 'localhost',
        port: 3306,
        user: 'root',
        password: 'root',
        database: 'quiz',
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
