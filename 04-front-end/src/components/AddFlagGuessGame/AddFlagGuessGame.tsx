import React from 'react';
import { Col, Form, Select } from 'antd';
import { countries } from '../../config/app.config';

const AddFlagGuessGame = () => {
    const { Option } = Select;
    return (
        <React.Fragment>
            <Col span={24}>
                <Form.Item
                    name="question"
                    rules={[
                        {
                            required: true,
                            message: 'Please select country',
                        },
                    ]}
                >
                    <Select placeholder="Select country">
                        {countries.map((country) => (
                            <Option key={country.code} value={country.code}>
                                {country.name}
                            </Option>
                        ))}
                    </Select>
                </Form.Item>
                <Form.Item
                    name="wrongAnswers"
                    rules={[
                        {
                            required: true,
                            message: 'Please add incorrect answers',
                        },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (value.includes(getFieldValue('question'))) {
                                    return Promise.reject(
                                        new Error(
                                            "Incorrect answer can't be same as question"
                                        )
                                    );
                                }
                                if (value.length !== 2) {
                                    return Promise.reject(
                                        new Error(
                                            'Please provide two incorrect answers'
                                        )
                                    );
                                }
                                return Promise.resolve();
                            },
                        }),
                    ]}
                >
                    <Select
                        placeholder="Select incorrect answers"
                        mode="multiple"
                    >
                        {countries.map((country) => (
                            <Option key={country.code} value={country.code}>
                                {country.name}
                            </Option>
                        ))}
                    </Select>
                </Form.Item>
            </Col>
        </React.Fragment>
    );
};

export default AddFlagGuessGame;
