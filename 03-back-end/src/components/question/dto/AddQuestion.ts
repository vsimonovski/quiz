import Ajv from "ajv";

interface IAddQuestion {
  question: string;
  categoryId: number;
}

const ajv = new Ajv();

const addQuestionValidator = ajv.compile({
  type: "object",
  properties: {
    question: { type: "string", minLength: 2, maxLength: 64 },
    categoryId: { type: "integer", enum: [1, 2, 3, 4] },
  },
  required: ["question", "categoryId"],
  additionalProperties: false,
});

export { IAddQuestion, addQuestionValidator };
