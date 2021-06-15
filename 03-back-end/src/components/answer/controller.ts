import { Request, Response } from 'express';
import BaseController from '../../common/BaseController';
import AnswerModel from './model';
import IErrorResponse from '../../common/IErrorResponse.interface';
import { answerValidator, IAnswer } from './dto/Answer';
import QuestionModel from '../question/model';

class AnswerController extends BaseController {
    async getAll(req: Request, res: Response) {
        const answers = await this.services.answerService.getAll();

        if (answers instanceof Array) {
            res.send(answers);
            return;
        }

        res.status(500).send(answers);
    }

    async getById(req: Request, res: Response) {
        const answerId: number = +req.params.id;

        if (answerId <= 0 || isNaN(answerId)) {
            res.sendStatus(400);
            return;
        }

        const data: AnswerModel | IErrorResponse =
            await this.services.answerService.getById(answerId);

        if (!(data instanceof AnswerModel)) {
            res.status(404).send({
                errorCode: 404,
                errorMessage: data.errorMessage,
            });
            return;
        }

        if (data instanceof AnswerModel) {
            res.send(data);
            return;
        }

        res.status(500).send(data);
    }

    async getAllByQuestionId(req: Request, res: Response) {
        const questionId: number = +req.params.id;

        if (questionId <= 0 || isNaN(questionId)) {
            res.sendStatus(400);
            return;
        }

        const data: AnswerModel[] | IErrorResponse =
            await this.services.answerService.getAllByQuestionId(questionId);

        if (!(data instanceof Array)) {
            res.status(404).send({
                errorCode: 404,
                errorMessage: data.errorMessage,
            });
        }

        if (data instanceof Array) {
            res.send(data);
            return;
        }

        res.status(500).send(data);
    }

    async add(req: Request, res: Response) {
        const answer: IAnswer = req.body;
        if (!answerValidator(answer)) {
            res.status(400).send(answerValidator.errors);
            return;
        }

        const answerRelatedQuestion: QuestionModel | IErrorResponse =
            await this.services.questionService.getById(answer.questionId);

        // in case that question doesn't exist
        if (!(answerRelatedQuestion instanceof QuestionModel)) {
            res.status(404).send({
                errorCode: 404,
                errorMessage: answerRelatedQuestion.errorMessage,
            });
        }

        const result: AnswerModel | IErrorResponse =
            await this.services.answerService.add(answer);

        res.send(result);
    }

    async edit(req: Request, res: Response) {
        const answerId: number = +req.params.id;
        const answer: IAnswer = req.body;

        if (answerId <= 0 || isNaN(answerId)) {
            res.sendStatus(400);
            return;
        }

        if (!answerValidator(answer)) {
            res.status(400).send(answerValidator.errors);
            return;
        }

        const result: AnswerModel | IErrorResponse =
            await this.services.answerService.edit(answerId, answer);

        if (result instanceof QuestionModel) {
            res.send(result);
            return;
        }
        res.status(404).send(result);
    }

    async delete(req: Request, res: Response) {
        const answerId: number = +req.params.id;

        if (answerId <= 0 || isNaN(answerId)) {
            res.sendStatus(400);
            return;
        }

        const answer: AnswerModel | IErrorResponse =
            await this.services.answerService.getById(answerId);

        if (!(answer instanceof AnswerModel) && answer.errorMessage) {
            return res
                .status(404)
                .send({ errorCode: 404, errorMessage: answer.errorMessage });
        }

        res.send(await this.services.answerService.delete(answerId));
    }
}

export default AnswerController;
