import styled from 'styled-components';
import { StyleConfiguration } from '../../config/app.config.type';
import { appConfiguration } from '../../config/app.config';

const styles: StyleConfiguration = appConfiguration.styles;

export const Menu = styled.div`
    display: flex;
    flex-direction: row;
    background: rgba(0, 0, 0, 0.2);
    min-height: 60px;
    justify-content: space-between;
    align-items: center;
`;

export const Title = styled.span`
    font-family: ${styles.fonts.pressStart};
    text-transform: uppercase;
    margin-left: 10px;
    color: #fff;
    text-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
    font-size: 20px;
    &:hover {
        cursor: pointer;
        color: aqua;
    }
`;

export const ButtonWrap = styled.div`
    Button {
        margin: 0 10px;
    }
`;
