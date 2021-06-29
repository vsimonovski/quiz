import React from 'react';
import WordGuessGame from '../WordGuessGame/WordGuessGame';
import { Question } from '../Game.type';

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
        </div>
    );
};

export default CurrentQuestion;
