import { useCallback, useEffect, useState } from 'react';

import { apiWordRepository } from '../apiWordRepository';
import type { Word } from '../../types';

export const useGetWordsByProjectId = (projectId: string) => {
  const [words, setWords] = useState<Word[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadWords = useCallback(async () => {
    setIsLoading(true);
    const data = await apiWordRepository.getWordsByProjectId(projectId);
    setWords(data);
    setIsLoading(false);
  }, [projectId]);

  useEffect(() => {
    let isActive = true;

    void apiWordRepository.getWordsByProjectId(projectId).then((data) => {
      if (isActive) {
        setWords(data);
        setIsLoading(false);
      }
    });

    return () => {
      isActive = false;
    };
  }, [projectId]);

  return { words, isLoading, reload: loadWords };
};
