export const wordQueryKeys = {
  all: ['words'] as const,
  list: (projectId: string) =>
    [...wordQueryKeys.all, 'list', projectId] as const,
};
