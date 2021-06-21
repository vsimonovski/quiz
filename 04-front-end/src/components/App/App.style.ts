import styled, { createGlobalStyle } from 'styled-components';
import { appConfiguration } from '../../config/app.config';
import {StyleConfiguration} from "../../config/app.config.type";

const styles: StyleConfiguration = appConfiguration.styles;

const GlobalStyle = createGlobalStyle`
    html, body, #root {
        height: 100%
    }
    body {
      background-color: ${styles.colors.backgroundColor};
    }
`;

const Container = styled.div`
    height: 100%;
`

export {GlobalStyle, Container}