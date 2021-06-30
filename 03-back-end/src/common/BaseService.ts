import IModel from './IModel.interface';
import * as mysql2 from 'mysql2/promise';
import IErrorResponse from './IErrorResponse.interface';
import IApplicationResources from './IApplicationResources.interface';
import IServices from './IServices.interface';

export default abstract class BaseService<ReturnModel extends IModel> {
    private resources: IApplicationResources;

    constructor(resources: IApplicationResources) {
        this.resources = resources;
    }

    protected get db(): mysql2.Connection {
        return this.resources.databaseConnection;
    }

    protected get services(): IServices {
        return this.resources.services;
    }

    protected abstract adaptModel(data: any): Promise<ReturnModel>;
    protected abstract checkData(rows, id: number): void;

    protected async getAllFromTable(
        tableName: string
    ): Promise<ReturnModel[] | IErrorResponse> {
        try {
            const itemList: ReturnModel[] = [];
            const sql: string = `SELECT * FROM ${tableName};`;
            const [rows] = await this.db.execute(sql);

            if (Array.isArray(rows)) {
                for (const row of rows) {
                    itemList.push(await this.adaptModel(row));
                }
            }

            return itemList;
        } catch (e) {
            return {
                errorCode: e?.errno,
                errorMessage: e?.sqlMessage,
            };
        }
    }

    protected async getByIdFromTable(
        tableName: string,
        id: number,
        isForeignKeyPrimaryKey?: boolean,
        foreignKeyName?: string
    ): Promise<ReturnModel | IErrorResponse> {
        try {
            const sql: string = `SELECT * FROM ${tableName} WHERE ${
                isForeignKeyPrimaryKey ? foreignKeyName : tableName
            }_id = ?;`;
            const [rows] = await this.db.execute(sql, [id]);

            this.checkData(rows, id);

            return await this.adaptModel(rows[0]);
        } catch (e) {
            return {
                errorCode: e?.errno,
                errorMessage: e?.sqlMessage,
            };
        }
    }

    protected async getAllByFieldName(
        tableName: string,
        fieldName: string,
        fieldValue: any
    ): Promise<ReturnModel[] | IErrorResponse> {
        try {
            const itemList: ReturnModel[] = [];
            const sql: string = `SELECT * FROM ${tableName} WHERE ${fieldName} = ?;`;
            const [rows] = await this.db.execute(sql, [fieldValue]);

            if (Array.isArray(rows)) {
                for (const row of rows) {
                    itemList.push(await this.adaptModel(row));
                }
            }

            return itemList;
        } catch (e) {
            return {
                errorCode: e?.errno,
                errorMessage: e?.sqlMessage,
            };
        }
    }
}
