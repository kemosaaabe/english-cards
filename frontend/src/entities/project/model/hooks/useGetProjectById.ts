import { useQuery } from '@tanstack/react-query';

import { getProjectById } from '../../api';
import { projectQueryKeys } from '../../constants';

export const useGetProjectById = (projectId: string) => {
  return useQuery({
    queryKey: projectQueryKeys.detail(projectId),
    queryFn: () => getProjectById(projectId),
    enabled: Boolean(projectId),
  });
};
