import { useQuery } from '@tanstack/react-query';

import { getCurrentUser } from '../../api';
import { userQueryKeys } from '../../constants';

export const useCurrentUser = () => {
  return useQuery({
    queryKey: userQueryKeys.current,
    queryFn: getCurrentUser,
  });
};
