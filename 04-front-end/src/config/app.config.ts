// Style related config
import { AppConfiguration } from './app.config.type';

export const appConfiguration: AppConfiguration = {
    styles: {
        colors: {
            backgroundColor: '#c8d6e5',
            linkHover: '#FBEC43',
            link: '#FFF',
        },
        fonts: {
            montserrat: `'Montserrat', sans-serif`,
        },
    },
    api: {
        baseUrl: 'http://localhost:8080',
    },
};
