export type User = {
  id: string;
  name: string;
  email?: string;
  createdAt: string;
};

export type Project = {
  id: string;
  userId: string;
  title: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
};

export type Word = {
  id: string;
  projectId: string;
  english: string;
  russian: string;
  createdAt: string;
  updatedAt: string;
};

export type CreateProjectBody = {
  title: string;
  description?: string;
};

export type CreateWordBody = {
  projectId: string;
  english: string;
  russian: string;
};
