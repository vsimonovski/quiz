import React from 'react';
import { Col, Form, Input } from 'antd';

const AddMathGuessGame = () => {
    return (
        <React.Fragment>
            <Col span={24}>
                <Form.Item
                    name="question"
                    rules={[
                        {
                            required: true,
                            message: 'Please add question',
                        },
                    ]}
                >
                    <Input type="text" placeholder="Add math expression" />
                </Form.Item>
                <Form.Item
                    name="answers"
                    rules={[
                        {
                            required: true,
                            message: 'Please add correct answer',
                        },
                    ]}
                >
                    <Input type="text" placeholder="Add correct answer" />
                </Form.Item>
                <Form.Item
                    name="wrongAnswers"
                    rules={[
                        {
                            required: true,
                            message: 'Please add wrong answers',
                        },
                    ]}
                >
                    <Input
                        type="text"
                        placeholder="Separate multiple incorrect answers with ,"
                    />
                </Form.Item>
            </Col>
        </React.Fragment>
    );
};

export default AddMathGuessGame;
