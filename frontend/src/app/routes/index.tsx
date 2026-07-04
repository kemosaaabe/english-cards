import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { HomePage } from '@/pages/home';
import { ProjectPage } from '@/pages/project';
import { ProjectsPage } from '@/pages/projects';
import { routes } from '@/shared/config/routes';

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={routes.home} element={<HomePage />} />
        <Route path={routes.projects} element={<ProjectsPage />} />
        <Route
          path={`${routes.projects}/:projectId`}
          element={<ProjectPage />}
        />
      </Routes>
    </BrowserRouter>
  );
};
