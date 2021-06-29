import { api, ApiResponse } from '../api/api';
import {
    LetterCount,
    QuestionResponse,
    Question,
    Answer,
    AnswerResponse,
} from '../pages/Game/Game.type';

export const getRandomQuestionByCategoryId = (
    categoryId: number
): Promise<QuestionResponse> => {
    return api('get', `/question/random/${categoryId}`, false, false);
};

export const getTimerValueForQuestion = (
    categoryId: number
): Promise<ApiResponse> => {
    return api('get', `/category/${categoryId}`, false, false);
};

export const checkIfAnswerIsCorrect = (
    questionId: number,
    answer: string
): Promise<AnswerResponse> => {
    return api('post', '/answer/validation', { questionId, answer }, false);
};

export const getInitialQuestionState = (): Question => {
    return {
        questionId: 0,
        question: '',
        categoryId: 0,
    };
};

export const getInitialAnswerState = (): Answer => {
    return {
        answer: '',
        isCorrect: false,
    };
};

export const countLetterOccurrences = (arr: string[]): LetterCount =>
    arr.reduce((prev: LetterCount, curr: string) => {
        prev[curr] = (prev[curr] || 0) + 1;
        return prev;
    }, {});

export const compareOccurrences = (
    questionOccurrences: LetterCount,
    answerOccurrences: LetterCount
): boolean => {
    if (Object.keys(answerOccurrences).length === 0) return true;

    let onlySupportedCharactersUsed = true;

    for (const letter of Object.keys(answerOccurrences)) {
        if (
            !questionOccurrences[letter] ||
            answerOccurrences[letter] > questionOccurrences[letter]
        ) {
            onlySupportedCharactersUsed = false;
        }
    }

    return onlySupportedCharactersUsed;
};

export const calculateScoreForQuestion = (
    questionNumber: number,
    isAnswerCorrect: boolean,
    answer: string
): number => {
    if (questionNumber === 1 && isAnswerCorrect) {
        return answer.length;
    }

    return 0;
};
