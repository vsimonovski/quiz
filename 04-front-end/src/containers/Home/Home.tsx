import React, { useCallback, useState } from 'react';
import * as S from './Home.style';
import { Button, Input } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import Menu from '../../components/Menu/Menu';
import { useHistory } from 'react-router-dom';

const Home = () => {
    const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
    const [username, setUsername] = useState(
        () => sessionStorage.getItem('username') || ''
    );
    const history = useHistory();

    const handleLoginStatus = useCallback((isLoggedIn: boolean): void => {
        setIsUserLoggedIn(isLoggedIn);
    }, []);

    const handlePlayClick = () => {
        if (isUserLoggedIn || username.length) {
            sessionStorage.setItem('username', username);
            history.push('/game');
        }
    };

    const handleAddQuestionClick = () => {
        history.push('/add-question');
    };

    const handleUsernameChange = (e: any) => {
        setUsername(e.currentTarget.value);
    };

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
                            onChange={handleUsernameChange}
                            defaultValue={username}
                        />
                    )}
                    <Button type="primary" onClick={handlePlayClick}>
                        Play
                    </Button>
                    {isUserLoggedIn && (
                        <Button type="primary" onClick={handleAddQuestionClick}>
                            Add Questions
                        </Button>
                    )}
                </div>
            </S.Content>
        </S.Container>
    );
};

export default Home;
