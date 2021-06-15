import BaseService from "../../common/BaseService";
import AnswerModel from "./model";
import IErrorResponse from "../../common/IErrorResponse.interface";
import { IAnswer } from "./dto/Answer";

class AnswerService extends BaseService<AnswerModel> {
  protected async adaptModel(row: any): Promise<AnswerModel> {
    const item: AnswerModel = new AnswerModel();

    item.answerId = +row?.answer_id;
    item.answer = row?.answer;
    item.questionId = +row?.question_id;
    item.isCorrect = +row?.is_correct;

    return item;
  }

  protected checkData(rows, answerId: number): void {
    if (!Array.isArray(rows)) {
      throw {
        sqlMessage: `Unable to fetch answer with id:${answerId}`,
      };
    }

    if (rows.length === 0) {
      throw {
        sqlMessage: `Answer with id:${answerId} does not exist`,
      };
    }
  }

  public async getAll(): Promise<AnswerModel[] | IErrorResponse> {
    return await this.getAllFromTable("answer");
  }

  public async getById(
    answerId: number
  ): Promise<AnswerModel | IErrorResponse> {
    return await this.getByIdFromTable("answer", answerId);
  }

  public async getAllByQuestionId(
    questionId: number
  ): Promise<AnswerModel[] | IErrorResponse> {
    return await this.getAllByFieldName("answer", "question_id", questionId);
  }

  public async add({
    answer,
    questionId,
    isCorrect,
  }: IAnswer): Promise<AnswerModel | IErrorResponse> {
    try {
      const sql =
        "INSERT answer SET answer = ?, question_id = ?, is_correct =?;";
      const [insertInfo]: any = await this.db.execute(sql, [
        answer,
        questionId,
        isCorrect,
      ]);

      const newAnswerId: number = +insertInfo?.insertId;
      return await this.getById(newAnswerId);
    } catch (e) {
      return {
        errorCode: e?.errno,
        errorMessage: e?.sqlMessage,
      };
    }
  }

  public async edit(
    answerId: number,
    answer: IAnswer
  ): Promise<AnswerModel | IErrorResponse> {
    try {
      const sql: string = "UPDATE answer SET answer = ? WHERE answer_id = ?;";
      const currentAnswer: AnswerModel | IErrorResponse = await this.getById(
        answerId
      );

      if (!(currentAnswer instanceof AnswerModel)) {
        return {
          errorCode: 404,
          errorMessage: currentAnswer.errorMessage,
        };
      }

      if (currentAnswer.questionId !== answer.questionId) {
        return {
          errorCode: 400,
          errorMessage: `Can not modify original question id: ${currentAnswer.questionId} with question id: ${answer.questionId}`,
        };
      }

      await this.db.execute(sql, [answer.answer, answerId]);
      return await this.getById(answerId);
    } catch (e) {
      return {
        errorCode: e?.errno,
        errorMessage: e?.sqlMessage,
      };
    }
  }

  public async delete(answerId: number): Promise<IErrorResponse> {
    try {
      const sql: string = "DELETE FROM answer WHERE answer_id = ?;";
      await this.db.execute(sql, [answerId]);
      return {
        errorCode: 0,
        errorMessage: "Answer deleted!",
      };
    } catch (e) {
      return {
        errorCode: e?.errno,
        errorMessage: e?.sqlMessage,
      };
    }
  }
}

export default AnswerService;
