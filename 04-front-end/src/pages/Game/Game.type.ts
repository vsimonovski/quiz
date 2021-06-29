import { ApiResponseStatus } from '../../api/api';

export interface QuestionResponse {
    status: ApiResponseStatus;
    data: Question;
}

export interface AnswerResponse {
    status: ApiResponseStatus;
    data: boolean;
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
