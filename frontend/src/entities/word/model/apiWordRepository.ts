import { apiRequest } from '@/shared/api/client';

import type { WordRepository } from './wordRepository';
import type { QuickSaveWordPayload, Word } from '../types';

export const apiWordRepository: WordRepository = {
  getWordsByProjectId: async (projectId) => {
    return apiRequest<Word[]>(
      `/api/words/project/${encodeURIComponent(projectId)}`,
    );
  },

  createWord: async (payload: QuickSaveWordPayload) => {
    return apiRequest<Word>('/api/words', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  },
};
