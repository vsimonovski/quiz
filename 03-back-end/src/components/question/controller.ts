import QuestionService from "./service";
import { Request, Response } from "express";
import QuestionModel from "./model";
import IErrorResponse from "../../common/IErrorResponse.interface";

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
    const id: string = req.params.id;
    const questionId: number = +id;

    if (questionId <= 0) {
      res.sendStatus(400);
      return;
    }

    const data: QuestionModel | IErrorResponse =
      await this.questionService.getById(questionId);

    console.log(data);

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
}

export default QuestionController;
