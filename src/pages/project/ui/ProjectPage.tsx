import { Link, useParams } from 'react-router-dom';

import { routes } from '@/shared/config/routes';

import { useGetProjectById } from '@/entities/project';
import { useGetWordsByProjectId } from '@/entities/word';

import { QuickSaveWordForm } from '@/features/word';

import { Header } from '@/widgets/header';
import { ProjectWordsList } from '@/widgets/project';

export const ProjectPage = () => {
  const { projectId = '' } = useParams();
  const { project, isLoading: isProjectLoading } = useGetProjectById(projectId);
  const { words, isLoading: isWordsLoading, reload } =
    useGetWordsByProjectId(projectId);

  if (isProjectLoading) {
    return (
      <div className="min-h-screen">
        <Header />
        <main className="mx-auto max-w-5xl px-4 py-8">Loading project…</main>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen">
        <Header />
        <main className="mx-auto max-w-5xl px-4 py-8">
          <p>Project not found.</p>
          <Link to={routes.projects} className="text-primary underline">
            Back to projects
          </Link>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Header />
      <main className="mx-auto grid max-w-5xl gap-8 px-4 py-8">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">{project.title}</h1>
          {project.description ? (
            <p className="text-muted-foreground mt-2">{project.description}</p>
          ) : null}
        </div>
        <div className="grid gap-8 lg:grid-cols-2">
          <QuickSaveWordForm
            projects={[project]}
            defaultProjectId={project.id}
            onSaved={reload}
          />
          <ProjectWordsList words={words} isLoading={isWordsLoading} />
        </div>
      </main>
    </div>
  );
};
