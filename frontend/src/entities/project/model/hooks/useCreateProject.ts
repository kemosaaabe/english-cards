import { useMutation, useQueryClient } from '@tanstack/react-query';

import { createProject } from '../../api';
import { projectQueryKeys } from '../../constants';
import type { CreateProjectPayload } from '../../types';

export const useCreateProject = (userId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateProjectPayload) =>
      createProject(userId, payload),
    onSuccess: () => {
      return queryClient.invalidateQueries({
        queryKey: projectQueryKeys.list(userId),
      });
    },
  });
};
