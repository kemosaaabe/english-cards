import cors from 'cors';
import express from 'express';

import { projectsRouter } from './routes/projects.js';
import { userRouter } from './routes/user.js';
import { wordsRouter } from './routes/words.js';

export const createApp = () => {
  const app = express();

  app.use(cors());
  app.use(express.json());

  app.get('/api/health', (_request, response) => {
    response.json({ status: 'ok' });
  });

  app.use('/api/users', userRouter);
  app.use('/api/projects', projectsRouter);
  app.use('/api/words', wordsRouter);

  return app;
};
