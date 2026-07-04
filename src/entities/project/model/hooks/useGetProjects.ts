import { useCallback, useEffect, useState } from 'react';

import { localProjectRepository } from '../localProjectRepository';
import type { Project } from '../../types';

export const useGetProjects = (userId: string) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadProjects = useCallback(async () => {
    setIsLoading(true);
    const data = await localProjectRepository.getProjects(userId);
    setProjects(data);
    setIsLoading(false);
  }, [userId]);

  useEffect(() => {
    let isActive = true;

    void localProjectRepository.getProjects(userId).then((data) => {
      if (isActive) {
        setProjects(data);
        setIsLoading(false);
      }
    });

    return () => {
      isActive = false;
    };
  }, [userId]);

  return { projects, isLoading, reload: loadProjects };
};
