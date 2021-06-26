import React, { useCallback, useState } from 'react';
import * as S from './Home.style';
import { Button, Input } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import Menu from '../../components/Menu/Menu';

const Home = () => {
    const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

    const handleLoginStatus = useCallback((isLoggedIn: boolean): void => {
        setIsUserLoggedIn(isLoggedIn);
    }, []);

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
                    <Button type="primary">Play</Button>
                    {isUserLoggedIn && (
                        <Button type="primary">Add Questions</Button>
                    )}
                </div>
            </S.Content>
        </S.Container>
    );
};

export default Home;
