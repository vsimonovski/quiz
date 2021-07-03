import React, { useState } from 'react';
import { Button, Col, Form, Input, Row, Select, Spin } from 'antd';
import useCategories from '../../../utils/hooks/useCategories';
import AddWordGuessGame from '../../../components/AddWordGuessGame/AddWordGuessGame';
import * as S from './AddQuestionContainer.style';
import {
    generateRandomLetters,
    getFormattedQuestionAndAnswers,
    submitQuestionData,
} from '../../../utils/game.util';
import AddCountryGuessGame from '../../../components/AddCountryGuessGame/AddCountryGuessGame';
import AddFlagGuessGame from '../../../components/AddFlagGuessGame/AddFlagGuessGame';
import AddMathGuessGame from "../../../components/AddMathGuessGame/AddMathGuessGame";

const AddQuestionContainer = () => {
    const { Option } = Select;
    const [formInstance] = Form.useForm();

    const categories = useCategories();
    const [selectedCategoryId, setSelectedCategoryId] = useState(0);
    const [randomLetters, setRandomLetters] = useState(() =>
        generateRandomLetters()
    );

    const handleOnChange = (categoryName: string, optionValue: any) => {
        setSelectedCategoryId(+optionValue.key);
    };

    if (!categories.length) return <Spin />;

    const handleFormSubmit = async ({
        question,
        answers,
        wrongAnswers,
        answerExplanation,
    }: any) => {
        let [formattedQuestion, formattedAnswers] =
            getFormattedQuestionAndAnswers(
                selectedCategoryId,
                question,
                answers,
                randomLetters
            );


        try {
            await submitQuestionData(
                selectedCategoryId,
                formattedQuestion,
                formattedAnswers,
                answerExplanation,
                wrongAnswers
            );

            formInstance.resetFields();
            setSelectedCategoryId(0);
        } catch (e) {
            console.error('Something went wrong while adding question: ', e);
        }
    };

    const handleLettersChange = () => {
        setRandomLetters(() => generateRandomLetters());
    };

    return (
        <S.Container>
            <Form onFinish={handleFormSubmit} form={formInstance}>
                <Row>
                    <Col span={24}>
                        <Form.Item
                            name="categoryId"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please select category',
                                },
                            ]}
                        >
                            <Select
                                placeholder="Select category"
                                onChange={handleOnChange}
                            >
                                {categories.map((category) => (
                                    <Option
                                        key={category.categoryId}
                                        value={category.categoryName}
                                    >
                                        {category.categoryName}
                                    </Option>
                                ))}
                            </Select>
                        </Form.Item>
                    </Col>
                    <S.AddForm>
                        {selectedCategoryId === 1 && (
                            <AddWordGuessGame
                                randomLetters={randomLetters}
                                onChange={handleLettersChange}
                            />
                        )}
                        {selectedCategoryId === 2 && <AddCountryGuessGame />}
                        {selectedCategoryId === 3 && <AddFlagGuessGame />}
                        {selectedCategoryId === 4 && <AddMathGuessGame />}
                    </S.AddForm>
                    <Col span={24}>
                        <Form.Item
                            name="answerExplanation"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please add explanation',
                                },
                            ]}
                        >
                            <Input
                                type="text"
                                placeholder="Answer explanation"
                            />
                        </Form.Item>
                    </Col>
                    <Col span={24}>
                        <Form.Item>
                            <Button
                                type="primary"
                                htmlType="submit"
                                className="submit-form-button"
                            >
                                add question
                            </Button>
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </S.Container>
    );
};

export default AddQuestionContainer;
