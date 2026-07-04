# English Cards

Monorepo for learning English words with Russian translations.

## Structure

```
english-cards/
├── frontend/   — React + Vite + FSD
├── backend/    — Node.js + Express + PostgreSQL
└── docker-compose.yml
```

## Local development

### With Docker

Поднимает Postgres, backend и **Vite dev server** с hot reload:

```bash
docker compose up --build
```

- Frontend (dev): http://localhost:5174
- Backend API: http://localhost:3001/api/health

Исходники frontend монтируются в контейнер — изменения применяются без пересборки.

### Without Docker

1. Start PostgreSQL locally and set `DATABASE_URL` (default: `postgres://english_cards:english_cards@localhost:5432/english_cards`)
2. Install dependencies:

```bash
npm install --prefix frontend
npm install --prefix backend
```

3. Run backend and frontend in separate terminals:

```bash
npm run dev:backend
npm run dev:frontend
```

- Frontend: http://localhost:5173 (proxies `/api` to backend)
- Backend: http://localhost:3001

## API

| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/users/current` | Current user |
| GET | `/api/projects?userId=` | User projects |
| GET | `/api/projects/:id` | Project by id |
| POST | `/api/projects?userId=` | Create project |
| GET | `/api/words/project/:projectId` | Words in project |
| POST | `/api/words` | Create word |

## Scripts (root)

```bash
npm run docker:up       # build and start all services
npm run docker:down     # stop services
npm run dev:frontend    # frontend dev server
npm run dev:backend     # backend dev server
```
