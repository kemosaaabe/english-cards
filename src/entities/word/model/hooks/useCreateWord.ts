import { useState } from 'react';

import { localWordRepository } from '../localWordRepository';
import type { QuickSaveWordPayload } from '../../types';

export const useCreateWord = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const createWord = async (payload: QuickSaveWordPayload) => {
    setIsSubmitting(true);
    const word = await localWordRepository.createWord(payload);
    setIsSubmitting(false);

    return word;
  };

  return { createWord, isSubmitting };
};
