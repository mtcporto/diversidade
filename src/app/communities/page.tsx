
import { PlusCircle } from 'lucide-react';
import { getCommunities } from '@/lib/data';
import type { CommunityCategory } from '@/types';
import CommunityTable from './components/community-table';
import AddCommunityButton from './components/add-community-button'; // Import the client component

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

  const { communities, totalCount } = await getCommunities(query, category, currentPage, 10);

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-headline text-primary">Comunidades Registradas</h1>
        <AddCommunityButton /> {/* Use the client component */}
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
