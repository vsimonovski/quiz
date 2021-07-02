import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

export const Title = styled.h3`
    color: #fff;
    font-size: 20px;
    font-style: italic;
    font-weight: bold;
    text-align: center;
    text-transform: uppercase;
`;

export const QuestionContent = styled.div`
    font-size: 16px;
    color: #fff;
    letter-spacing: 20px;
    border-top: 2px solid #fb4364;
    border-bottom: 2px solid #fb4364;
    padding: 8px 8px 8px 28px; // larger left padding because of letter-spacing
    margin-bottom: 40px;
`;
