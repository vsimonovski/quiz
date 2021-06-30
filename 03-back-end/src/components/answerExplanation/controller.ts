import BaseController from '../../common/BaseController';
import { Request, Response } from 'express';
import IErrorResponse from '../../common/IErrorResponse.interface';
import {
    answerExplanationValidator,
    IAnswerExplanation, submittedAnswerExplanationValidator,
} from './dto/AnswerExplanation';
import AnswerExplanationModel from './model';
import QuestionModel from "../question/model";

class AnswerExplanationController extends BaseController {
    async getById(req: Request, res: Response) {
        const questionId: number = +req.params.id;

        if (questionId <= 0 || isNaN(questionId)) {
            res.sendStatus(400);
            return;
        }

        const data: AnswerExplanationModel | IErrorResponse =
            await this.services.answerExplanationService.getById(questionId);

        if (!(data instanceof AnswerExplanationModel)) {
            res.status(404).send({
                errorCode: 404,
                errorMessage: data.errorMessage,
            });
            return;
        }

        if (data instanceof AnswerExplanationModel) {
            res.send(data);
            return;
        }

        res.status(500).send(data);
    }

    async add(req: Request, res: Response) {
        const answerExplanation: IAnswerExplanation = req.body;
        if (!answerExplanationValidator(answerExplanation)) {
            res.status(400).send(answerExplanationValidator.errors);
            return;
        }

        const answerExplanationRelatedQuestion: QuestionModel | IErrorResponse =
            await this.services.questionService.getById(
                answerExplanation.questionId
            );

        // in case that question doesn't exist
        if (!(answerExplanationRelatedQuestion instanceof QuestionModel)) {
            res.status(404).send({
                errorCode: 404,
                errorMessage: answerExplanationRelatedQuestion.errorMessage,
            });
        }

        const result: AnswerExplanationModel | IErrorResponse =
            await this.services.answerExplanationService.add(answerExplanation);

        if(result instanceof AnswerExplanationModel) {
            res.send(result)
            return
        }

        res.status(400).send(result);
    }

    async edit(req: Request, res: Response) {
        const questionId: number = +req.params.id;
        const answerExplanation: IAnswerExplanation = req.body;

        if (questionId <= 0 || isNaN(questionId)) {
            res.sendStatus(400);
            return;
        }

        if (!submittedAnswerExplanationValidator(answerExplanation)) {
            res.status(400).send(submittedAnswerExplanationValidator.errors);
            return;
        }

        const result: AnswerExplanationModel | IErrorResponse =
            await this.services.answerExplanationService.edit(
                questionId,
                answerExplanation
            );

        if (result instanceof AnswerExplanationModel) {
            res.send(result);
            return;
        }
        res.status(404).send(result);
    }
}

export default AnswerExplanationController;
