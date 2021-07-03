import React from 'react';
import { GameProps } from '../../containers/Game/Game.type';
import * as S from './MathGuessGame.style';
import useOfferedAnswer from '../../utils/hooks/useOfferedAnswer';
import { Spin } from 'antd';

const MathGuessGame = ({ questionData, onAnswerSubmit }: GameProps) => {
    const offeredAnswers = useOfferedAnswer(questionData.questionId);

    const handleOfferedAnswerClick = (selectedAnswer: string) => {
        onAnswerSubmit(selectedAnswer);
    };

    if (!offeredAnswers.length) return <Spin />;

    return (
        <React.Fragment>
            <S.Title>Select correct answer for the math expression: </S.Title>
            <S.Title>{questionData.question} = ?</S.Title>
            <S.Content>
                {offeredAnswers.map((offeredAnswer) => (
                    <S.OfferedAnswer
                        key={offeredAnswer.answer}
                        onClick={() =>
                            handleOfferedAnswerClick(offeredAnswer.answer)
                        }
                    >
                        {offeredAnswer.answer}
                    </S.OfferedAnswer>
                ))}
            </S.Content>
        </React.Fragment>
    );
};

export default MathGuessGame;
