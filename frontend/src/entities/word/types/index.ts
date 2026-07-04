export type Word = {
  id: string;
  projectId: string;
  english: string;
  russian: string;
  createdAt: string;
  updatedAt: string;
};

export type QuickSaveWordPayload = {
  projectId: string;
  english: string;
  russian: string;
};
