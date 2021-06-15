import IRouter from '../../common/IRouter.interface';
import * as express from 'express';
import IApplicationResources from '../../common/IApplicationResources.interface';
import CategoryController from './controller';

export default class CategoryRouter implements IRouter {
    public setUpRoutes(
        application: express.Application,
        resources: IApplicationResources
    ) {
        const categoryController: CategoryController = new CategoryController(
            resources
        );

        application.get(
            '/category',
            categoryController.getAll.bind(categoryController)
        );

        application.get(
            '/category/:id',
            categoryController.getById.bind(categoryController)
        );
    }
}
