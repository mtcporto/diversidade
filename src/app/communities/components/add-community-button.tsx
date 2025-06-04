
"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import { useAuth } from '@/context/auth-context';

export default function AddCommunityButton() {
  const { user } = useAuth();

  if (!user) {
    return null;
  }

  return (
    <Button asChild className="bg-accent hover:bg-accent/90 text-accent-foreground">
      <Link href="/communities/new">
        <PlusCircle className="mr-2 h-5 w-5" />
        Adicionar Nova
      </Link>
    </Button>
  );
}
