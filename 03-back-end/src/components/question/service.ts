import * as mysql2 from "mysql2/promise";
import QuestionModel from "./model";

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

  public async getAll(): Promise<QuestionModel[]> {
    const questionList: QuestionModel[] = [];

    const sql: string = "SELECT * FROM question;";
    const [rows, columns] = await this.db.execute(sql);

    if (Array.isArray(rows)) {
      for (const row of rows) {
        questionList.push(await this.adaptModel(row));
      }
    }

    return questionList;
  }
}

export default QuestionService;
