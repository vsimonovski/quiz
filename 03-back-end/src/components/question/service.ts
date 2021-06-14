import QuestionModel from "./model";
import IErrorResponse from "../../common/IErrorResponse.interface";
import { IAddQuestion } from "./dto/AddQuestion";
import BaseService from "../../services/BaseService";

class QuestionService extends BaseService<QuestionModel> {
  protected async adaptModel(row: any): Promise<QuestionModel> {
    const item: QuestionModel = new QuestionModel();

    item.questionId = +row?.question_id;
    item.question = row?.question;
    item.categoryId = +row?.category_id;

    return item;
  }

  protected checkData(rows, questionId: number): void {
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

  public async getAll(): Promise<QuestionModel[] | IErrorResponse> {
    return await this.getAllFromTable("question");
  }

  public async getById(
    questionId: number
  ): Promise<QuestionModel | IErrorResponse> {
    return await this.getByIdFromTable("question", questionId);
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
}

export default QuestionService;
