export const readStorage = <T>(key: string, fallback: T): T => {
  const raw = localStorage.getItem(key);
  if (!raw) {
    return fallback;
  }

  return JSON.parse(raw) satisfies T;
};

export const writeStorage = <T>(key: string, value: T): void => {
  localStorage.setItem(key, JSON.stringify(value));
};
