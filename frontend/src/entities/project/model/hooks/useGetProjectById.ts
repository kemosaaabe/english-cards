import { useEffect, useState } from 'react';

import { apiProjectRepository } from '../apiProjectRepository';
import type { Project } from '../../types';

export const useGetProjectById = (projectId: string) => {
  const [project, setProject] = useState<Project | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isActive = true;

    void apiProjectRepository.getProjectById(projectId).then((data) => {
      if (isActive) {
        setProject(data);
        setIsLoading(false);
      }
    });

    return () => {
      isActive = false;
    };
  }, [projectId]);

  return { project, isLoading };
};
