import React from 'react';
import { Col, Form, Input } from 'antd';

const AddMathGuessGame = () => {
    const mathAnswerValidator = (
        getFieldValue: (fieldName: string) => any
    ) => ({
        validator(_: any, value: string) {
            let incorrectAnswers: string[] = [];
            incorrectAnswers.push(...value.split(' ').join('').split(','));

            if (incorrectAnswers.some((answer) => isNaN(+answer))) {
                return Promise.reject(new Error('Answer must be a number'));
            }

            if (
                incorrectAnswers.some(
                    (answer) => answer === getFieldValue('answers')
                )
            ) {
                return Promise.reject(
                    new Error("Incorrect answer can't be same as correct one")
                );
            }

            return Promise.resolve();
        },
    });

    return (
        <React.Fragment>
            <Col span={24}>
                <Form.Item
                    name="question"
                    rules={[
                        {
                            required: true,
                            pattern: new RegExp(
                                /^-?[0-9]+(([-+/*][0-9]+)?([.,][0-9]+)?)*?$/g
                            ),
                            message: 'Add valid math expression without spaces',
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
                    <Input type="number" placeholder="Add correct answer" />
                </Form.Item>
                <Form.Item
                    name="wrongAnswers"
                    rules={[
                        {
                            required: true,
                            message: 'Please add wrong answers',
                        },
                        ({ getFieldValue }) =>
                            mathAnswerValidator(getFieldValue),
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
