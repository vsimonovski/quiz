import QuestionService from "../components/question/service";
import AnswerService from "../components/answer/service";
import CategoryService from "../components/category/service";

export default interface IServices {
  questionService: QuestionService;
  answerService: AnswerService;
  categoryService: CategoryService;
}
