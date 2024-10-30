import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

export function Breadcrumbs() {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  return (
    <nav className="flex items-center space-x-2 text-sm text-muted-foreground mb-6" aria-label="Breadcrumb">
      <Link to="/" className="flex items-center hover:text-foreground">
        <Home className="h-4 w-4" />
      </Link>
      {pathnames.length > 0 && (
        <ChevronRight className="h-4 w-4" />
      )}
      {pathnames.map((name, index) => {
        const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
        const isLast = index === pathnames.length - 1;
        const displayName = name.split('-').map(word => 
          word.charAt(0).toUpperCase() + word.slice(1)
        ).join(' ');

        return (
          <div key={name} className="flex items-center">
            <Link
              to={routeTo}
              className={`hover:text-foreground ${isLast ? 'text-foreground font-medium' : ''}`}
            >
              {displayName}
            </Link>
            {!isLast && (
              <ChevronRight className="h-4 w-4 ml-2" />
            )}
          </div>
        );
      })}
    </nav>
  );
}