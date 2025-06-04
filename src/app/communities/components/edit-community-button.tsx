
"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Edit3 } from 'lucide-react';
import { useAuth } from '@/context/auth-context';

interface EditCommunityButtonProps {
  communityId: string;
}

export default function EditCommunityButton({ communityId }: EditCommunityButtonProps) {
  const { user } = useAuth();

  if (!user) {
    return null;
  }

  return (
    <Button asChild variant="outline" className="border-accent text-accent hover:bg-accent/10 hover:text-accent">
      <Link href={`/communities/${communityId}/edit`}>
        <Edit3 className="mr-2 h-5 w-5" /> Editar Comunidade
      </Link>
    </Button>
  );
}
