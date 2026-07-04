export const projectQueryKeys = {
  all: ['projects'] as const,
  list: (userId: string) => [...projectQueryKeys.all, 'list', userId] as const,
  detail: (projectId: string) =>
    [...projectQueryKeys.all, 'detail', projectId] as const,
};
