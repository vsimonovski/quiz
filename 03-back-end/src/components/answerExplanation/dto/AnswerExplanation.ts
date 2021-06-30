import Ajv from 'ajv';

interface IAnswerExplanation {
    answerExplanation: string;
    questionId: number;
}

const ajv = new Ajv();

const answerExplanationValidator = ajv.compile({
    type: 'object',
    properties: {
        answerExplanation: { type: 'string' },
        questionId: { type: 'number' },
    },
    required: ['answerExplanation', 'questionId'],
    additionalProperties: false,
});

const submittedAnswerExplanationValidator = ajv.compile({
    type: 'object',
    properties: {
        answerExplanation: { type: 'string' },
    },
    required: ['answerExplanation'],
    additionalProperties: false,
});

export { IAnswerExplanation, answerExplanationValidator, submittedAnswerExplanationValidator };
