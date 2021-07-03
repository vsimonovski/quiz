import styled from 'styled-components';

export const Container = styled.div`
    .flags {
        display: flex;
        justify-content: space-around;
    }

    img {
        &:hover {
            cursor: pointer;
        }
    }
`;

export const Title = styled.h3`
    color: #fff;
    font-size: 20px;
    font-style: italic;
    font-weight: bold;
    text-align: center;
    text-transform: uppercase;
`;
