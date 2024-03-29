import React from 'react';
import * as S from './FlagGuessGame.style';
import { GameProps } from '../../containers/Game/Game.type';
import { Spin } from 'antd';
import useOfferedAnswer from '../../utils/hooks/useOfferedAnswer';

const FlagGuessGame = ({ questionData, onAnswerSubmit }: GameProps) => {
    const offeredAnswers = useOfferedAnswer(questionData.questionId);

    const handleFlagClick = (countryCode: string) => {
        onAnswerSubmit(countryCode);
    };

    if (!offeredAnswers.length) return <Spin />;

    return (
        <S.Container>
            <S.Title>
                Guess flag for the country: {questionData.question}
            </S.Title>
            <div className="flags">
                {offeredAnswers.map(({ answer: countryCode }) => {
                    return (
                        <S.Image
                            src={`https://countryflagsapi.com/png/${countryCode}`}
                            key={countryCode}
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
