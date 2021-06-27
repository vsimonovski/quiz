import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    justify-content: space-around;
    align-items: center;
    background-color: #fb4364;
    color: #fff;
    font-weight: bold;
    min-width: 150px;
    padding: 5px;
    border-radius: 5px;
    margin-top: 10px;
    margin-left: 10px;

    .username {
        text-overflow: ellipsis;
        max-width: 100px;
        overflow: hidden;
    }
`;
