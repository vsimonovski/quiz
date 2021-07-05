import React from 'react';
import { Form, Input, Col } from 'antd';
import { ReloadOutlined } from '@ant-design/icons';
import * as S from './AddWordGuessGame.style';
import {
    compareOccurrences,
    countLetterOccurrences,
} from '../../utils/game.util';

interface AddWordGuessGameProps {
    randomLetters: string;
    onChange: (randomLetters: string) => void;
}

const AddWordGuessGame = ({
    randomLetters,
    onChange,
}: AddWordGuessGameProps) => {
    const wordAnswerValidator = {
        validator(_: any, value: string) {
            let correctAnswers: string[] = [];
            correctAnswers.push(...value.split(' ').join('').split(','));

            const hasInvalidCharacters = correctAnswers.some((answer) => {
                if (answer.length) {
                    const questionLetterOcc = countLetterOccurrences(
                        randomLetters.split('')
                    );
                    const answerLetterOcc = countLetterOccurrences(
                        answer.split('')
                    );
                    return !compareOccurrences(
                        questionLetterOcc,
                        answerLetterOcc
                    );
                }

                return false;
            });

            return hasInvalidCharacters
                ? Promise.reject(new Error('Use only given characters'))
                : Promise.resolve();
        },
    };

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
                        () => wordAnswerValidator,
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
