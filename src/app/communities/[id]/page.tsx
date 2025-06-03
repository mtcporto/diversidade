import { getCommunityById } from '@/lib/data';
import { notFound } from 'next/navigation';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import { Mail, Phone, Globe, MapPin, Edit3, Users, Palette, TreePine, Building } from 'lucide-react';
import CommunityMiniMap from '../components/community-mini-map';
import type { CommunityCategory } from '@/types';

const CategoryDisplay = ({ category }: { category: CommunityCategory }) => {
  const iconMap: Record<CommunityCategory, React.ReactNode> = {
    Indigenous: <Users className="mr-2 h-5 w-5 text-red-500" />,
    Quilombola: <Users className="mr-2 h-5 w-5 text-purple-500" />,
    Artisans: <Palette className="mr-2 h-5 w-5 text-orange-500" />,
    Agricultural: <TreePine className="mr-2 h-5 w-5 text-green-500" />,
    Cultural: <Building className="mr-2 h-5 w-5 text-blue-500" />,
    Environmental: <TreePine className="mr-2 h-5 w-5 text-teal-500" />,
    Other: <Users className="mr-2 h-5 w-5 text-gray-500" />,
  };
  return (
    <div className="flex items-center text-lg">
      {iconMap[category]}
      <span>{category}</span>
    </div>
  );
};

export default async function CommunityDetailPage({ params }: { params: { id: string } }) {
  const community = await getCommunityById(params.id);

  if (!community) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <Card className="shadow-xl overflow-hidden">
        {community.imageUrl && (
          <div className="relative w-full h-64 md:h-80">
            <Image
              src={community.imageUrl}
              alt={`Imagem de ${community.name}`}
              layout="fill"
              objectFit="cover"
              data-ai-hint="community photo"
            />
          </div>
        )}
        <CardHeader className="pt-6">
          <CardTitle className="font-headline text-4xl text-primary mb-2">{community.name}</CardTitle>
          <CardDescription className="text-lg">
            <CategoryDisplay category={community.category} />
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h3 className="font-semibold text-xl mb-2 text-primary/90">Descrição</h3>
            <p className="text-foreground/80 whitespace-pre-wrap">{community.description}</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-xl mb-2 text-primary/90">Localização</h3>
              <div className="flex items-center text-foreground/80 mb-2">
                <MapPin className="mr-2 h-5 w-5 text-accent" />
                {community.address}
              </div>
              {community.latitude && community.longitude && (
                <div className="h-64 rounded-md overflow-hidden border border-border shadow-sm">
                   <CommunityMiniMap lat={community.latitude} lng={community.longitude} name={community.name} />
                </div>
              )}
            </div>
            <div>
              <h3 className="font-semibold text-xl mb-2 text-primary/90">Contato</h3>
              <ul className="space-y-2 text-foreground/80">
                {community.contactEmail && (
                  <li className="flex items-center">
                    <Mail className="mr-2 h-5 w-5 text-accent" />
                    <a href={`mailto:${community.contactEmail}`} className="hover:text-accent transition-colors">{community.contactEmail}</a>
                  </li>
                )}
                {community.contactPhone && (
                  <li className="flex items-center">
                    <Phone className="mr-2 h-5 w-5 text-accent" />
                    {community.contactPhone}
                  </li>
                )}
                {community.website && (
                  <li className="flex items-center">
                    <Globe className="mr-2 h-5 w-5 text-accent" />
                    <a href={community.website} target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">{community.website}</a>
                  </li>
                )}
              </ul>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-xl mb-2 text-primary/90">Detalhes Adicionais</h3>
            <p className="text-sm text-muted-foreground">
              Cadastrada em: {new Date(community.createdAt).toLocaleDateString('pt-BR')}
            </p>
            <p className="text-sm text-muted-foreground">
              Última atualização: {new Date(community.updatedAt).toLocaleDateString('pt-BR')}
            </p>
            <p className="text-sm text-muted-foreground">
              Status: {community.isActive ? 'Ativa' : 'Arquivada'}
            </p>
          </div>

        </CardContent>
        <CardFooter className="border-t pt-6">
          <Button asChild variant="outline" className="border-accent text-accent hover:bg-accent/10">
            <Link href={`/communities/${community.id}/edit`}>
              <Edit3 className="mr-2 h-5 w-5" /> Editar Comunidade
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
