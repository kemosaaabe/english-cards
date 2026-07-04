import { apiRequest } from '@/shared/api/client';

import type { User } from '../types';

export const getCurrentUser = async (): Promise<User> => {
  return apiRequest<User>('/api/users/current');
};
