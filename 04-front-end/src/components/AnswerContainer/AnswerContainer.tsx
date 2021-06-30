import React, { useEffect, useState } from 'react';
import { Button, Card, Spin } from 'antd';
import { CloseOutlined, FormOutlined } from '@ant-design/icons';
import * as S from './AnswerContainer.style';
import { Answer, Question } from '../../pages/Game/Game.type';
import {
    editAnswerExplanation,
    getAnswerExplanation,
    getInitialAnswerExplanationState,
} from '../../utils/game.util';
import EditAnswerExplanation from '../EditAnswerExplanation/EditAnswerExplanation';

interface AnswerProps {
    answerData: Answer;
    questionData: Question;
    isLoggedIn: boolean;
    onNextQuestionClick: () => void;
}

const AnswerContainer = ({
    answerData,
    onNextQuestionClick,
    questionData,
    isLoggedIn,
}: AnswerProps) => {
    const [explanation, setExplanation] = useState(() =>
        getInitialAnswerExplanationState()
    );
    const [editMode, setEditMode] = useState(false);

    useEffect(() => {
        if (!answerData.isCorrect) {
            getAnswerExplanation(questionData.questionId).then((res) => {
                if (res.status === 'ok') {
                    setExplanation(res.data);
                }
            });
        }
    }, [answerData]);

    const handleEditClick = () => {
        setEditMode(!editMode);
    };

    const handleSaveExplanationClick = async ({
        explanation,
    }: {
        explanation: string;
    }) => {
        editAnswerExplanation(questionData.questionId, explanation).then(
            (res) => {
                if (res.status === 'ok') {
                    setExplanation(res.data);
                    setEditMode(!editMode);
                }
            }
        );
    };

    if (!answerData.isCorrect && !explanation.answerExplanation.length)
        return <Spin />;

    return (
        <S.Container>
            {!answerData.isCorrect && isLoggedIn && (
                <span className="edit-button" onClick={handleEditClick}>
                    {editMode ? <CloseOutlined /> : <FormOutlined />}
                </span>
            )}
            {!editMode && (
                <Card>
                    <S.Title isCorrect={answerData.isCorrect}>
                        Your answer: {answerData.answer}
                    </S.Title>
                    {!answerData.isCorrect && (
                        <span className="correct-answers">
                            Correct answers: {explanation.answerExplanation}
                        </span>
                    )}
                    <Button type="primary" onClick={onNextQuestionClick}>
                        next question
                    </Button>
                </Card>
            )}
            {editMode && (
                <EditAnswerExplanation
                    explanation={explanation.answerExplanation}
                    onSaveExplanationClick={handleSaveExplanationClick}
                />
            )}
        </S.Container>
    );
};

export default AnswerContainer;
