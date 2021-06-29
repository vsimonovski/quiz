import React from 'react';
import * as S from './PlayerStats.style';
import { Spin } from 'antd';

interface PlayerStatsProps {
    username: string;
    score: number;
}

const PlayerStats = ({ username, score }: PlayerStatsProps) => {
    return (
        <S.Container>
            <span className="username">{username ? username : <Spin />}</span>{' '}
            <span>{score}pts</span>
        </S.Container>
    );
};

export default PlayerStats;
