import styled from 'styled-components';
import { BaseContainer } from '../../components/App/App.style';
import { appConfiguration } from '../../config/app.config';
import { StyleConfiguration } from '../../config/app.config.type';

const styles: StyleConfiguration = appConfiguration.styles;

export const Title = styled.h1`
    text-transform: uppercase;
    text-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
    color: #fff;
    font-size: 80px;
    font-family: ${styles.fonts.pressStart};
    font-weight: 800;
    margin: 0;

    @media (max-width: 480px) {
        font-size: 70px;
    }
`;

export const Content = styled.div`
    display: flex;
    flex: auto;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    div {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        Button {
            margin-top: 10px;
        }
        min-width: 200px;
    }

    .site-form-item-icon {
        color: rgba(0, 0, 0, 0.25);
    }
`;

export const Container = styled(BaseContainer)`
    display: flex;
    flex-direction: column;
`;
