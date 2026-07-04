import { useCallback, useEffect, useState } from 'react';

import { apiProjectRepository } from '../apiProjectRepository';
import type { Project } from '../../types';

export const useGetProjects = (userId: string) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadProjects = useCallback(async () => {
    setIsLoading(true);
    const data = await apiProjectRepository.getProjects(userId);
    setProjects(data);
    setIsLoading(false);
  }, [userId]);

  useEffect(() => {
    if (!userId) {
      return;
    }

    let isActive = true;

    void apiProjectRepository.getProjects(userId).then((data) => {
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
