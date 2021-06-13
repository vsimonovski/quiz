import QuestionService from "./service";

class QuestionController {
    private questionService: QuestionService;

    constructor(questionService: QuestionService) {
        this.questionService = questionService;
    }
}

export default QuestionController;