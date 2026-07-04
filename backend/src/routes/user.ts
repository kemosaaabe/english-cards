import { Router } from 'express';

import { pool } from '../db/pool.js';
import type { User } from '../types/index.js';

export const userRouter = Router();

userRouter.get('/current', async (_request, response) => {
  const result = await pool.query<{
    id: string;
    name: string;
    email: string | null;
    created_at: Date;
  }>('SELECT id, name, email, created_at FROM users ORDER BY created_at LIMIT 1');

  const row = result.rows[0];

  if (!row) {
    response.status(404).json({ message: 'User not found' });
    return;
  }

  const user: User = {
    id: row.id,
    name: row.name,
    email: row.email ?? undefined,
    createdAt: row.created_at.toISOString(),
  };

  response.json(user);
});
