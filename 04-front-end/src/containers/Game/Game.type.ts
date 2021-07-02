import { ApiResponseStatus } from '../../api/api';

export interface GameProps {
    questionData: Question;
    onAnswerSubmit: (data: any) => void;
}

export interface LetterCount {
    [letter: string]: number;
}

export interface Question {
    questionId: number;
    question: string;
    categoryId: number;
}

export interface Answer {
    answer: string;
    isCorrect: boolean;
}

export interface AnswerExplanation {
    answerExplanation: string;
    questionId: number;
}

export interface Category {
    categoryId: number;
    categoryName: string;
    categoryTimer: number;
}

export interface QuestionResponse {
    status: ApiResponseStatus;
    data: Question;
}

export interface AnswerValidationResponse {
    status: ApiResponseStatus;
    data: boolean;
}

export interface AnswerExplanationResponse {
    status: ApiResponseStatus;
    data: AnswerExplanation;
}

export interface AnswerResponse {
    status: ApiResponseStatus;
    data: Answer[];
}

export interface CategoryResponse {
    status: ApiResponseStatus;
    data: Category[];
}
