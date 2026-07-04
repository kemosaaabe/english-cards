import { apiRequest } from '@/shared/api/client';

import type { ProjectRepository } from './projectRepository';
import type { CreateProjectPayload, Project } from '../types';

export const apiProjectRepository: ProjectRepository = {
  getProjects: async (userId) => {
    return apiRequest<Project[]>(`/api/projects?userId=${encodeURIComponent(userId)}`);
  },

  getProjectById: async (id) => {
    try {
      return await apiRequest<Project>(`/api/projects/${encodeURIComponent(id)}`);
    } catch {
      return null;
    }
  },

  createProject: async (userId, payload: CreateProjectPayload) => {
    return apiRequest<Project>(
      `/api/projects?userId=${encodeURIComponent(userId)}`,
      {
        method: 'POST',
        body: JSON.stringify(payload),
      },
    );
  },
};
