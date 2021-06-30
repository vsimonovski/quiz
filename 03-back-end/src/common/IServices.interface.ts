import QuestionService from '../components/question/service';
import AnswerService from '../components/answer/service';
import CategoryService from '../components/category/service';
import UserService from '../components/user/service';
import AnswerExplanationService from "../components/answerExplanation/service";

export default interface IServices {
    questionService: QuestionService;
    answerService: AnswerService;
    categoryService: CategoryService;
    userService: UserService;
    answerExplanationService: AnswerExplanationService;
}
