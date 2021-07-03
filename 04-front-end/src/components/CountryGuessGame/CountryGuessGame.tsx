import React from 'react';
import { GameProps } from '../../containers/Game/Game.type';
import * as S from './CountryGuessGame.style';
import { Button, Col, Form, Input, Row } from 'antd';
import { Rule } from 'antd/lib/form';

const CountryGuessGame = ({ questionData, onAnswerSubmit }: GameProps) => {
    const answerRules: Rule[] = [
        {
            required: true,
            message: 'Please add answer',
        },
    ];

    const handleFormSubmit = ({ answer }: { answer: string }) => {
        onAnswerSubmit(answer.trim());
    };

    return (
        <S.Container>
            <S.Title>Which country has this flag: </S.Title>
            <Form onFinish={handleFormSubmit}>
                <Row justify="center">
                    <Col>
                        <Form.Item name="flag">
                            <img
                                alt="country flag"
                                src={`https://www.countryflags.io/${questionData.question}/flat/64.png`}
                            />
                        </Form.Item>
                    </Col>
                    <Col span="20">
                        <Form.Item name="answer" rules={answerRules}>
                            <Input type="text" />
                        </Form.Item>
                    </Col>
                    <Col>
                        <Form.Item>
                            <Button type="primary" htmlType="submit">
                                submit answer
                            </Button>
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </S.Container>
    );
};

export default CountryGuessGame;
