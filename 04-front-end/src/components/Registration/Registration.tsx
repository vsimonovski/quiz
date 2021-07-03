import React, { useState } from 'react';
import { Button, Col, Form, Input, Row } from 'antd';
import {
    attemptUserRegistration,
    confirmPasswordRules,
    passwordRules,
    usernameRules,
} from '../../utils/auth.util';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router-dom';
import { setAuthToken, setRefreshToken } from '../../api/api';
import * as S from '../../containers/Form/FormContainer/FormContainer.style';
import { AuthFields } from '../../containers/Form/Form.type';

const Registration = () => {
    const [errorsOnRegister, setErrorsOnRegister] = useState('');
    const [isFormSubmitting, setIsFormSubmitting] = useState(false);
    const history = useHistory();

    const onFinish = ({ username, password }: AuthFields) => {
        setIsFormSubmitting(true);
        setErrorsOnRegister('');
        sessionStorage.setItem('username', '');
        attemptUserRegistration(username, password).then(({ data, status }) => {
            if (status === 'error') {
                setErrorsOnRegister(data.error);
                setIsFormSubmitting(false);
                return;
            }
            setAuthToken(data.authToken);
            setRefreshToken(data.refreshToken);
            setIsFormSubmitting(false);
            history.push('/');
        });
    };

    return (
        <div>
            <Form
                name="basic"
                initialValues={{ remember: true }}
                onFinish={onFinish}
                wrapperCol={{ span: '24' }}
            >
                <Row>
                    <Col span={20} offset={2}>
                        <Form.Item
                            name="username"
                            rules={usernameRules}
                            hasFeedback
                        >
                            <Input
                                prefix={
                                    <UserOutlined className="site-form-item-icon" />
                                }
                                placeholder="Username"
                            />
                        </Form.Item>
                    </Col>

                    <Col span={20} offset={2}>
                        <Form.Item
                            name="password"
                            rules={passwordRules}
                            hasFeedback
                        >
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
                        <Form.Item
                            name="repeatPassword"
                            rules={confirmPasswordRules}
                            hasFeedback
                            dependencies={['password']}
                        >
                            <Input
                                prefix={
                                    <LockOutlined className="site-form-item-icon" />
                                }
                                type="password"
                                placeholder="Confirm Password"
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
                                Register
                            </Button>
                        </Form.Item>
                    </Col>

                    <Col span={20} offset={2}>
                        <S.ErrorMessage>{errorsOnRegister}</S.ErrorMessage>
                    </Col>
                </Row>
            </Form>
        </div>
    );
};

export default Registration;
