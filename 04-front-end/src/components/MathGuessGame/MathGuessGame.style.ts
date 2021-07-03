import styled from 'styled-components';

export const Title = styled.h3`
    color: #fff;
    font-size: 20px;
    font-style: italic;
    font-weight: bold;
    text-align: center;
    text-transform: uppercase;
`;

export const Content = styled.div`
    display: flex;
    justify-content: space-around;
`;

export const OfferedAnswer = styled.span`
    background-color: #fff;
    font-weight: bold;
    width: 60px;
    padding: 4px;
    text-align: center;
    border-radius: 4px;
    color: #333;

    &:hover {
        cursor: pointer;
        background-color: aqua;
    }
`;
