import React from 'react';
import WordGuessGame from '../../../components/WordGuessGame/WordGuessGame';
import { Question } from '../Game.type';
import CountryGuessGame from '../../../components/CountryGuessGame/CountryGuessGame';
import FlagGuessGame from '../../../components/FlagGuessGame/FlagGuessGame';
import MathGuessGame from '../../../components/MathGuessGame/MathGuessGame';

interface CurrentQuestionProps {
    questionNumber: number;
    questionData: Question;
    onAnswerSubmit: (answer: string) => void;
}

const QuestionContainer = ({
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

            {questionNumber === 4 && (
                <MathGuessGame
                    questionData={questionData}
                    onAnswerSubmit={onAnswerSubmit}
                />
            )}
        </div>
    );
};

export default React.memo(QuestionContainer);
