import * as mysql2 from "mysql2/promise";
import QuestionModel from "./model";
import IErrorResponse from "../../common/IErrorResponse.interface";

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
}

export default QuestionService;
