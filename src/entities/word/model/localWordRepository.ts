import { readStorage, writeStorage } from '@/shared/api/localStorage';

import { wordsStorageKey } from '../constants';
import type { WordRepository } from './wordRepository';
import type { Word } from '../types';

const createId = () => crypto.randomUUID();

const seedWords = (): Word[] => {
  const now = new Date().toISOString();

  return [
    {
      id: 'word-1',
      projectId: 'project-1',
      english: 'hello',
      russian: 'привет',
      createdAt: now,
      updatedAt: now,
    },
    {
      id: 'word-2',
      projectId: 'project-1',
      english: 'world',
      russian: 'мир',
      createdAt: now,
      updatedAt: now,
    },
  ];
};

const getAllWords = (): Word[] => {
  return readStorage<Word[]>(wordsStorageKey, seedWords());
};

export const localWordRepository: WordRepository = {
  getWordsByProjectId: async (projectId) => {
    return getAllWords().filter((word) => word.projectId === projectId);
  },

  createWord: async (payload) => {
    const now = new Date().toISOString();
    const word: Word = {
      id: createId(),
      projectId: payload.projectId,
      english: payload.english.trim(),
      russian: payload.russian.trim(),
      createdAt: now,
      updatedAt: now,
    };

    const words = getAllWords();
    writeStorage(wordsStorageKey, [...words, word]);

    return word;
  },
};
