import { apiRequest } from '@/shared/api/client';

import type { QuickSaveWordPayload, Word } from '../types';

export const getWordsByProjectId = (projectId: string) => {
  return apiRequest<Word[]>(
    `/api/words/project/${encodeURIComponent(projectId)}`,
  );
};

export const createWord = (payload: QuickSaveWordPayload) => {
  return apiRequest<Word>('/api/words', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
};
