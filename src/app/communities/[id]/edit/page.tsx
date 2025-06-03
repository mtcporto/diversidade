import CommunityForm from '../../components/community-form';
import { getCommunityById } from '@/lib/data';
import { notFound } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default async function EditCommunityPage({ params }: { params: { id: string } }) {
  const community = await getCommunityById(params.id);

  if (!community) {
    notFound();
  }

  return (
    <div className="max-w-2xl mx-auto">
      <Card className="shadow-xl">
        <CardHeader>
          <CardTitle className="font-headline text-3xl text-primary">Editar Comunidade</CardTitle>
          <CardDescription>Atualize os dados da comunidade "{community.name}".</CardDescription>
        </CardHeader>
        <CardContent>
          <CommunityForm existingCommunity={community} />
        </CardContent>
      </Card>
    </div>
  );
}
