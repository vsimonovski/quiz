import QuestionModel from "./model";
import IErrorResponse from "../../common/IErrorResponse.interface";
import { IQuestion } from "./dto/Question";
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

  public async add(data: IQuestion): Promise<QuestionModel | IErrorResponse> {
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

  public async edit(
    questionId: number,
    { question, categoryId }: IQuestion
  ): Promise<QuestionModel | IErrorResponse> {
    try {
      const sql: string =
        "UPDATE question SET question = ? WHERE question_id = ?;";
      const currentQuestion: QuestionModel | IErrorResponse =
        await this.getById(questionId);

      if (!(currentQuestion instanceof QuestionModel)) {
        return {
          errorCode: 404,
          errorMessage: currentQuestion.errorMessage,
        };
      }

      if (currentQuestion.categoryId !== categoryId) {
        return {
          errorCode: 400,
          errorMessage: `Category ID:${currentQuestion.categoryId} incompatible with submitted Category ID:${categoryId}`,
        };
      }

      await this.db.execute(sql, [question, questionId]);
      return await this.getById(questionId);
    } catch (e) {
      return {
        errorCode: e?.errno,
        errorMessage: e?.sqlMessage,
      };
    }
  }

  public async delete(questionId: number): Promise<IErrorResponse | null> {
    try {
      return this.db
        .beginTransaction()
        .then(async () => {
          if (await this.deleteAnswerByQuestionId(questionId)) return;
          throw { errorCode: -1003, sqlMessage: "Could not delete answer" };
        })
        .then(async () => {
          if (await this.deleteQuestionById(questionId)) return;
          throw { errno: -1002, sqlMessage: "Could not delete question" };
        })
        .then(async () => {
          await this.db.commit();
          return {
            errorCode: 0,
            errorMessage: "Question deleted!",
          };
        });
    } catch (e) {
      await this.db.rollback();
      return {
        errorCode: e?.errno,
        errorMessage: e?.sqlMessage,
      };
    }
  }

  private async deleteQuestionById(questionId: number) {
    try {
      await this.db.execute(`DELETE FROM question WHERE question_id = ?;`, [
        questionId,
      ]);
      return true;
    } catch (e) {
      return false;
    }
  }

  private async deleteAnswerByQuestionId(questionId: number) {
    try {
      await this.db.execute(`DELETE FROM answer WHERE question_id = ?;`, [
        questionId,
      ]);
      return true;
    } catch (e) {
      return false;
    }
  }
}

export default QuestionService;
