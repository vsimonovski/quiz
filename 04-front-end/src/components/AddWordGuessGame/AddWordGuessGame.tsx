import React from 'react';
import { Form, Input, Col } from 'antd';
import { ReloadOutlined } from '@ant-design/icons';
import * as S from './AddWordGuessGame.style';

interface AddWordGuessGameProps {
    randomLetters: string;
    onChange: (randomLetters: string) => void;
}

const AddWordGuessGame = ({
    randomLetters,
    onChange,
}: AddWordGuessGameProps) => {
    return (
        <S.Container>
            <Col span={24}>
                <Form.Item className="random-letters">
                    <span>{randomLetters}</span>
                    <ReloadOutlined onClick={() => onChange(randomLetters)} />
                </Form.Item>
            </Col>

            <Col span={24}>
                <Form.Item
                    name="answers"
                    rules={[
                        {
                            required: true,
                            message: 'Please add answers',
                        },
                    ]}
                >
                    <Input
                        type="text"
                        placeholder="Separate multiple answers with ,"
                    />
                </Form.Item>
            </Col>
        </S.Container>
    );
};

export default AddWordGuessGame;
