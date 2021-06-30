import { useState, useEffect } from 'react';
import { getAnswersByQuestionId } from '../game.util';
import { Answer } from '../../pages/Game/Game.type';

function useOfferedAnswer(questionId: number) {
    const [offeredAnswers, setOfferedAnswers] = useState<Answer[]>([]);

    useEffect(() => {
        getAnswersByQuestionId(questionId).then((res) => {
            if (res.status === 'ok') {
                setOfferedAnswers(res.data);
            }
        });
    });

    return offeredAnswers;
}

export default useOfferedAnswer;
