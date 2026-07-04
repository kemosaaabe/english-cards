export type Project = {
  id: string;
  userId: string;
  title: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
};

export type CreateProjectPayload = {
  title: string;
  description?: string;
};
