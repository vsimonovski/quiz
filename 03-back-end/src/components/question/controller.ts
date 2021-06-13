import QuestionService from "./service";
import {Request, Response, NextFunction} from "express";


class QuestionController {
  private questionService: QuestionService;

  constructor(questionService: QuestionService) {
    this.questionService = questionService;
  }

  async getAll(req: Request, res: Response, next: NextFunction) {
    const questions = await this.questionService.getAll();

    res.send(questions);
  }
}

export default QuestionController;
