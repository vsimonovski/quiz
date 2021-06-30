import * as express from 'express';
import IRouter from '../../common/IRouter.interface';
import IApplicationResources from '../../common/IApplicationResources.interface';
import AnswerExplanationController from './controller';
import AuthMiddleware from '../../middleware/auth.middleware';

export default class AnswerExplanationRouter implements IRouter {
    public setUpRoutes(
        application: express.Application,
        resources: IApplicationResources
    ) {
        const answerExplanationController: AnswerExplanationController =
            new AnswerExplanationController(resources);

        application.get(
            '/answer-explanation/:id',
            answerExplanationController.getById.bind(
                answerExplanationController
            )
        );

        application.post(
            '/answer-explanation',
            AuthMiddleware.getVerifier(),
            answerExplanationController.add.bind(answerExplanationController)
        );

        application.put(
            '/answer-explanation/:id',
            AuthMiddleware.getVerifier(),
            answerExplanationController.edit.bind(answerExplanationController)
        );
    }
}
