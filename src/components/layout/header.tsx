import Link from 'next/link';
import NavLink from './nav-link';
import { UsersRound, Map, Home } from 'lucide-react';

export default function Header() {
  return (
    <header className="bg-primary text-primary-foreground shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex flex-col sm:flex-row justify-between items-center">
        <Link href="/" className="text-3xl font-headline hover:text-accent transition-colors duration-200">
          Mapa de Diversidade
        </Link>
        <nav className="mt-4 sm:mt-0">
          <ul className="flex space-x-4 sm:space-x-6">
            <li>
              <NavLink href="/">
                <Home className="mr-1 h-5 w-5" />
                Início
              </NavLink>
            </li>
            <li>
              <NavLink href="/communities">
                <UsersRound className="mr-1 h-5 w-5" />
                Comunidades
              </NavLink>
            </li>
            <li>
              <NavLink href="/map">
                <Map className="mr-1 h-5 w-5" />
                Mapa Interativo
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
