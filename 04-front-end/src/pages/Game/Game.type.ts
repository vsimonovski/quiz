import { ApiResponseStatus } from '../../api/api';

export interface QuestionResponse {
    status: ApiResponseStatus;
    data: Question;
}

export interface AnswerResponse {
    status: ApiResponseStatus;
    data: boolean;
}

export interface AnswerExplanationResponse {
    status: ApiResponseStatus;
    data: AnswerExplanation;
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
