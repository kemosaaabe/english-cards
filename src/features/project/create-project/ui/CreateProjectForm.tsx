import { useState, type FormEvent } from 'react';

import { Button, Input, Label } from '@/shared/ui';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/shared/ui/card';

import { useCreateProject } from '@/entities/project';
import { useCurrentUser } from '@/entities/user';

type CreateProjectFormProps = {
  onCreated?: () => void;
};

export const CreateProjectForm = ({ onCreated }: CreateProjectFormProps) => {
  const user = useCurrentUser();
  const { createProject, isSubmitting } = useCreateProject(user.id);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!title.trim()) {
      return;
    }

    await createProject({
      title: title.trim(),
      description: description.trim() || undefined,
    });

    setTitle('');
    setDescription('');
    onCreated?.();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>New project</CardTitle>
        <CardDescription>Create a vocabulary project</CardDescription>
      </CardHeader>
      <CardContent>
        <form className="grid gap-4" onSubmit={handleSubmit}>
          <div className="grid gap-2">
            <Label htmlFor="project-title">Title</Label>
            <Input
              id="project-title"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              placeholder="Travel vocabulary"
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="project-description">Description (optional)</Label>
            <Input
              id="project-description"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              placeholder="Words for my trip"
            />
          </div>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Creating…' : 'Create project'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
