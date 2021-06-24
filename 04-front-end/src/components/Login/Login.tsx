import React, { useState } from 'react';
import * as S from './Login.style';
import { Form, Input, Button } from 'antd';
import {
    attemptUserLogin,
    usernameRules,
    passwordRules,
} from '../../utils/auth.util';
import { LoginFields } from './Login.type';
import { setAuthToken, setRefreshToken } from '../../api/api';
import { useHistory } from 'react-router-dom';

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};
const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
};

const Login = () => {
    const [errorsOnLogin, setErrorsOnLogin] = useState('');
    const [isFormSubmitting, setIsFormSubmitting] = useState(false);
    const history = useHistory();

    const onFinish = ({ username, password }: LoginFields) => {
        setIsFormSubmitting(true);
        setErrorsOnLogin('');
        attemptUserLogin(username, password).then(({ data, status }) => {
            if (status === 'error') {
                setErrorsOnLogin(data.error);
                setIsFormSubmitting(false);
                return;
            }
            setAuthToken(data.authToken);
            setRefreshToken(data.refreshToken);
            setIsFormSubmitting(false);
            history.push('/');
        });
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };
    return (
        <S.Container>
            <h1>Log In</h1>
            <Form
                {...layout}
                name="basic"
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
            >
                <Form.Item
                    label="Username"
                    name="username"
                    rules={usernameRules}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                    rules={passwordRules}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item {...tailLayout}>
                    <Button
                        type="primary"
                        htmlType="submit"
                        loading={isFormSubmitting}
                    >
                        Submit
                    </Button>
                </Form.Item>
            </Form>
            <S.ErrorMessage>{errorsOnLogin}</S.ErrorMessage>
        </S.Container>
    );
};

export default Login;
