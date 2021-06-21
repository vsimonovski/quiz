import React, { useEffect, useState } from 'react';
import { AuthProps } from './Auth.type';
import { LinkName } from '../AuthLink/AuthLink.type';
import { AuthForm, AuthLabel, AuthInput } from './Auth.style';
import { attemptUserLogin, attemptUserRegister } from './Auth.util';

const Auth = ({ activeLink }: AuthProps) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');

    const isPasswordFieldVisible: boolean =
        activeLink === LinkName.LOGIN || activeLink === LinkName.REGISTER;
    const isRepeatPasswordFieldVisible: boolean =
        activeLink === LinkName.REGISTER;

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        if (activeLink === LinkName.LOGIN) {
            try {
                const res = await attemptUserLogin(username, password);
                console.log(res);
            } catch (e) {
                console.log(e);
            }
            return;
        }

        if (activeLink === LinkName.REGISTER) {
            try {
                const res = await attemptUserRegister(username, password);
                console.log(res);
            } catch (e) {
                console.log(e);
            }
        }
    };

    useEffect(() => {
        setUsername('');
        setPassword('');
        setRepeatPassword('');
    }, [activeLink]);

    return (
        <AuthForm onSubmit={handleSubmit}>
            <label>
                <AuthInput
                    name="username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <AuthLabel>Username</AuthLabel>
            </label>
            {isPasswordFieldVisible && (
                <label>
                    <AuthInput
                        name="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <AuthLabel>Password</AuthLabel>
                </label>
            )}
            {isRepeatPasswordFieldVisible && (
                <label>
                    <AuthInput
                        name="repeat_password"
                        type="password"
                        value={repeatPassword}
                        onChange={(e) => setRepeatPassword(e.target.value)}
                    />
                    <AuthLabel>confirm password</AuthLabel>
                </label>
            )}
            <input type="submit" value="start" />
        </AuthForm>
    );
};

export default Auth;
