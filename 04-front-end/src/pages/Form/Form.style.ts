import styled from 'styled-components';
import { BaseContainer } from '../../components/App/App.style';

export const Container = styled(BaseContainer)`
    display: flex;
    flex-direction: column;
`;

export const Content = styled.div`
    height: 100%;
    display: flex;
    justify-content: center;
    background-color: #dfe6e9;

    .site-form-item-icon {
        color: rgba(0, 0, 0, 0.25);
    }
`;
