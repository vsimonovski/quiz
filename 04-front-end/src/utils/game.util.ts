import { api, ApiResponse } from '../api/api';
import {
    LetterCount,
    QuestionResponse,
    Question,
    Answer,
    AnswerValidationResponse,
    AnswerExplanationResponse,
    AnswerExplanation,
    AnswerResponse, CategoryResponse,
} from '../containers/Game/Game.type';

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
): Promise<AnswerValidationResponse> => {
    return api('post', '/answer/validation', { questionId, answer }, false);
};

export const getAnswerExplanation = (
    questionId: number
): Promise<AnswerExplanationResponse> => {
    return api('get', `/answer-explanation/${questionId}`, false, true);
};

export const getAnswersByQuestionId = (
    questionId: number
): Promise<AnswerResponse> => {
    return api('get', `/question/answer/${questionId}`, false, false);
};

export const getAllCategories = (): Promise<CategoryResponse> => {
    return api('get', '/category', false, true);
}

export const editAnswerExplanation = (
    questionId: number,
    answerExplanation: string
): Promise<AnswerExplanationResponse> => {
    return api(
        'put',
        `/answer-explanation/${questionId}`,
        { answerExplanation },
        true
    );
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

export const getInitialAnswerExplanationState = (): AnswerExplanation => {
    return {
        questionId: 0,
        answerExplanation: '',
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

    return isAnswerCorrect ? 10 : 0;
};


export const generateRandomLetters = (): string[] => {
    const MAX_LETTERS: number = 10;
    const alphabet: string = 'abcdefghijklmnopqrstuvwxyz';
    const letterArr: string[] = [];

    for (let i: number = 0; i < MAX_LETTERS; i++) {
        letterArr.push(alphabet[Math.floor(Math.random() * alphabet.length)]);
    }

    return letterArr;
};