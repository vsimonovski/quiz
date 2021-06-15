import * as express from 'express';
import IRouter from '../../common/IRouter.interface';
import IApplicationResources from '../../common/IApplicationResources.interface';
import AnswerController from './controller';

export default class AnswerRouter implements IRouter {
    public setUpRoutes(
        application: express.Application,
        resources: IApplicationResources
    ) {
        const answerController: AnswerController = new AnswerController(
            resources
        );

        application.get(
            '/answer',
            answerController.getAll.bind(answerController)
        );

        application.get(
            '/answer/:id',
            answerController.getById.bind(answerController)
        );

        application.get(
            '/question/answer/:id',
            answerController.getAllByQuestionId.bind(answerController)
        );

        application.post(
            '/answer',
            answerController.add.bind(answerController)
        );

        application.put(
            '/answer/:id',
            answerController.edit.bind(answerController)
        );

        application.delete(
            '/answer/:id',
            answerController.delete.bind(answerController)
        );
    }
}
