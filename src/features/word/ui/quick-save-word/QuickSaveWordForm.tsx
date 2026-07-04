import { useState, type FormEvent } from 'react';

import { Button, Input, Label } from '@/shared/ui';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/shared/ui/card';

import type { Project } from '@/entities/project';
import { useCreateWord } from '@/entities/word';

import {
  SelectProject,
  useSelectedProject,
} from '@/features/project/select-project';

type QuickSaveWordFormProps = {
  projects: Project[];
  defaultProjectId?: string;
  onSaved?: () => void;
};

export const QuickSaveWordForm = ({
  projects,
  defaultProjectId,
  onSaved,
}: QuickSaveWordFormProps) => {
  const { createWord, isSubmitting } = useCreateWord();
  const { selectedProjectId } = useSelectedProject();
  const [english, setEnglish] = useState('');
  const [russian, setRussian] = useState('');

  const projectId = defaultProjectId ?? selectedProjectId;

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!english.trim() || !russian.trim() || !projectId) {
      return;
    }

    await createWord({
      projectId,
      english: english.trim(),
      russian: russian.trim(),
    });

    setEnglish('');
    setRussian('');
    onSaved?.();
  };

  if (projects.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Quick save</CardTitle>
          <CardDescription>Create a project first to save words</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick save</CardTitle>
        <CardDescription>Add an English word with Russian translation</CardDescription>
      </CardHeader>
      <CardContent>
        <form className="grid gap-4" onSubmit={handleSubmit}>
          {!defaultProjectId ? <SelectProject projects={projects} /> : null}
          <div className="grid gap-2">
            <Label htmlFor="english">English</Label>
            <Input
              id="english"
              value={english}
              onChange={(event) => setEnglish(event.target.value)}
              placeholder="hello"
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="russian">Russian</Label>
            <Input
              id="russian"
              value={russian}
              onChange={(event) => setRussian(event.target.value)}
              placeholder="привет"
              required
            />
          </div>
          <Button type="submit" disabled={isSubmitting || !projectId}>
            {isSubmitting ? 'Saving…' : 'Save word'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
