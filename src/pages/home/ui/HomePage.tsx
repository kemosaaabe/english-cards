import { useEffect } from 'react';
import { Link } from 'react-router-dom';

import { routes } from '@/shared/config/routes';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/shared/ui/card';

import { useGetProjects } from '@/entities/project';
import { useCurrentUser } from '@/entities/user';

import { CreateProjectForm } from '@/features/project/create-project';
import { useProjectSelectionStore } from '@/features/project/select-project';
import { QuickSaveWordForm } from '@/features/word';

import { Header } from '@/widgets/header';

export const HomePage = () => {
  const user = useCurrentUser();
  const { projects, isLoading, reload } = useGetProjects(user.id);
  const defaultProjectId = projects[0]?.id;
  const setSelectedProjectId = useProjectSelectionStore(
    (state) => state.setSelectedProjectId,
  );

  useEffect(() => {
    if (defaultProjectId) {
      setSelectedProjectId(defaultProjectId);
    }
  }, [defaultProjectId, setSelectedProjectId]);

  return (
    <div className="min-h-screen">
      <Header />
      <main className="mx-auto grid max-w-5xl gap-8 px-4 py-8 lg:grid-cols-2">
        <div className="grid gap-8">
          <QuickSaveWordForm projects={projects} onSaved={reload} />
          <CreateProjectForm onCreated={reload} />
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Recent projects</CardTitle>
            <CardDescription>
              {isLoading ? 'Loading…' : 'Open a project to view words'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {projects.length === 0 ? (
              <p className="text-muted-foreground text-sm">No projects yet.</p>
            ) : (
              <ul className="grid gap-3">
                {projects.map((project) => (
                  <li key={project.id}>
                    <Link
                      to={routes.project(project.id)}
                      className="hover:bg-accent block rounded-lg border p-4 transition-colors"
                    >
                      <p className="font-medium">{project.title}</p>
                      {project.description ? (
                        <p className="text-muted-foreground mt-1 text-sm">
                          {project.description}
                        </p>
                      ) : null}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
};
