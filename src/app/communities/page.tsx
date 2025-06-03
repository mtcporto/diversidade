import Link from 'next/link';
import { Button } from '@/components/ui/button';
import CommunityTable from './components/community-table';
import { PlusCircle } from 'lucide-react';
import { getCommunities } from '@/lib/data';
import type { Community, CommunityCategory } from '@/types';

export default async function CommunitiesPage({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
    category?: CommunityCategory;
  };
}) {
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;
  const category = searchParams?.category;

  // For this scaffold, we fetch all and filter/paginate client-side in CommunityTable
  // Or, pass query params to getCommunities for server-side filtering/pagination
  const { communities, totalCount } = await getCommunities(query, category, currentPage, 10);

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-headline text-primary">Comunidades Registradas</h1>
        <Button asChild className="bg-accent hover:bg-accent/90 text-accent-foreground">
          <Link href="/communities/new">
            <PlusCircle className="mr-2 h-5 w-5" />
            Adicionar Nova
          </Link>
        </Button>
      </div>
      <CommunityTable
        initialCommunities={communities}
        initialTotalCount={totalCount}
        initialPage={currentPage}
        searchQuery={query}
        searchCategory={category}
      />
    </div>
  );
}
