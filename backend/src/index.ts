import { createApp } from './app.js';
import { migrate } from './db/migrate.js';

const port = Number(process.env.PORT ?? 3001);

const start = async () => {
  await migrate();

  const app = createApp();

  app.listen(port, () => {
    console.log(`Backend listening on port ${port}`);
  });
};

void start();
