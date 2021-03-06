import { Request, Response } from 'express';
import QuestionModel from './model';
import IErrorResponse from '../../common/IErrorResponse.interface';
import { questionValidator, IQuestion } from './dto/Question';
import BaseController from '../../common/BaseController';

class QuestionController extends BaseController {
    async getAll(req: Request, res: Response) {
        const questions = await this.services.questionService.getAll();

        if (questions instanceof Array) {
            res.send(questions);
            return;
        }

        res.status(500).send(questions);
    }

    async getById(req: Request, res: Response) {
        const questionId: number = +req.params.id;

        if (questionId <= 0 || isNaN(questionId)) {
            res.sendStatus(400);
            return;
        }

        const data: QuestionModel | IErrorResponse =
            await this.services.questionService.getById(questionId);

        if (!(data instanceof QuestionModel)) {
            res.status(404).send({
                errorCode: 404,
                errorMessage: data.errorMessage,
            });
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
            await this.services.questionService.add(data);

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
            await this.services.questionService.edit(questionId, data);

        if (result instanceof QuestionModel) {
            res.send(result);
            return;
        }
        res.status(404).send(result);
    }

    async delete(req: Request, res: Response) {
        const questionId: number = +req.params.id;

        if (questionId <= 0 || isNaN(questionId)) {
            res.sendStatus(400);
            return;
        }

        const question: QuestionModel | IErrorResponse =
            await this.services.questionService.getById(questionId);

        if (!(question instanceof QuestionModel) && question.errorMessage)
            return res
                .status(404)
                .send({ errorCode: 404, errorMessage: question.errorMessage });

        res.send(await this.services.questionService.delete(questionId));
    }

    async getRandomQuestionByCategoryId(req: Request, res: Response) {
        const categoryId: number = +req.params.id;

        if (categoryId <= 0 || isNaN(categoryId)) {
            res.sendStatus(400);
            return;
        }

        const data: QuestionModel[] | IErrorResponse =
            await this.services.questionService.getAllByCategoryId(categoryId);

        if (!(data instanceof Array)) {
            res.status(500).send({
                errorCode: 500,
                errorMessage: data.errorMessage,
            });
            return;
        }

        if (data instanceof Array && data.length === 0) {
            res.status(404).send({
                errorCode: 404,
                errorMessage: `Category with id ${categoryId} does not exist`,
            });
            return;
        }

        if (data instanceof Array) {
            const randomQuestionByCategoryId =
                data[Math.floor(Math.random() * data.length)];

            res.send(randomQuestionByCategoryId);
            return;
        }
    }
}

export default QuestionController;
