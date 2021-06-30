import BaseService from '../../common/BaseService';
import AnswerExplanationModel from './model';
import IErrorResponse from '../../common/IErrorResponse.interface';
import { IAnswerExplanation } from './dto/AnswerExplanation';

class AnswerExplanationService extends BaseService<AnswerExplanationModel> {
    protected async adaptModel(row: any): Promise<AnswerExplanationModel> {
        const item: AnswerExplanationModel = new AnswerExplanationModel();

        item.answerExplanation = row?.answer_explanation;
        item.questionId = +row?.question_id;

        return item;
    }

    protected checkData(rows, answerId: number): void {
        if (!Array.isArray(rows)) {
            throw {
                sqlMessage: `Unable to fetch answer explanation with id:${answerId}`,
            };
        }

        if (rows.length === 0) {
            throw {
                sqlMessage: `Answer explanation with id:${answerId} does not exist`,
            };
        }
    }

    public async getById(
        questionId: number
    ): Promise<AnswerExplanationModel | IErrorResponse> {
        return await this.getByIdFromTable(
            'answer_explanation',
            questionId,
            true,
            'question'
        );
    }

    public async add({
        answerExplanation,
        questionId,
    }: IAnswerExplanation): Promise<AnswerExplanationModel | IErrorResponse> {
        try {
            const sql =
                'INSERT answer_explanation SET answer_explanation = ?, question_id = ?;';
            await this.db.execute(sql, [answerExplanation, questionId]);

            return await this.getById(questionId);
        } catch (e) {
            return {
                errorCode: e?.errno,
                errorMessage: e?.sqlMessage,
            };
        }
    }

    public async edit(
        questionId: number,
        answerExplanation: IAnswerExplanation
    ): Promise<AnswerExplanationModel | IErrorResponse> {
        try {
            const sql: string =
                'UPDATE answer_explanation SET answer_explanation = ? WHERE question_id = ?;';
            const currentAnswerExplanation:
                | AnswerExplanationModel
                | IErrorResponse = await this.getById(questionId);

            if (!(currentAnswerExplanation instanceof AnswerExplanationModel)) {
                return {
                    errorCode: 404,
                    errorMessage: currentAnswerExplanation.errorMessage,
                };
            }

            if (currentAnswerExplanation.questionId !== questionId) {
                return {
                    errorCode: 400,
                    errorMessage: `Can not modify original question id: ${currentAnswerExplanation.questionId} with question id: ${questionId}`,
                };
            }

            await this.db.execute(sql, [
                answerExplanation.answerExplanation,
                questionId,
            ]);
            return await this.getById(questionId);
        } catch (e) {
            return {
                errorCode: e?.errno,
                errorMessage: e?.sqlMessage,
            };
        }
    }
}

export default AnswerExplanationService;
