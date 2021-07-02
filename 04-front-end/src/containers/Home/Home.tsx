import React, { useCallback, useState } from 'react';
import * as S from './Home.style';
import { Button, Input } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import Menu from '../../components/Menu/Menu';
import {useHistory} from "react-router-dom";

const Home = () => {
    const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
    const history = useHistory();

    const handleLoginStatus = useCallback((isLoggedIn: boolean): void => {
        setIsUserLoggedIn(isLoggedIn);
    }, []);

    const handlePlayClick = () => {
        // TODO add username only logic
        if(isUserLoggedIn) {
            history.push('/game');
        }
    }

    const handleAddQuestionClick = () => {
        history.push('/add-question');
    }

    return (
        <S.Container>
            <Menu onLoginStatusChange={handleLoginStatus} />
            <S.Content>
                <S.Title>Quiz</S.Title>
                <div>
                    {!isUserLoggedIn && (
                        <Input
                            placeholder="enter username"
                            prefix={
                                <UserOutlined className="site-form-item-icon" />
                            }
                        />
                    )}
                    <Button type="primary" onClick={handlePlayClick}>Play</Button>
                    {isUserLoggedIn && (
                        <Button type="primary" onClick={handleAddQuestionClick}>Add Questions</Button>
                    )}
                </div>
            </S.Content>
        </S.Container>
    );
};

export default Home;
