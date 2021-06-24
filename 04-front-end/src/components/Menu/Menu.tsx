import React, { useEffect, useState } from 'react';
import * as S from './Menu.style';
import { Link, useHistory } from 'react-router-dom';
import { Button } from 'antd';
import { isLoggedIn } from '../../utils/auth.util';
import { setAuthToken, setRefreshToken } from '../../api/api';

interface MenuProps {
    onLoginStatusChange?: (isLoggedIn: boolean) => void;
}

const Menu = ({ onLoginStatusChange }: MenuProps) => {
    const history = useHistory();
    const [isLogOutVisible, setIsLogOutVisible] = useState(false);

    const handleLogOut = () => {
        setAuthToken('');
        setRefreshToken('');
        history.push('/login');
    };

    const handleOnLogoClick = () => {
        history.push('/');
    };

    useEffect(() => {
        isLoggedIn()
            .then((res) => {
                if (res.status === 'ok') {
                    setIsLogOutVisible(true);
                    onLoginStatusChange && onLoginStatusChange(true);
                    return;
                }
                onLoginStatusChange && onLoginStatusChange(false);
                setIsLogOutVisible(false);
            })
            .catch((e) => console.log(e));
    }, [onLoginStatusChange]);

    return (
        <S.Menu>
            <S.Title onClick={handleOnLogoClick}>quiz</S.Title>
            <S.ButtonWrap>
                {!isLogOutVisible && (
                    <>
                        <Link to="/login">
                            <Button type="primary">Log in</Button>
                        </Link>
                        <Link to="/register">
                            <Button>Register</Button>
                        </Link>
                    </>
                )}

                {isLogOutVisible && (
                    <Button onClick={handleLogOut}>Log Out</Button>
                )}
            </S.ButtonWrap>
        </S.Menu>
    );
};

export default Menu;
