import React from 'react';
import * as S from './Home.style';
import { Button, Input } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import Menu from '../../components/Menu/Menu';

const Home = () => {
    return (
        <S.Container>
            <Menu />
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
        </S.Container>
    );
};

export default Home;
