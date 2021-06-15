import * as express from 'express';
import IApplicationResources from '../../common/IApplicationResources.interface';
import QuestionController from './controller';
import IRouter from '../../common/IRouter.interface';

export default class QuestionRouter implements IRouter {
    public setUpRoutes(
        application: express.Application,
        resources: IApplicationResources
    ) {
        const questionController: QuestionController = new QuestionController(
            resources
        );

        application.get(
            '/question',
            questionController.getAll.bind(questionController)
        );

        application.get(
            '/question/:id',
            questionController.getById.bind(questionController)
        );

        application.post(
            '/question',
            questionController.add.bind(questionController)
        );

        application.put(
            '/question/:id',
            questionController.edit.bind(questionController)
        );

        application.delete(
            '/question/:id',
            questionController.delete.bind(questionController)
        );
    }
}
