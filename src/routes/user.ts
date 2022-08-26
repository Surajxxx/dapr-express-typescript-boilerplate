import express from 'express';
import {
  createSchema,
  loginSchema,
  getSchema,
  updateSchema,
} from '../middleware/schema';
import UserController from '../controller/user';
import AuthMiddleware from '../middleware/auth';

const router = express.Router();

router.post('/register', createSchema, UserController.register);

router.get('/users', UserController.listUsers);

router.post('/login', loginSchema, UserController.login);

router.get(
  '/:id',
  getSchema,
  AuthMiddleware.authentication,
  AuthMiddleware.authorization,
  UserController.getUser
);

router.patch(
  '/:id',
  updateSchema,
  AuthMiddleware.authentication,
  AuthMiddleware.authorization,
  UserController.updateUserDetails
);

router.delete(
  '/:id',
  getSchema,
  AuthMiddleware.authentication,
  AuthMiddleware.authorization,
  UserController.deleteUser
);

export default router;
