
"use client";

import Link from 'next/link';
import NavLink from './nav-link';
import { UsersRound, Map as MapIcon, Home, LogIn, LogOut, UserPlus, UserCircle } from 'lucide-react';
import { useAuth } from '@/context/auth-context';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";


export default function Header() {
  const { user, loading, logout } = useAuth();

  const getInitials = (email?: string | null) => {
    if (!email) return "?";
    return email.substring(0, 2).toUpperCase();
  }

  return (
    <header className="bg-primary text-primary-foreground shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex flex-col sm:flex-row justify-between items-center">
        <Link href="/" className="text-3xl font-headline hover:text-accent transition-colors duration-200 mb-4 sm:mb-0">
          Mapa de Diversidade
        </Link>
        <nav className="flex items-center space-x-4 sm:space-x-6">
          <ul className="flex space-x-4 sm:space-x-6">
            <li>
              <NavLink href="/">
                <Home className="mr-1 h-5 w-5 sm:mr-2" />
                <span className="hidden sm:inline">Início</span>
              </NavLink>
            </li>
            <li>
              <NavLink href="/communities">
                <UsersRound className="mr-1 h-5 w-5 sm:mr-2" />
                <span className="hidden sm:inline">Comunidades</span>
              </NavLink>
            </li>
            <li>
              <NavLink href="/map">
                <MapIcon className="mr-1 h-5 w-5 sm:mr-2" />
                <span className="hidden sm:inline">Mapa</span>
              </NavLink>
            </li>
          </ul>
          <div className="w-px h-6 bg-primary-foreground/30 hidden sm:block"></div>
          {loading ? (
            <div className="flex items-center space-x-2">
              <Skeleton className="h-8 w-20 rounded-md bg-primary/50" />
              <Skeleton className="h-8 w-8 rounded-full bg-primary/50" />
            </div>
          ) : user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-full p-0 hover:bg-primary/80">
                   <Avatar className="h-8 w-8">
                    {user.photoURL ? (
                       <AvatarImage src={user.photoURL} alt={user.displayName || user.email || "User"} />
                    ) : null}
                    <AvatarFallback className="bg-accent text-accent-foreground">
                      {getInitials(user.email)}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none text-foreground">
                      {user.displayName || "Usuário"}
                    </p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {user.email}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={logout} className="cursor-pointer text-destructive focus:text-destructive focus:bg-destructive/10">
                  <LogOut className="mr-2 h-4 w-4" />
                  Sair
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex space-x-2">
              <Button asChild variant="outline" size="sm" className="text-primary-foreground border-primary-foreground/50 hover:bg-primary-foreground/10 hover:text-accent">
                <Link href="/login">
                  <LogIn className="mr-1 h-4 w-4" /> Login
                </Link>
              </Button>
              <Button asChild size="sm" className="bg-accent hover:bg-accent/90 text-accent-foreground">
                <Link href="/signup">
                  <UserPlus className="mr-1 h-4 w-4" /> Cadastrar
                </Link>
              </Button>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}
