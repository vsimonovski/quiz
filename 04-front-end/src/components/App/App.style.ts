import styled, { createGlobalStyle } from 'styled-components';
import { appConfiguration } from '../../config/app.config';
import { StyleConfiguration } from '../../config/app.config.type';

const styles: StyleConfiguration = appConfiguration.styles;

export const GlobalStyle = createGlobalStyle`
    html, body, #root {
        height: 100%
    }
    body {
      background-color: ${styles.colors.backgroundColor};
    }
`;

export const BaseContainer = styled.div`
    height: 100%;
    min-height: 500px;
`;
