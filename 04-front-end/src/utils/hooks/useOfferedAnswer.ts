import { useState, useEffect } from 'react';
import { getAnswersByQuestionId } from '../game.util';
import { Answer } from '../../containers/Game/Game.type';

function useOfferedAnswer(questionId: number) {
    const [offeredAnswers, setOfferedAnswers] = useState<Answer[]>([]);

    useEffect(() => {
        getAnswersByQuestionId(questionId).then((res) => {
            if (res.status === 'ok') {
                setOfferedAnswers(res.data);
            }
        });
    }, [questionId]);

    return offeredAnswers;
}

export default useOfferedAnswer;
