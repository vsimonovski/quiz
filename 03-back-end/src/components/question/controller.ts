import QuestionService from "./service";
import { Request, Response } from "express";
import QuestionModel from "./model";
import IErrorResponse from "../../common/IErrorResponse.interface";
import { questionValidator, IQuestion } from "./dto/Question";

class QuestionController {
  private questionService: QuestionService;

  constructor(questionService: QuestionService) {
    this.questionService = questionService;
  }

  async getAll(req: Request, res: Response) {
    const questions = await this.questionService.getAll();

    if (questions instanceof Array) {
      res.send(questions);
      return;
    }

    res.status(500).send(questions);
  }

  async getById(req: Request, res: Response) {
    const questionId: number = +req.params.id;

    if (questionId <= 0) {
      res.sendStatus(400);
      return;
    }

    const data: QuestionModel | IErrorResponse =
      await this.questionService.getById(questionId);

    if (!(data instanceof QuestionModel)) {
      res.status(404).send(data);
      return;
    }

    if (data instanceof QuestionModel) {
      res.send(data);
      return;
    }

    res.status(500).send(data);
  }

  async add(req: Request, res: Response) {
    const data: IQuestion = req.body;
    if (!questionValidator(data)) {
      res.status(400).send(questionValidator.errors);
      return;
    }

    const result: QuestionModel | IErrorResponse =
      await this.questionService.add(data);

    res.send(result);
  }

  async edit(req: Request, res: Response) {
    const questionId: number = +req.params.id;
    const data: IQuestion = req.body;

    if (questionId <= 0 || isNaN(questionId)) {
      res.sendStatus(400);
      return;
    }

    if (!questionValidator(data)) {
      res.status(400).send(questionValidator.errors);
      return;
    }

    const result: QuestionModel | IErrorResponse =
      await this.questionService.edit(questionId, data);

    if (result instanceof QuestionModel) {
      res.send(result);
      return;
    }
    res.status(404).send(result);
  }
}

export default QuestionController;
