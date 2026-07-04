# English Cards

Client-side app for saving English words with Russian translations, built with React 19, TypeScript, Vite, and shadcn/ui.

## Architecture (Feature-Sliced Design)

```
src/
├── app/          — app shell: providers, router, global styles
├── pages/        — route-level composition (home, projects, project)
├── widgets/      — composite UI blocks (header, project words list)
├── features/     — user actions (word/quick-save, create/select project)
├── entities/     — business entities (user, project, word)
└── shared/       — reusable infra (ui, config, lib, api)
```

### Layer rules

- A slice imports only from **lower** layers (`app → pages → widgets → features → entities → shared`).
- Public API of each slice is exported through `index.ts` (re-exports only).
- Types live in `entities/<entity>/types/index.ts`.
- Constants live in `entities/<entity>/constants/index.ts`.
- Hooks live in `entities/<entity>/model/hooks/` (one hook per file).

### Data layer (MVP)

- No backend — data is stored in `localStorage` via repositories in `entities/project` and `entities/word`.
- Mock user is defined in `entities/user` (single local user).
- Project selection state is managed via **zustand** in `features/project/select-project/model/store`.

## Scripts

```bash
npm run dev     # start dev server
npm run build   # typecheck + production build
npm run preview # preview production build
```

## Routes

| Path                   | Page                                |
| ---------------------- | ----------------------------------- |
| `/`                    | Home — quick save + recent projects |
| `/projects`            | All projects                        |
| `/projects/:projectId` | Words in a project                  |
