import React from 'react';
import { FormProps } from './Form.type';
import Menu from '../../components/Menu/Menu';
import * as S from './Form.style';
import FormContainer from './FormContainer/FormContainer';

const Form = ({ children, title }: FormProps) => {
    return (
        <S.Container>
            <Menu />
            <S.Content>
                <FormContainer title={title}>{children}</FormContainer>
            </S.Content>
        </S.Container>
    );
};

export default Form;
