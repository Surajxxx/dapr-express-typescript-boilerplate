import jwt from 'jsonwebtoken';
import createHttpError from 'http-errors';
import { IResponse, INext } from '../interface/vendor/index';

class AuthMiddleware {
  public static async authentication(req: any, _res: IResponse, next: INext) {
    try {
      let token = req.headers.authorization;

      if (token === undefined || token.split(' ')[0] !== 'Bearer') {
        throw new createHttpError.Unauthorized('token is required');
      }

      const secret: string = process.env.JWT_SECRET as string;
      token = token.split(' ')[1];

      const decodedToken: any = await jwt.verify(token, secret);

      req.userId = decodedToken.userId;

      next();
    } catch (error) {
      next(error);
    }
  }

  public static async authorization(req: any, _res: IResponse, next: INext) {
    const userIdFromParams = req.params.id;
    const userIdFromToken = req.userId;
    try {
      if (userIdFromParams !== userIdFromToken) {
        throw new createHttpError.Forbidden('unauthorized for this resource');
      }
      next();
    } catch (error) {
      next(error);
    }
  }
}

export default AuthMiddleware;
