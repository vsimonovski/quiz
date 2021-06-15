import Ajv from "ajv";

interface IAnswer {
  answer: string;
  questionId: number;
  isCorrect: number;
}

const ajv = new Ajv();

const answerValidator = ajv.compile({
  type: "object",
  properties: {
    answer: { type: "string" },
    questionId: { type: "number" },
    isCorrect: { type: "number", minimum: 0, maximum: 1 },
  },
  required: ["answer", "questionId", "isCorrect"],
  additionalProperties: false,
});

export { IAnswer, answerValidator };
