import React, { useEffect } from 'react';
import * as S from './QuestionTimer.style';
import { ClockCircleOutlined } from '@ant-design/icons';

interface QuestionTimerProps {
    clockTime: number;
    setClockTime: (clockTime: number) => void;
    onClockRunsOut: () => void;
    shouldClockFreeze: boolean;
}

const QuestionTimer = ({
    clockTime,
    setClockTime,
    onClockRunsOut,
    shouldClockFreeze,
}: QuestionTimerProps) => {
    useEffect(() => {
        let timer: number;
        if (clockTime > 0 && !shouldClockFreeze) {
            timer = window.setInterval(() => setClockTime(clockTime - 1), 1000);
        }
        if (clockTime === 0) {
            onClockRunsOut && onClockRunsOut();
        }
        return () => {
            return clearInterval(timer);
        };
    }, [clockTime, onClockRunsOut]);
    return (
        <S.Container>
            <ClockCircleOutlined />
            <span className="time">{clockTime}</span>
        </S.Container>
    );
};

export default QuestionTimer;
