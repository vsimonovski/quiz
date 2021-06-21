import styled from 'styled-components';
import { appConfiguration } from '../../config/app.config';

const AuthForm = styled.form`
    display: flex;
    flex-direction: column;
    height: 180px;
`;

const AuthLabel = styled.p`
    margin: 0;
    font-family: ${appConfiguration.styles.fonts.montserrat};
    //font-weight: 800;
    font-size: 14px;
    text-transform: lowercase;
    color: #fff;
`;

const AuthInput = styled.input`
    width: 200px;
    height: 20px;
`;

export { AuthForm, AuthLabel, AuthInput };
