import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;

    .no-more-time-title {
        font-weight: bold;
        color: #fff;
        text-align: center;
    }
`;

export const Content = styled.div`
    display: flex;
    height: 100%;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

export const Stats = styled.div`
    display: flex;
    justify-content: space-between;
`;

export const QuestionCounter = styled.span`
    color: aqua;
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 20px;
`;
