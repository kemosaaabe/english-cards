import { useMutation, useQueryClient } from '@tanstack/react-query';

import { createWord } from '../../api';
import { wordQueryKeys } from '../../constants';

export const useCreateWord = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createWord,
    onSuccess: (_word, variables) => {
      return queryClient.invalidateQueries({
        queryKey: wordQueryKeys.list(variables.projectId),
      });
    },
  });
};
