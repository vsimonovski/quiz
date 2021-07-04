import * as express from 'express';
import IRouter from '../../common/IRouter.interface';
import IApplicationResources from '../../common/IApplicationResources.interface';
import AnswerController from './controller';
import AuthMiddleware from '../../middleware/auth.middleware';

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
            AuthMiddleware.getVerifier(),
            answerController.getAll.bind(answerController)
        );

        application.get(
            '/answer/:id',
            AuthMiddleware.getVerifier(),
            answerController.getById.bind(answerController)
        );

        application.get(
            '/question/answer/:id',
            answerController.getAllByQuestionId.bind(answerController)
        );

        application.post(
            '/answer',
            AuthMiddleware.getVerifier(),
            answerController.add.bind(answerController)
        );

        application.post(
            '/answer/validation',
            answerController.isValidAnswerForQuestion.bind(answerController)
        );

        application.put(
            '/answer/:id',
            AuthMiddleware.getVerifier(),
            answerController.edit.bind(answerController)
        );

        application.delete(
            '/answer/:id',
            AuthMiddleware.getVerifier(),
            answerController.delete.bind(answerController)
        );
    }
}
