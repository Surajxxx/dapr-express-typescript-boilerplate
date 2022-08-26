import UserService from '../services/user';
import { IResponse, INext, IRequest } from '../interface/vendor';

class UserController {


  public static async register(req: IRequest, res: IResponse, next: INext): Promise<any> {
    try {
      const userDetails = req.body;

      const newUser = await UserService.register(userDetails);

      return res.status(200).send({ success: true, data: newUser });
    } catch (error) {
      return next(error);
    }
  }

  public static async listUsers(_req: IRequest, res: IResponse, next: INext) {
    try {
      const users = await UserService.getUsers();

      return res.status(200).send({ success: true, data: users });
    } catch (error) {
      return next(error);
    }
  }

  public static async login(req: IRequest, res: IResponse, next: INext) {
    try {
      const { email } = req.body;
      const { password } = req.body;

      const user = await UserService.login(email, password);

      res.header('Authorization', `Bearer ${user.token}`);

      return res.status(200).json(user);
    } catch (error) {
      return next(error);
    }
  }

  public static async getUser(req: IRequest, res: IResponse, next: INext) {
    try {
      const userId: string = req.params.id;
      const userDetails = await UserService.getUserById(userId);

      return res.status(200).send({ success: true, data: userDetails });
    } catch (error) {
      return next(error);
    }
  }

  public static async updateUserDetails(
    req: IRequest,
    res: IResponse,
    next: INext
  ) {
    try {
      const userId: string = req.params.id;
      const { name } = req.body;
      const userDetails = await UserService.updateUser(userId, name);

      return res.status(200).send({ success: true, data: userDetails });
    } catch (error) {
      return next(error);
    }
  }

  public static async deleteUser(req: IRequest, res: IResponse, next: INext) {
    try {
      const userId: string = req.params.id;

      const deletedUser = await UserService.removeUser(userId);

      if (deletedUser) {
        return res.status(200).send({
          success: true,
          message: 'user successfully deleted',
        });
      }
    } catch (error) {
      return next(error);
    }
  }
}

export default UserController;
