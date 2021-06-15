import BaseService from "../../common/BaseService";
import UserModel from "./model";
import IErrorResponse from "../../common/IErrorResponse.interface";
import { IUser } from "./dto/User";
import * as bcrypt from "bcrypt";

class UserService extends BaseService<UserModel> {
  protected async adaptModel(row: any): Promise<UserModel> {
    const item: UserModel = new UserModel();

    item.userId = +row?.user_id;
    item.username = row?.username;
    item.passwordHash = row?.password_hash;
    item.score = +row?.score;

    return item;
  }

  protected checkData(rows, categoryId: number): void {
    if (!Array.isArray(rows)) {
      throw {
        sqlMessage: `Unable to fetch user with id:${categoryId}`,
      };
    }

    if (rows.length === 0) {
      throw {
        sqlMessage: `User with id:${categoryId} does not exist`,
      };
    }
  }

  public async getAll(): Promise<UserModel[] | IErrorResponse> {
    return await this.getAllFromTable("user");
  }

  public async getById(userId: number): Promise<UserModel | IErrorResponse> {
    return await this.getByIdFromTable("user", userId);
  }

  public async add({
    username,
    password,
  }: IUser): Promise<UserModel | IErrorResponse> {
    try {
      const sql = "INSERT user SET username = ?, password_hash = ?;";
      const passwordHash = await bcrypt.hash(password, 11);
      // verify password here
      const [insertInfo]: any = await this.db.execute(sql, [
        username,
        passwordHash,
      ]);
      const newUserId: number = +insertInfo?.insertId;
      return await this.getById(newUserId);
    } catch (e) {
      return {
        errorCode: e?.errno,
        errorMessage: e?.sqlMessage,
      };
    }
  }

  public async getByUsername(
    username: string
  ): Promise<UserModel | IErrorResponse> {
    const users = await this.getAllByFieldName("user", "username", username);
    if (!(users instanceof Array) || users.length === 0) {
      return {
        errorCode: 404,
        errorMessage: `User with ${username} does not exist.`,
      };
    }

    return users[0];
  }
}

export default UserService;
