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
import QuestionContainer from './QuestionContainer/QuestionContainer';
import * as S from './Game.style';
import { Button, Spin } from 'antd';

const Game = () => {
    const [username, setUsername] = useState(
        () => sessionStorage.getItem('username') || ''
    );
    const [questionNumber, setQuestionNumber] = useState(1);
    const [questionData, setQuestionData] = useState(() =>
        getInitialQuestionState()
    );
    const [answerData, setAnswerData] = useState(() => getInitialAnswerState());
    const [score, setScore] = useState(0);
    const [clockTime, setClockTime] = useState(10);
    const [isClockTimeUp, setIsClockTimeUp] = useState(false);
    const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
    const history = useHistory();

    useEffect(() => {
        if(!username.length) {
            setIsUserLoggedIn(false);
            isLoggedIn()
                .then((res) => {
                    if (res.status === 'ok') {
                        const {identity} = jwt_decode<{ identity: string }>(
                            getAuthToken()
                        );
                        setUsername(identity);
                        setIsUserLoggedIn(true);
                        return;
                    }
                    history.push('/login');
                })
                .catch((e) => console.log(e));
        }
    }, [history]);

    useEffect(() => {
        setQuestionData(getInitialQuestionState);
        setAnswerData(getInitialAnswerState);

        Promise.all([
            getRandomQuestionByCategoryId(questionNumber),
            getTimerValueForQuestion(questionNumber),
        ]).then(([qData, tData]) => {
            if (qData.status === 'ok') {
                setQuestionData(qData.data);
            }

            if (tData.status === 'ok') {
                setClockTime(tData.data.categoryTimer);
                setIsClockTimeUp(false);
            }
        });
    }, [questionNumber]);

    const handleClockRunsOut = useCallback(() => {
        setIsClockTimeUp(true);
    }, []);

    const handleAnswerSubmit = useCallback(
        (answer: string) => {
            setAnswerData(getInitialAnswerState);

            checkIfAnswerIsCorrect(questionData.questionId, answer).then(
                (res) => {
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
                }
            );
        },
        [questionData]
    );

    const handleNextQuestionClick = () => {
        setQuestionNumber(questionNumber + 1);
    };

    if (!questionData.question.length) return <Spin size="large" />;

    return (
        <S.Container>
            <S.Stats>
                <PlayerStats username={username} score={score} />

                <QuestionTimer
                    clockTime={clockTime}
                    setClockTime={setClockTime}
                    onClockRunsOut={handleClockRunsOut}
                    shouldClockFreeze={!!answerData.answer.length}
                />
            </S.Stats>
            <S.Content>
                <S.QuestionCounter>
                    question {questionNumber}/4
                </S.QuestionCounter>

                {!isClockTimeUp && !answerData.answer.length && (
                    <QuestionContainer
                        questionNumber={questionNumber}
                        questionData={questionData}
                        onAnswerSubmit={handleAnswerSubmit}
                    />
                )}

                {!isClockTimeUp && !!answerData.answer.length && (
                    <AnswerContainer
                        answerData={answerData}
                        questionData={questionData}
                        isLoggedIn={isUserLoggedIn}
                        questionNumber={questionNumber}
                        onNextQuestionClick={handleNextQuestionClick}
                    />
                )}

                {isClockTimeUp && (
                    <div>
                        <h3 className="no-more-time-title">Time is up</h3>
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
