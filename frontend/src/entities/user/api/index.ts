import { apiRequest } from '@/shared/api/client';

import type { User } from '../types';

export const getCurrentUser = () => {
  return apiRequest<User>('/api/users/current');
};
