import React, { useEffect, useState } from 'react';
import * as S from './FlagGuessGame.style';
import { Answer, GameProps } from '../Game.type';
import { getAnswersByQuestionId } from '../../../utils/game.util';
import { Spin } from 'antd';

const FlagGuessGame = ({ questionData, onAnswerSubmit }: GameProps) => {
    const [answers, setAnswers] = useState<Answer[]>([]);

    useEffect(() => {
        getAnswersByQuestionId(questionData.questionId).then((res) => {
            if (res.status === 'ok') {
                setAnswers(res.data);
            }
        });
    }, []);

    const handleFlagClick = (countryCode: string) => {
        onAnswerSubmit(countryCode);
    };

    if (!answers.length) return <Spin />;

    return (
        <S.Container>
            <S.Title>
                Guess flag for the country: {questionData.question}
            </S.Title>
            <div>
                {answers.map(({ answer: countryCode }) => {
                    return (
                        <img
                            src={`https://www.countryflags.io/${countryCode}/flat/64.png`}
                            onClick={() => handleFlagClick(countryCode)}
                            alt="country flag"
                        />
                    );
                })}
            </div>
        </S.Container>
    );
};

export default FlagGuessGame;
