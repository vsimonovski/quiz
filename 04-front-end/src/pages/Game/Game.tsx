import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import jwt_decode from 'jwt-decode';

import { isLoggedIn } from '../../utils/auth.util';
import { getAuthToken } from '../../api/api';

import PlayerStats from '../../components/PlayerStats/PlayerStats';
import QuestionTimer from '../../components/QuestionTimer/QuestionTimer';
import Question from '../../components/Question/Question';

import * as S from './Game.style';

const Game = () => {
    const [username, setUsername] = useState('');
    const [currentQuestion, setCurrentQuestion] = useState(1);
    const history = useHistory();

    const handleClockRunsOut = () => {
        console.log('clock runs out');
    };

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

    return (
        <S.Container>
            <S.Stats>
                <PlayerStats username={username} score={0} />
                <QuestionTimer
                    clockTime={10}
                    onClockRunsOut={handleClockRunsOut}
                />
            </S.Stats>
            <S.Content>
                <S.QuestionCounter>
                    question {currentQuestion}/4
                </S.QuestionCounter>
                <Question currentQuestion={currentQuestion} />
            </S.Content>
        </S.Container>
    );
};

export default Game;
