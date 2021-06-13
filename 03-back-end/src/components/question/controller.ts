import QuestionService from "./service";
import { Request, Response, NextFunction } from "express";

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
}

export default QuestionController;
