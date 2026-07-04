import type { CreateProjectPayload, Project } from '../types';

export type ProjectRepository = {
  getProjects: (userId: string) => Promise<Project[]>;
  getProjectById: (id: string) => Promise<Project | null>;
  createProject: (
    userId: string,
    payload: CreateProjectPayload,
  ) => Promise<Project>;
};
