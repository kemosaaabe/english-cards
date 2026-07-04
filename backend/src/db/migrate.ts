import { pool } from './pool.js';

const mockUserId = 'user-1';

export const migrate = async () => {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT,
      created_at TIMESTAMPTZ NOT NULL
    );

    CREATE TABLE IF NOT EXISTS projects (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL REFERENCES users(id),
      title TEXT NOT NULL,
      description TEXT,
      created_at TIMESTAMPTZ NOT NULL,
      updated_at TIMESTAMPTZ NOT NULL
    );

    CREATE TABLE IF NOT EXISTS words (
      id TEXT PRIMARY KEY,
      project_id TEXT NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
      english TEXT NOT NULL,
      russian TEXT NOT NULL,
      created_at TIMESTAMPTZ NOT NULL,
      updated_at TIMESTAMPTZ NOT NULL
    );
  `);

  await pool.query(
    `
    INSERT INTO users (id, name, created_at)
    VALUES ($1, $2, $3)
    ON CONFLICT (id) DO NOTHING
    `,
    [mockUserId, 'Local User', '2026-01-01T00:00:00.000Z'],
  );

  const projectsCount = await pool.query('SELECT COUNT(*) FROM projects');

  if (projectsCount.rows[0]?.count === '0') {
    const now = new Date().toISOString();
    const projectId = 'project-1';

    await pool.query(
      `
      INSERT INTO projects (id, user_id, title, description, created_at, updated_at)
      VALUES ($1, $2, $3, $4, $5, $6)
      `,
      [
        projectId,
        mockUserId,
        'My vocabulary',
        'Starter project for quick word saving',
        now,
        now,
      ],
    );

    await pool.query(
      `
      INSERT INTO words (id, project_id, english, russian, created_at, updated_at)
      VALUES
        ($1, $2, $3, $4, $5, $6),
        ($7, $2, $8, $9, $5, $6)
      `,
      [
        'word-1',
        projectId,
        'hello',
        'привет',
        now,
        now,
        'word-2',
        'world',
        'мир',
      ],
    );
  }
};
