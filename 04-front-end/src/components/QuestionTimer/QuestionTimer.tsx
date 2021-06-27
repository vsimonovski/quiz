import React, { useEffect, useState } from 'react';
import * as S from './QuestionTimer.style';
import { ClockCircleOutlined } from '@ant-design/icons';

interface QuestionTimerProps {
    clockTime: number;
    onClockRunsOut?: () => void;
}

const QuestionTimer = ({ clockTime, onClockRunsOut }: QuestionTimerProps) => {
    const [time, setTime] = useState(clockTime || 0);

    useEffect(() => {
        let timer: number;
        if (time > 0) {
            timer = window.setInterval(() => setTime(time - 1), 1000);
        }
        if (time === 0) {
            onClockRunsOut && onClockRunsOut();
        }
        return () => {
            return clearInterval(timer);
        };
    }, [time, onClockRunsOut]);
    return (
        <S.Container>
            <ClockCircleOutlined />
            <span className="time">{time}</span>
        </S.Container>
    );
};

export default QuestionTimer;
