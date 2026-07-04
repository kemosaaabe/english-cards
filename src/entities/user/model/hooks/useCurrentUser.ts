import { mockUser } from '../mockUser';
import type { User } from '../../types';

export const useCurrentUser = (): User => {
  return mockUser;
};
