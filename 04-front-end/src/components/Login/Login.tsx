import React, { useState } from 'react';
import { Form, Input, Button, Col, Row } from 'antd';
import * as S from '../../containers/Form/FormContainer/FormContainer.style';
import {
    attemptUserLogin,
    usernameRules,
    passwordRules,
} from '../../utils/auth.util';
import { setAuthToken, setRefreshToken } from '../../api/api';
import { Link, useHistory } from 'react-router-dom';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { AuthFields } from '../../containers/Form/Form.type';

const Login = () => {
    const [errorsOnLogin, setErrorsOnLogin] = useState('');
    const [isFormSubmitting, setIsFormSubmitting] = useState(false);
    const history = useHistory();

    const onFinish = ({ username, password }: AuthFields) => {
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
        <div>
            <Form
                name="basic"
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
            >
                <Row>
                    <Col span={20} offset={2}>
                        <Form.Item name="username" rules={usernameRules}>
                            <Input
                                prefix={
                                    <UserOutlined className="site-form-item-icon" />
                                }
                                placeholder="Username"
                            />
                        </Form.Item>
                    </Col>
                    <Col span={20} offset={2}>
                        <Form.Item name="password" rules={passwordRules}>
                            <Input
                                prefix={
                                    <LockOutlined className="site-form-item-icon" />
                                }
                                type="password"
                                placeholder="Password"
                            />
                        </Form.Item>
                    </Col>
                    <Col span={20} offset={2}>
                        <Form.Item>
                            <Button
                                type="primary"
                                htmlType="submit"
                                className="submit-form-button"
                                loading={isFormSubmitting}
                            >
                                Log in
                            </Button>
                            Or <Link to="/register">register now!</Link>
                        </Form.Item>
                    </Col>
                    <Col span={20} offset={2}>
                        <S.ErrorMessage>{errorsOnLogin}</S.ErrorMessage>
                    </Col>
                </Row>
            </Form>
        </div>
    );
};

export default Login;
