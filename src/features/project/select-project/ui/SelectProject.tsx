import type { Project } from '@/entities/project';
import { Label } from '@/shared/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/ui/select';

import { useSelectedProject } from '../model/hooks/useSelectedProject';

type SelectProjectProps = {
  projects: Project[];
  label?: string;
};

export const SelectProject = ({
  projects,
  label = 'Project',
}: SelectProjectProps) => {
  const { selectedProjectId, setSelectedProjectId } = useSelectedProject();

  return (
    <div className="grid gap-2">
      <Label htmlFor="project-select">{label}</Label>
      <Select
        value={selectedProjectId ?? undefined}
        onValueChange={setSelectedProjectId}
      >
        <SelectTrigger id="project-select" className="w-full">
          <SelectValue placeholder="Select a project" />
        </SelectTrigger>
        <SelectContent>
          {projects.map((project) => (
            <SelectItem key={project.id} value={project.id}>
              {project.title}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
