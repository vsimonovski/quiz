import Ajv from 'ajv';

interface IAnswer {
    answer: string;
    questionId: number;
    isCorrect: number;
}

interface ISubmittedAnswer {
    answer: string;
    questionId: number;
}

const ajv = new Ajv();

const answerValidator = ajv.compile({
    type: 'object',
    properties: {
        answer: { type: 'string' },
        questionId: { type: 'number' },
        isCorrect: { type: 'number', minimum: 0, maximum: 1 },
    },
    required: ['answer', 'questionId', 'isCorrect'],
    additionalProperties: false,
});

const submittedAnswerValidator = ajv.compile({
    type: 'object',
    properties: {
        answer: { type: 'string' },
        questionId: { type: 'number' },
    },
    required: ['answer', 'questionId'],
    additionalProperties: false,
});

export { IAnswer, ISubmittedAnswer, answerValidator, submittedAnswerValidator };
