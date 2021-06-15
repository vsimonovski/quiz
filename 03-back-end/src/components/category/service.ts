import BaseService from '../../common/BaseService';
import CategoryModel from './model';
import IErrorResponse from '../../common/IErrorResponse.interface';

class CategoryService extends BaseService<CategoryModel> {
    protected async adaptModel(row: any): Promise<CategoryModel> {
        const item: CategoryModel = new CategoryModel();

        item.categoryId = +row?.category_id;
        item.categoryName = row?.category_name;
        item.categoryTimer = +row?.category_timer;

        return item;
    }

    protected checkData(rows, categoryId: number): void {
        if (!Array.isArray(rows)) {
            throw {
                sqlMessage: `Unable to fetch category with id:${categoryId}`,
            };
        }

        if (rows.length === 0) {
            throw {
                sqlMessage: `Category with id:${categoryId} does not exist`,
            };
        }
    }

    public async getAll(): Promise<CategoryModel[] | IErrorResponse> {
        return await this.getAllFromTable('category');
    }

    public async getById(
        categoryId: number
    ): Promise<CategoryModel | IErrorResponse> {
        return await this.getByIdFromTable('category', categoryId);
    }
}

export default CategoryService;
