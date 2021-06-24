import React from 'react';
import { FormProps } from './Form.type';
import Menu from '../../components/Menu/Menu';
import * as S from './Form.style';

const Form = ({ children }: FormProps) => {
    return (
        <S.Container>
            <Menu />
            <S.Content>{children}</S.Content>
        </S.Container>
    );
};

export default Form;
