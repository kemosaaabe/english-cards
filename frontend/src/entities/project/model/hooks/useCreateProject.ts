import { useState } from 'react';

import { apiProjectRepository } from '../apiProjectRepository';
import type { CreateProjectPayload } from '../../types';

export const useCreateProject = (userId: string) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const createProject = async (payload: CreateProjectPayload) => {
    setIsSubmitting(true);
    const project = await apiProjectRepository.createProject(userId, payload);
    setIsSubmitting(false);

    return project;
  };

  return { createProject, isSubmitting };
};
