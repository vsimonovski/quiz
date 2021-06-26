import React from 'react';
import * as S from './FormContainer.style';
import { FormProps } from '../Form.type';

const FormContainer = ({ title, children }: FormProps) => {
    return (
        <S.Container>
            <h1>{title}</h1>
            {children}
        </S.Container>
    );
};

export default FormContainer;
