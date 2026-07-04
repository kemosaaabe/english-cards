import { apiRequest } from '@/shared/api/client';

import type { CreateProjectPayload, Project } from '../types';

export const getProjects = (userId: string) => {
  return apiRequest<Project[]>(
    `/api/projects?userId=${encodeURIComponent(userId)}`,
  );
};

export const getProjectById = (projectId: string) => {
  return apiRequest<Project>(`/api/projects/${encodeURIComponent(projectId)}`);
};

export const createProject = (
  userId: string,
  payload: CreateProjectPayload,
) => {
  return apiRequest<Project>(
    `/api/projects?userId=${encodeURIComponent(userId)}`,
    {
      method: 'POST',
      body: JSON.stringify(payload),
    },
  );
};
