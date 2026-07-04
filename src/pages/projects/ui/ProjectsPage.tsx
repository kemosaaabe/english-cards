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

import { Header } from '@/widgets/header';

export const ProjectsPage = () => {
  const user = useCurrentUser();
  const { projects, isLoading, reload } = useGetProjects(user.id);

  return (
    <div className="min-h-screen">
      <Header />
      <main className="mx-auto grid max-w-5xl gap-8 px-4 py-8 lg:grid-cols-[2fr_1fr]">
        <Card>
          <CardHeader>
            <CardTitle>All projects</CardTitle>
            <CardDescription>
              {isLoading ? 'Loading…' : `${projects.length} project(s)`}
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
        <CreateProjectForm onCreated={reload} />
      </main>
    </div>
  );
};
