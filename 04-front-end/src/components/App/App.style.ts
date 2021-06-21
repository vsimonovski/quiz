import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
    html, body, #root, .App {
        height: 100%
    }
    body {
        font-family: 'Orbitron', sans-serif;
        padding: 0;
        margin: 0;
    }
`;