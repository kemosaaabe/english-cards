import { useProjectSelectionStore } from '../store/projectSelectionStore';

export const useSelectedProject = () => {
  const selectedProjectId = useProjectSelectionStore(
    (state) => state.selectedProjectId,
  );
  const setSelectedProjectId = useProjectSelectionStore(
    (state) => state.setSelectedProjectId,
  );

  return { selectedProjectId, setSelectedProjectId };
};
