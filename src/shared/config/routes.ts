export const routes = {
  home: '/',
  projects: '/projects',
  project: (projectId: string) => `/projects/${projectId}`,
} as const;
