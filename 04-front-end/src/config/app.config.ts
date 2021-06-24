// Style related config
import { AppConfiguration } from './app.config.type';

export const appConfiguration: AppConfiguration = {
    styles: {
        colors: {
            backgroundColor: '#5f27cd',
            linkHover: '#FBEC43',
            link: '#FFF',
        },
        fonts: {
            montserrat: `'Montserrat', sans-serif`,
            pressStart: `'Press Start 2P', cursive`,
        },
    },
    api: {
        baseUrl: 'http://localhost:8080',
    },
};
