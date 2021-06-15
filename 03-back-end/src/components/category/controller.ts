import { Request, Response } from 'express';
import BaseController from '../../common/BaseController';
import CategoryModel from './model';
import IErrorResponse from '../../common/IErrorResponse.interface';

class CategoryController extends BaseController {
    async getAll(req: Request, res: Response) {
        const categories = await this.services.categoryService.getAll();

        if (categories instanceof Array) {
            res.send(categories);
            return;
        }

        res.status(500).send(categories);
    }

    async getById(req: Request, res: Response) {
        const categoryId: number = +req.params.id;

        if (categoryId <= 0 || isNaN(categoryId)) {
            res.sendStatus(400);
            return;
        }

        const data: CategoryModel | IErrorResponse =
            await this.services.categoryService.getById(categoryId);

        if (!(data instanceof CategoryModel)) {
            res.status(404).send({
                errorCode: 404,
                errorMessage: data.errorMessage,
            });
            return;
        }

        if (data instanceof CategoryModel) {
            res.send(data);
            return;
        }

        res.status(500).send(data);
    }
}

export default CategoryController;
