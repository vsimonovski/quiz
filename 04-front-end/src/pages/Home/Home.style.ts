import styled from 'styled-components';
import { Container } from '../../components/App/App.style';
import { appConfiguration } from '../../config/app.config';
import { StyleConfiguration } from '../../config/app.config.type';

const styles: StyleConfiguration = appConfiguration.styles;

const Title = styled.h1`
    text-transform: uppercase;
    text-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
    color: #333;
    font-size: 80px;
    font-family: ${styles.fonts.montserrat};
    font-weight: 800;
    margin: 0;
`;

const Menu = styled.div`
    display: flex;
    flex-direction: column;
    background: rgba(0, 0, 0, 0.2);
    height: 60px;
    justify-content: center;
`;

const ButtonWrap = styled.div`
    align-self: flex-end;
    Button {
        margin: 0 10px;
    }
`;

const Content = styled.div`
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
            margin: 10px 0;
            &:last-child {
                margin: 0;
            }
        }
    }
`;

const HomeContainer = styled(Container)`
    display: flex;
    flex-direction: column;
`;

export { Title, HomeContainer, Menu, ButtonWrap, Content };
