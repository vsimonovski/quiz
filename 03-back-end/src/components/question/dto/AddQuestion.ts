import Ajv from "ajv";

interface IAddQuestion {
  question: string;
  categoryId: number;
}

const ajv = new Ajv();

const commonOptions = {
  categoryId: { type: "integer", enum: [1, 2, 3, 4] },
  other: {
    required: ["question", "categoryId"],
    additionalProperties: false,
  },
};

// TODO: Enhance validator
const addQuestionValidator = ajv.compile({
  type: "object",
  allOf: [
    {
      if: {
        properties: {
          categoryId: { const: 1 },
        },
      },
      then: {
        properties: {
          question: { type: "string", minLength: 10, maxLength: 10 },
          categoryId: { ...commonOptions.categoryId },
        },
        ...commonOptions.other,
      },
    },
    {
      if: {
        properties: {
          categoryId: { const: 2 },
        },
      },
      then: {
        properties: {
          question: { type: "string", minLength: 2, maxLength: 2 },
          categoryId: { ...commonOptions.categoryId },
        },
        ...commonOptions.other,
      },
    },
    {
      if: {
        properties: {
          categoryId: { const: 3 },
        },
      },
      then: {
        properties: {
          question: { type: "string", minLength: 1, maxLength: 50 },
          categoryId: { ...commonOptions.categoryId },
        },
        ...commonOptions.other,
      },
    },
    {
      if: {
        properties: {
          categoryId: { const: 4 },
        },
      },
      then: {
        properties: {
          question: { type: "string", minLength: 3, maxLength: 128 },
          categoryId: { ...commonOptions.categoryId },
        },
        ...commonOptions.other,
      },
    },
  ],
});

export { IAddQuestion, addQuestionValidator };
