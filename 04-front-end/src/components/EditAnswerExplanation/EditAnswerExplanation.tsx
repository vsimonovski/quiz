import React from 'react';
import { Button, Card, Col, Form, Input, Row } from 'antd';
import { Rule } from 'antd/lib/form';

interface EditAnswerExplanationProps {
    explanation: string;
    onSaveExplanationClick: ({explanation}: {explanation: string}) => void;
}

const EditAnswerExplanation = ({
    explanation,
    onSaveExplanationClick,
}: EditAnswerExplanationProps) => {
    const explanationRules: Rule[] = [
        { required: true, message: 'Explanation is required' },
    ];

    return (
        <Card>
            <Form onFinish={onSaveExplanationClick}>
                <Row>
                    <Col span={20} offset={2}>
                        <Form.Item
                            rules={explanationRules}
                            name="explanation"
                            initialValue={explanation}
                        >
                            <Input type="text" />
                        </Form.Item>
                    </Col>

                    <Col  span={10} offset={7}>
                        <Form.Item>
                            <Button
                                type="primary"
                                htmlType="submit"
                            >
                                save explanation
                            </Button>
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </Card>
    );
};

export default EditAnswerExplanation;
