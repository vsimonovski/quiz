import React, { useCallback, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import { isLoggedIn } from '../../utils/auth.util';
import {
    calculateScoreForQuestion,
    checkIfAnswerIsCorrect,
    getInitialAnswerState,
    getInitialQuestionState,
    getRandomQuestionByCategoryId,
    getTimerValueForQuestion,
} from '../../utils/game.util';
import { getAuthToken } from '../../api/api';
import PlayerStats from '../../components/PlayerStats/PlayerStats';
import QuestionTimer from '../../components/QuestionTimer/QuestionTimer';
import AnswerContainer from './AnswerContainer/AnswerContainer';
import CurrentQuestion from './CurrentQuestion/CurrentQuestion';
import * as S from './Game.style';
import { Button } from 'antd';

const Game = () => {
    const [username, setUsername] = useState('');
    const [questionNumber, setQuestionNumber] = useState(1);
    const [questionData, setQuestionData] = useState(() =>
        getInitialQuestionState()
    );
    const [answerData, setAnswerData] = useState(() => getInitialAnswerState());
    const [score, setScore] = useState(0);
    const [clockTime, setClockTime] = useState(10);
    const [isClockTimeUp, setIsClockTimeUp] = useState(false);
    const history = useHistory();

    useEffect(() => {
        isLoggedIn()
            .then((res) => {
                if (res.status === 'ok') {
                    const { identity } = jwt_decode<{ identity: string }>(
                        getAuthToken()
                    );
                    setUsername(identity);
                    return;
                }
                history.push('/login');
            })
            .catch((e) => console.log(e));
    }, [history]);

    useEffect(() => {
        setQuestionData(getInitialQuestionState);
        setAnswerData(getInitialAnswerState);
        setIsClockTimeUp(false);

        Promise.all([
            getRandomQuestionByCategoryId(questionNumber),
            getTimerValueForQuestion(questionNumber),
        ]).then(([qData, tData]) => {
            if (qData.status === 'ok') {
                setQuestionData(qData.data);
            }

            if (tData.status === 'ok') {
                console.log(tData.data.categoryTimer);
                setClockTime(tData.data.categoryTimer);
            }
        });
    }, [questionNumber]);

    const handleClockRunsOut = useCallback(() => {
        console.log('clock runs out');
        setIsClockTimeUp(true);
    }, []);

    const handleAnswerSubmit = (answer: string) => {
        setAnswerData(getInitialAnswerState);

        checkIfAnswerIsCorrect(questionData.questionId, answer).then((res) => {
            console.log(res);
            if (res.status === 'ok') {
                setAnswerData({ answer: answer, isCorrect: res.data });
                setScore(
                    score +
                        calculateScoreForQuestion(
                            questionNumber,
                            res.data,
                            answer
                        )
                );
            }
        });
    };

    const handleNextQuestionClick = () => {
        setQuestionNumber(questionNumber + 1);
    };

    return (
        <S.Container>
            <S.Stats>
                <PlayerStats username={username} score={score} />

                {!!questionData.question.length && (
                    <QuestionTimer
                        clockTime={clockTime}
                        setClockTime={setClockTime}
                        onClockRunsOut={handleClockRunsOut}
                        shouldClockFreeze={!!answerData.answer.length}
                    />
                )}
            </S.Stats>
            <S.Content>
                <S.QuestionCounter>
                    question {questionNumber}/4
                </S.QuestionCounter>

                {!isClockTimeUp &&
                    !answerData.answer.length &&
                    !!questionData.question.length && (
                        <CurrentQuestion
                            questionNumber={questionNumber}
                            questionData={questionData}
                            onAnswerSubmit={handleAnswerSubmit}
                        />
                    )}

                {!isClockTimeUp && !!answerData.answer.length && (
                    <AnswerContainer
                        answerData={answerData}
                        onNextQuestionClick={handleNextQuestionClick}
                    />
                )}

                {isClockTimeUp && (
                    <div>
                        <div>Time is up</div>
                        <Button
                            type="primary"
                            onClick={handleNextQuestionClick}
                        >
                            next question
                        </Button>
                    </div>
                )}
            </S.Content>
        </S.Container>
    );
};

export default Game;
