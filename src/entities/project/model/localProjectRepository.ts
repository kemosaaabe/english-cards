import { mockUserId } from '@/entities/user';
import { readStorage, writeStorage } from '@/shared/api/localStorage';

import { projectsStorageKey } from '../constants';
import type { ProjectRepository } from './projectRepository';
import type { Project } from '../types';

const createId = () => crypto.randomUUID();

const seedProjects = (): Project[] => {
  const now = new Date().toISOString();

  return [
    {
      id: 'project-1',
      userId: mockUserId,
      title: 'My vocabulary',
      description: 'Starter project for quick word saving',
      createdAt: now,
      updatedAt: now,
    },
  ];
};

const getAllProjects = (): Project[] => {
  return readStorage<Project[]>(projectsStorageKey, seedProjects());
};

export const localProjectRepository: ProjectRepository = {
  getProjects: async (userId) => {
    return getAllProjects().filter((project) => project.userId === userId);
  },

  getProjectById: async (id) => {
    return getAllProjects().find((project) => project.id === id) ?? null;
  },

  createProject: async (userId, payload) => {
    const now = new Date().toISOString();
    const project: Project = {
      id: createId(),
      userId,
      title: payload.title,
      description: payload.description,
      createdAt: now,
      updatedAt: now,
    };

    const projects = getAllProjects();
    writeStorage(projectsStorageKey, [...projects, project]);

    return project;
  },
};
