import * as mysql2 from "mysql2/promise";

class QuestionService {
  private db: mysql2.Connection;

  constructor(db: mysql2.Connection) {
    this.db = db;
  }
}

export default QuestionService;
