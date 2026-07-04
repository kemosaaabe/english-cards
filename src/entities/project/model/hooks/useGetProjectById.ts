import { useEffect, useState } from 'react';

import { localProjectRepository } from '../localProjectRepository';
import type { Project } from '../../types';

export const useGetProjectById = (projectId: string) => {
  const [project, setProject] = useState<Project | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isActive = true;

    void localProjectRepository.getProjectById(projectId).then((data) => {
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
