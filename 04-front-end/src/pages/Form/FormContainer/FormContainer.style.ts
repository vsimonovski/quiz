import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    overflow: hidden;
    background-color: #fff;
    align-items: center;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
    width: 350px;
    height: 464px;
    padding: 24px;
    margin-top: 40px;

    .site-form-item-icon {
        color: rgba(0, 0, 0, 0.25);
    }

    .submit-form-button {
        width: 100%;
    }
`;

export const ErrorMessage = styled.div`
    height: 10px;
    content: '&nbsp';
    color: #e74c3c;
    text-align: center;
`;
