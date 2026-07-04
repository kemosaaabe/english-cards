import { randomUUID } from 'node:crypto';

import { Router } from 'express';

import { pool } from '../db/pool.js';
import type { CreateProjectBody, Project } from '../types/index.js';

type ProjectRow = {
  id: string;
  user_id: string;
  title: string;
  description: string | null;
  created_at: Date;
  updated_at: Date;
};

const mapProject = (row: ProjectRow): Project => ({
  id: row.id,
  userId: row.user_id,
  title: row.title,
  description: row.description ?? undefined,
  createdAt: row.created_at.toISOString(),
  updatedAt: row.updated_at.toISOString(),
});

export const projectsRouter = Router();

projectsRouter.get('/', async (request, response) => {
  const userId = request.query.userId;

  if (typeof userId !== 'string' || !userId) {
    response.status(400).json({ message: 'userId is required' });
    return;
  }

  const result = await pool.query<ProjectRow>(
    `
    SELECT id, user_id, title, description, created_at, updated_at
    FROM projects
    WHERE user_id = $1
    ORDER BY updated_at DESC
    `,
    [userId],
  );

  response.json(result.rows.map(mapProject));
});

projectsRouter.get('/:id', async (request, response) => {
  const result = await pool.query<ProjectRow>(
    `
    SELECT id, user_id, title, description, created_at, updated_at
    FROM projects
    WHERE id = $1
    `,
    [request.params.id],
  );

  const row = result.rows[0];

  if (!row) {
    response.status(404).json({ message: 'Project not found' });
    return;
  }

  response.json(mapProject(row));
});

projectsRouter.post('/', async (request, response) => {
  const body = request.body as CreateProjectBody;
  const userId = request.query.userId;

  if (typeof userId !== 'string' || !userId) {
    response.status(400).json({ message: 'userId is required' });
    return;
  }

  if (!body.title?.trim()) {
    response.status(400).json({ message: 'title is required' });
    return;
  }

  const now = new Date().toISOString();
  const project: Project = {
    id: randomUUID(),
    userId,
    title: body.title.trim(),
    description: body.description?.trim() || undefined,
    createdAt: now,
    updatedAt: now,
  };

  await pool.query(
    `
    INSERT INTO projects (id, user_id, title, description, created_at, updated_at)
    VALUES ($1, $2, $3, $4, $5, $6)
    `,
    [
      project.id,
      project.userId,
      project.title,
      project.description ?? null,
      project.createdAt,
      project.updatedAt,
    ],
  );

  response.status(201).json(project);
});
