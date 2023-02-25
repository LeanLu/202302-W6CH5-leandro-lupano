import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import { knowledgesRouter } from './router/knowledges.router.js';

export const app = express();

const corsOptions = {
  origin: '*',
};

app.disable('x-powered-by');
app.use(morgan('dev'));
app.use(express.json());
app.use(cors(corsOptions));

app.use('/knowledges', knowledgesRouter);
