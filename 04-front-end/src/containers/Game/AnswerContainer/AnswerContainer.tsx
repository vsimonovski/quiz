import React, { useEffect, useState } from 'react';
import { Button, Card, Spin } from 'antd';
import { CloseOutlined, FormOutlined } from '@ant-design/icons';
import * as S from './AnswerContainer.style';
import { Answer, Question } from '../Game.type';
import {
    editAnswerExplanation,
    getAnswerExplanation,
    getInitialAnswerExplanationState,
} from '../../../utils/game.util';
import EditAnswerExplanation from '../../../components/EditAnswerExplanation/EditAnswerExplanation';
import { useHistory } from 'react-router-dom';

interface AnswerProps {
    answerData: Answer;
    questionData: Question;
    isLoggedIn: boolean;
    questionNumber: number;
    onNextQuestionClick: () => void;
}

const AnswerContainer = ({
    answerData,
    onNextQuestionClick,
    questionData,
    isLoggedIn,
    questionNumber,
}: AnswerProps) => {
    const [explanation, setExplanation] = useState(() =>
        getInitialAnswerExplanationState()
    );
    const [editMode, setEditMode] = useState(false);
    const history = useHistory();

    useEffect(() => {
        if (!answerData.isCorrect) {
            getAnswerExplanation(questionData.questionId).then((res) => {
                if (res.status === 'ok') {
                    setExplanation(res.data);
                }
            });
        }
    }, [answerData, questionData]);

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
                        Your answer is {answerData.isCorrect ? '' : 'in'}
                        correct!
                    </S.Title>
                    {!answerData.isCorrect && (
                        <span className="correct-answers">
                            Correct answer: {explanation.answerExplanation}
                        </span>
                    )}
                    {questionNumber !== 4 && (
                        <Button type="primary" onClick={onNextQuestionClick}>
                            next question
                        </Button>
                    )}
                    {questionNumber === 4 && (
                        <Button onClick={() => history.push('/')}>
                            end game
                        </Button>
                    )}
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
