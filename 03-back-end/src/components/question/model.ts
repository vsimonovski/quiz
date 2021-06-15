import IModel from '../../common/IModel.interface';

export default class QuestionModel implements IModel {
    questionId: number;
    question: string;
    categoryId: number;
}
