import { rest } from 'msw';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';

import Login from './Login';
import { server } from '../../mocks/server';
import { appConfiguration } from '../../config/app.config';

describe('Login View', () => {
    it('should display Log in view elements', () => {
        render(<Login />, { wrapper: BrowserRouter });

        expect(screen.getByPlaceholderText('Username')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
        expect(screen.getByRole('button')).toBeInTheDocument();
        expect(screen.getByRole('button')).toHaveTextContent('Log in');
        expect(screen.getByRole('link')).toBeInTheDocument();
        expect(screen.getByRole('link')).toHaveTextContent('register now!');
    });

    it('should notify user that username and password are required', async () => {
        render(<Login />, { wrapper: BrowserRouter });
        userEvent.click(screen.getByRole('button'));
        const usernameErrorMsg = await screen.findByText(
            /Username is required/
        );
        const passwordErrorMsg = await screen.findByText(
            /Password is required/
        );

        expect(usernameErrorMsg).toBeInTheDocument();
        expect(passwordErrorMsg).toBeInTheDocument();
    });

    it('correctly add value inside inputs', async () => {
        const mockUsername = 'mockUsername';
        const mockPassword = 'mockPassword';

        render(<Login />, { wrapper: BrowserRouter });

        const usernameField = screen.getByPlaceholderText('Username');
        const passwordField = screen.getByPlaceholderText('Password');

        userEvent.type(usernameField, mockUsername);
        userEvent.type(passwordField, mockPassword);

        expect(usernameField).toHaveValue(mockUsername);
        expect(passwordField).toHaveValue(mockPassword);
    });

    it('shoud show message that username must meet required length', async () => {
        const mockUsername = '42';

        render(<Login />, { wrapper: BrowserRouter });

        const usernameField = screen.getByPlaceholderText('Username');
        userEvent.type(usernameField, mockUsername);

        const usernameErrorMsg = await screen.findByText(
            /Username is too short/
        );

        expect(usernameErrorMsg).toBeInTheDocument();
    });

    it('shoud show message that password must meet required length', async () => {
        const mockPassword = '42';

        render(<Login />, { wrapper: BrowserRouter });

        const passwordField = screen.getByPlaceholderText('Password');
        userEvent.type(passwordField, mockPassword);

        const passwordErrorMsg = await screen.findByText(
            /Password is too short/
        );

        expect(passwordErrorMsg).toBeInTheDocument();
    });

    it('should show message that username does not exist', async () => {
        const mockUsername = 'invalidUsername';
        const mockPassword = 'invalidPassword';
        const mockErrorMessage = `Username: ${mockUsername} does not exist`;

        server.use(
            rest.post(
                `${appConfiguration.api.baseUrl}/auth/login`,
                (req, res, ctx) => {
                    return res(
                        ctx.status(404),
                        ctx.json({
                            errorMessage: mockErrorMessage,
                        })
                    );
                }
            )
        );

        render(<Login />, { wrapper: BrowserRouter });

        const usernameField = screen.getByPlaceholderText('Username');
        const passwordField = screen.getByPlaceholderText('Password');

        userEvent.type(usernameField, mockUsername);
        userEvent.type(passwordField, mockPassword);

        userEvent.click(screen.getByRole('button'));

        await waitFor(() => {
            expect(screen.getByText(mockErrorMessage)).toBeInTheDocument();
        });
    });

    it('should show message that user password is invalid', async () => {
        const mockUsername = 'validUsername';
        const mockPassword = 'invalidPassword';
        const mockErrorMessage = 'Invalid user password';

        server.use(
            rest.post(
                `${appConfiguration.api.baseUrl}/auth/login`,
                (req, res, ctx) => {
                    return res(
                        ctx.status(401),
                        ctx.json({
                            errorMessage: mockErrorMessage,
                        })
                    );
                }
            )
        );

        render(<Login />, { wrapper: BrowserRouter });

        const usernameField = screen.getByPlaceholderText('Username');
        const passwordField = screen.getByPlaceholderText('Password');

        userEvent.type(usernameField, mockUsername);
        userEvent.type(passwordField, mockPassword);

        userEvent.click(screen.getByRole('button'));

        await waitFor(() => {
            expect(screen.getByText(mockErrorMessage)).toBeInTheDocument();
        });
    });
});
