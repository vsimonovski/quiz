import React, { ChangeEvent, useEffect, useState } from 'react';
import * as S from './WordGuessGame.style';
import { Input, Button, Form, Row, Col } from 'antd';
import {
    compareOccurrences,
    countLetterOccurrences,
} from '../../../utils/game.util';
import { GameProps } from '../Game.type';

const WordGuessGame = ({ questionData, onAnswerSubmit }: GameProps) => {
    const { question } = questionData;

    // initialize with empty space in order to always show help container in UI
    const [answerValidationMessage, setAnswerValidationMessage] = useState(' ');
    const [answerLetterOccurrence, setAnswerLetterOccurrence] = useState({});
    const [isValidAnswer, setIsValidAnswer] = useState(true);
    const [questionLetterOccurrence] = useState(
        countLetterOccurrences(question.split(''))
    );

    useEffect(() => {
        setIsValidAnswer(
            compareOccurrences(questionLetterOccurrence, answerLetterOccurrence)
        );

        if (!isValidAnswer) {
            setAnswerValidationMessage('Please use only given letters');
            return;
        }
        setAnswerValidationMessage(' ');
    }, [answerLetterOccurrence, questionLetterOccurrence, isValidAnswer]);

    const handleAnswerChange = (e: ChangeEvent<HTMLInputElement>) => {
        const answerLetterOccurrence = countLetterOccurrences(
            e.currentTarget.value.split('')
        );

        setAnswerLetterOccurrence(answerLetterOccurrence);
    };

    const onFormSubmit = ({ answer }: any) => {
        if (
            Object.keys(answerLetterOccurrence).length === 0 ||
            answerValidationMessage.length !== 1
        )
            return;

        onAnswerSubmit(answer);
    };

    return (
        <S.Container>
            <S.Title>Find the longest word from given letters:</S.Title>
            <S.QuestionContent>{question}</S.QuestionContent>
            <Form name="question" onFinish={onFormSubmit}>
                <Row justify={'center'}>
                    <Col span={24}>
                        <Form.Item
                            name="answer"
                            help={answerValidationMessage}
                            validateStatus={
                                answerValidationMessage.length > 1
                                    ? 'error'
                                    : 'success'
                            }
                        >
                            <Input
                                className="question-input"
                                type="text"
                                onChange={handleAnswerChange}
                            />
                        </Form.Item>
                    </Col>
                    <Col>
                        <Form.Item>
                            <Button
                                className="question-submit"
                                type="primary"
                                htmlType="submit"
                            >
                                submit answer
                            </Button>
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </S.Container>
    );
};

export default WordGuessGame;
