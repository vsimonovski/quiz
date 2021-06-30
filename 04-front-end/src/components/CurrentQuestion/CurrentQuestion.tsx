import React from 'react';
import WordGuessGame from '../../pages/Game/WordGuessGame/WordGuessGame';
import { Question } from '../../pages/Game/Game.type';
import CountryGuessGame from '../../pages/Game/CountryGuessGame/CountryGuessGame';
import FlagGuessGame from '../../pages/Game/FlagGuessGame/FlagGuessGame';

interface CurrentQuestionProps {
    questionNumber: number;
    questionData: Question;
    onAnswerSubmit: (answer: string) => void;
}

const CurrentQuestion = ({
    questionNumber,
    questionData,
    onAnswerSubmit,
}: CurrentQuestionProps) => {
    return (
        <div>
            {questionNumber === 1 && (
                <WordGuessGame
                    questionData={questionData}
                    onAnswerSubmit={onAnswerSubmit}
                />
            )}

            {questionNumber === 2 && (
                <CountryGuessGame
                    questionData={questionData}
                    onAnswerSubmit={onAnswerSubmit}
                />
            )}

            {questionNumber === 3 && (
                <FlagGuessGame
                    questionData={questionData}
                    onAnswerSubmit={onAnswerSubmit}
                />
            )}
        </div>
    );
};

export default React.memo(CurrentQuestion);
