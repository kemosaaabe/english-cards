import { useQuery } from '@tanstack/react-query';

import { getProjects } from '../../api';
import { projectQueryKeys } from '../../constants';

export const useGetProjects = (userId: string) => {
  return useQuery({
    queryKey: projectQueryKeys.list(userId),
    queryFn: () => getProjects(userId),
    enabled: Boolean(userId),
  });
};
