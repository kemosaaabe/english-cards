import { create } from 'zustand';

type ProjectSelectionState = {
  selectedProjectId: string | null;
  setSelectedProjectId: (projectId: string) => void;
};

export const useProjectSelectionStore = create<ProjectSelectionState>(
  (set) => ({
    selectedProjectId: null,
    setSelectedProjectId: (selectedProjectId) => set({ selectedProjectId }),
  }),
);
