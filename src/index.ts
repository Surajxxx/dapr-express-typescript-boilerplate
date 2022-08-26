import express, { NextFunction, Request, Response } from 'express';
import dotenv from 'dotenv';
import helmet from 'helmet';
import cors from 'cors';
import UserRouter from './routes/user';
import Database from './db/db';
import morganMiddleware from './providers/morgan';
import Logger from './providers/logger';
import { notFoundHandler } from './helpers/notfound_handler';
import Locals from './config/config';

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morganMiddleware);
app.use(helmet());
app.use(cors());

Database.init();

app.use('/user', UserRouter);
app.use('*', notFoundHandler);

app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
  Logger.error(err.message);
  res.status(err.status || 500);
  res.send({
    status: err.status || 500,
    success: false,
    error: [err.message],
    data: { message: 'Error' },
  });
});

const port : string = Locals.config().PORT;

app.listen(port, () => {
  Logger.info('Express server listening on port ' + port);
})

export default app
