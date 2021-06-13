import * as mysql2 from "mysql2/promise";
import QuestionModel from "./model";
import IErrorResponse from "../../common/IErrorResponse.interface";
import { IAddQuestion } from "./dto/AddQuestion";

class QuestionService {
  private db: mysql2.Connection;

  constructor(db: mysql2.Connection) {
    this.db = db;
  }

  protected async adaptModel(row: any): Promise<QuestionModel> {
    const item: QuestionModel = new QuestionModel();

    item.questionId = +row?.question_id;
    item.question = row?.question;
    item.categoryId = +row?.category_id;

    return item;
  }

  public async getAll(): Promise<QuestionModel[] | IErrorResponse> {
    try {
      const questionList: QuestionModel[] = [];
      const sql: string = "SELECT * FROM question;";
      const [rows] = await this.db.execute(sql);

      if (Array.isArray(rows)) {
        for (const row of rows) {
          questionList.push(await this.adaptModel(row));
        }
      }

      return questionList;
    } catch (e) {
      return {
        errorCode: e?.errno,
        errorMessage: e?.sqlMessage,
      };
    }
  }

  public async getById(
    questionId: number
  ): Promise<QuestionModel | IErrorResponse> {
    try {
      const sql: string = "SELECT * FROM question WHERE question_id = ?;";
      const [rows] = await this.db.execute(sql, [questionId]);

      QuestionService.checkData(rows, questionId);

      return await this.adaptModel(rows[0]);
    } catch (e) {
      return {
        errorCode: e?.errno,
        errorMessage: e?.sqlMessage,
      };
    }
  }

  public async add(
    data: IAddQuestion
  ): Promise<QuestionModel | IErrorResponse> {
    try {
      const sql = "INSERT question SET question = ?, category_id = ?;";
      const [insertInfo]: any = await this.db.execute(sql, [
        data.question,
        data.categoryId,
      ]);
      const newQuestionId: number = +insertInfo?.insertId;
      return await this.getById(newQuestionId);
    } catch (e) {
      return {
        errorCode: e?.errno,
        errorMessage: e?.sqlMessage,
      };
    }
  }

  private static checkData(rows, questionId: number): void {
    if (!Array.isArray(rows)) {
      throw {
        sqlMessage: `Unable to fetch question with id:${questionId}`,
      };
    }

    if (rows.length === 0) {
      throw {
        sqlMessage: `Question with id:${questionId} does not exist`,
      };
    }
  }
}

export default QuestionService;
