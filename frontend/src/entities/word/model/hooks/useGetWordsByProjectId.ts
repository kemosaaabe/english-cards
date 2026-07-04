import { useQuery } from '@tanstack/react-query';

import { getWordsByProjectId } from '../../api';
import { wordQueryKeys } from '../../constants';

export const useGetWordsByProjectId = (projectId: string) => {
  return useQuery({
    queryKey: wordQueryKeys.list(projectId),
    queryFn: () => getWordsByProjectId(projectId),
    enabled: Boolean(projectId),
  });
};
