import React, { useState } from 'react';
import * as S from './Home.style';
// import { LinkName } from '../../components/AuthLink/AuthLink.type';
import { Button, Input } from 'antd';
import { UserOutlined } from '@ant-design/icons';

const Home = () => {
    // const [activeLink, setActiveLink]: [number, (activeLink: number) => void] =
    //     useState(LinkName.PLAY);
    //
    // const handleActiveLinkChange = (activeLink: number) => {
    //     setActiveLink(activeLink);
    // };

    return (
        <S.HomeContainer>
            <S.Menu>
                <S.ButtonWrap>
                    <Button type="primary">Log in</Button>
                    <Button>Register</Button>
                </S.ButtonWrap>
            </S.Menu>
            <S.Content>
                <S.Title>Quiz</S.Title>
                <div>
                    <Input
                        placeholder="enter username"
                        prefix={<UserOutlined />}
                    />
                    <Button type="primary">Play</Button>
                    <Button type="primary">Add Questions</Button>
                </div>
            </S.Content>
        </S.HomeContainer>
    );
};

export default Home;
