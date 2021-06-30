import styled from 'styled-components';

interface TitleProps {
    isCorrect: boolean;
}

export const Container = styled.div`
    min-width: 400px;
    position: relative;

    .ant-card-body {
        display: flex;
        flex-direction: column;
    }

    .correct-answers {
        font-weight: bold;
        font-size: 12px;
        color: #0984e3;
        margin-bottom: 10px;
    }

    .edit-button {
        position: absolute;
        z-index: 1;
        top: 8px;
        right: 8px;
        &:hover {
            cursor: pointer;
        }
    }
`;

export const Title = styled.span<TitleProps>`
    font-weight: bold;
    font-size: 18px;
    margin-bottom: 8px;
    width: 100%;
    color: ${(props) => (props.isCorrect ? '#0984e3' : '#fb4364')};
`;
