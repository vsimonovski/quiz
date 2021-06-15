import QuestionService from "../components/question/service";
import AnswerService from "../components/answer/service";

export default interface IServices {
  questionService: QuestionService;
  answerService: AnswerService;
}
