import { useEffect, useState } from 'react';

import { getCurrentUser } from '../userApi';
import type { User } from '../../types';

export const useCurrentUser = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isActive = true;

    void getCurrentUser().then((data) => {
      if (isActive) {
        setUser(data);
        setIsLoading(false);
      }
    });

    return () => {
      isActive = false;
    };
  }, []);

  return { user, isLoading };
};
