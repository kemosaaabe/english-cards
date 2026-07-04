import type { QuickSaveWordPayload, Word } from '../types';

export type WordRepository = {
  getWordsByProjectId: (projectId: string) => Promise<Word[]>;
  createWord: (payload: QuickSaveWordPayload) => Promise<Word>;
};
