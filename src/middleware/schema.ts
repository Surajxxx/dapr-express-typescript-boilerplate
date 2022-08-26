import { IRequest, IResponse, INext } from '../interface/vendor/index';
import {
  registerUser, loginUser, getUser, updateUser
} from '../validator/user';

const requestValidator = (req: IRequest, next: INext, schema: any) => {
  const options = {
    abortEarly: false, // include all errors
    allowUnknown: true, // ignore unknown props
    stripUnknown: true, // remove unknown props
  };
  const { error, value } = schema.validate(req, options);
  if (error) {
    error.status = 422;
    return next(error);
  }
  req = value;
  return next();
};

export const createSchema = (req: any, _res: IResponse, next: INext) => {
  const schema = registerUser;
  requestValidator(req, next, schema);
};

export const loginSchema = (req: any, _res: IResponse, next: INext) => {
  const schema = loginUser;
  requestValidator(req, next, schema);
};

export const getSchema = (req: any, _res: IResponse, next: INext) => {
  const schema = getUser;
  requestValidator(req, next, schema);
};

export const updateSchema = (req: any, _res: IResponse, next: INext) => {
  const schema = updateUser;
  requestValidator(req, next, schema);
};
