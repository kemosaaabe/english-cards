import { randomUUID } from 'node:crypto';

import { Router } from 'express';

import { pool } from '../db/pool.js';
import type { CreateWordBody, Word } from '../types/index.js';

type WordRow = {
  id: string;
  project_id: string;
  english: string;
  russian: string;
  created_at: Date;
  updated_at: Date;
};

const mapWord = (row: WordRow): Word => ({
  id: row.id,
  projectId: row.project_id,
  english: row.english,
  russian: row.russian,
  createdAt: row.created_at.toISOString(),
  updatedAt: row.updated_at.toISOString(),
});

export const wordsRouter = Router();

wordsRouter.get('/project/:projectId', async (request, response) => {
  const result = await pool.query<WordRow>(
    `
    SELECT id, project_id, english, russian, created_at, updated_at
    FROM words
    WHERE project_id = $1
    ORDER BY created_at ASC
    `,
    [request.params.projectId],
  );

  response.json(result.rows.map(mapWord));
});

wordsRouter.post('/', async (request, response) => {
  const body = request.body as CreateWordBody;

  if (!body.projectId || !body.english?.trim() || !body.russian?.trim()) {
    response
      .status(400)
      .json({ message: 'projectId, english and russian are required' });
    return;
  }

  const projectExists = await pool.query(
    'SELECT id FROM projects WHERE id = $1',
    [body.projectId],
  );

  if (projectExists.rowCount === 0) {
    response.status(404).json({ message: 'Project not found' });
    return;
  }

  const now = new Date().toISOString();
  const word: Word = {
    id: randomUUID(),
    projectId: body.projectId,
    english: body.english.trim(),
    russian: body.russian.trim(),
    createdAt: now,
    updatedAt: now,
  };

  await pool.query(
    `
    INSERT INTO words (id, project_id, english, russian, created_at, updated_at)
    VALUES ($1, $2, $3, $4, $5, $6)
    `,
    [
      word.id,
      word.projectId,
      word.english,
      word.russian,
      word.createdAt,
      word.updatedAt,
    ],
  );

  response.status(201).json(word);
});
