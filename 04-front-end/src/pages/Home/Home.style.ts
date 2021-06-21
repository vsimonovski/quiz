import styled from 'styled-components';
import { Container } from '../../components/App/App.style';
import { appConfiguration } from '../../config/app.config';
import {StyleConfiguration} from "../../config/app.config.type";

const styles: StyleConfiguration = appConfiguration.styles;

const Title = styled.h1`
    text-transform: uppercase;
    text-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
    font-style: italic;
    color: #fff;
    font-size: 80px;
    font-family: ${styles.fonts.montserrat};
    margin: 0;
`;

const HomeContainer = styled(Container)`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`;

export { Title, HomeContainer };
