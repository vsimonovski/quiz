import React from 'react';
import { Col, Form, Select } from 'antd';
import { countries } from '../../config/app.config';

const AddCountryGuessGame = () => {
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
            </Col>
        </React.Fragment>
    );
};

export default AddCountryGuessGame;
