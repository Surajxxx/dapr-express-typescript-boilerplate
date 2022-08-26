import createHttpError from 'http-errors';
import jwt from 'jsonwebtoken';
import User, { IUserModel } from '../models/user';
import Logger from '../providers/logger';

class UserService {
  public static async register(input: IUserModel) {
    try {
      const isUserExist = await User.findOne({
        email: input.email,
        isDeleted: false,
      });

      if (isUserExist) {
        throw new createHttpError.BadRequest('user with email already exists');
      }

      const newUser = await User.create(input);

      // mask the password
      newUser.password = undefined;

      return newUser;
    } catch (error) {
      Logger.error(error.message);
      throw error;
    }
  }

  public static async getUsers() {
    try {
      const users = await User.find({ isDeleted: false }).select({
        password: 0,
      });

      if (users.length === 0) {
        throw new createHttpError.NotFound('users not found');
      }

      return users;
    } catch (error) {
      Logger.error(error.message);
      throw error;
    }
  }

  public static async login(email: string, password: string) {
    try {
      const user: any = await User.findOne({ email });

      if (!user || user.isDeleted === true) {
        throw new createHttpError.BadRequest('email already in use');
      }

      console.log(user);
      const isPasswordMatch = await user.comparePassword(password);

      if (!isPasswordMatch) {
        throw new createHttpError.BadRequest('password is not matching');
      }

      const payload = {
        userId: user._id,
      };

      const secret: string = process.env.JWT_SECRET as string;

      const token = await jwt.sign(payload, secret, {
        expiresIn: '9000s',
      });

      // mask the password
      user.password = undefined;

      const data = { user, token };

      return data;
    } catch (error: any) {
      Logger.error(error.message);
      throw error;
    }
  }

  public static async getUserById(userId: string) {
    try {
      const user = await User.findById(userId);

      if (!user || user.isDeleted === true) {
        throw new createHttpError.NotFound('User not found');
      }

      // mask the password
      user.password = undefined;

      return user;
    } catch (error) {
      Logger.error(error.message);
      throw error;
    }
  }

  public static async updateUser(userId: string, name: string) {
    try {
      const updateUser = await User.findByIdAndUpdate(
        { _id: userId },
        { $set: { name } },
        { new: true }
      );

      // mask the password
      if (updateUser) {
        updateUser.password = undefined;
      }

      return updateUser;
    } catch (error) {
      Logger.error(error.message);
      throw error;
    }
  }

  public static async removeUser(userId: string) {
    try {
      const deletedUser = await User.findByIdAndUpdate(
        { _id: userId, isDeleted: false },
        { $set: { isDeleted: true } },
        { new: true }
      );

      if (!deletedUser) {
        throw new createHttpError.Conflict('user not deleted');
      }

      return true;
    } catch (error) {
      Logger.error(error.message);
      throw error;
    }
  }
}

export default UserService;
