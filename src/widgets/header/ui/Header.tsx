import { NavLink } from 'react-router-dom';

import { routes } from '@/shared/config/routes';
import { cn } from '@/shared/lib/utils';

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  cn(
    'text-sm font-medium transition-colors hover:text-foreground',
    isActive ? 'text-foreground' : 'text-muted-foreground',
  );

export const Header = () => {
  return (
    <header className="border-b">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4">
        <NavLink
          to={routes.home}
          className="text-lg font-semibold tracking-tight"
        >
          English Cards
        </NavLink>
        <nav className="flex items-center gap-6">
          <NavLink to={routes.home} className={navLinkClass}>
            Home
          </NavLink>
          <NavLink to={routes.projects} className={navLinkClass}>
            Projects
          </NavLink>
        </nav>
      </div>
    </header>
  );
};
