import React from 'react';
import { Button } from 'antd';
import * as S from './AnswerContainer.style';
import { Answer } from '../Game.type';

interface AnswerProps {
    answerData: Answer;
    onNextQuestionClick: () => void;
}

const AnswerContainer = ({ answerData, onNextQuestionClick }: AnswerProps) => {
    return (
        <S.Container>
            <S.Title>Your answer: {answerData.answer}</S.Title>
            <Button type="primary" onClick={onNextQuestionClick}>
                next question
            </Button>
        </S.Container>
    );
};

export default AnswerContainer;
