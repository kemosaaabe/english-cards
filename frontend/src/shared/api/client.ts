import { apiBaseUrl } from '@/shared/config/api';

type ApiErrorBody = {
  message?: string;
};

export const apiRequest = async <T>(
  path: string,
  options?: RequestInit,
): Promise<T> => {
  const response = await fetch(`${apiBaseUrl}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
  });

  if (!response.ok) {
    const errorBody: ApiErrorBody = await response.json().catch(() => ({}));
    throw new Error(errorBody.message ?? `Request failed: ${response.status}`);
  }

  return response.json();
};
