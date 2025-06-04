
import { getAllCommunitiesForMap } from '@/lib/data';
// import InteractiveMap from './components/interactive-map'; // Original import
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import dynamic from 'next/dynamic';
import type { ComponentType } from 'react';
import type { Community } from '@/types';

// Dynamically import InteractiveMap with SSR turned off
const InteractiveMap: ComponentType<{ communities: Community[] }> = dynamic(
  () => import('./components/interactive-map'),
  { 
    ssr: false,
    loading: () => <div className="flex items-center justify-center h-[600px] bg-muted text-muted-foreground p-4 text-center text-sm rounded-lg shadow-xl border border-border">Carregando mapa...</div> 
  }
);

export default async function MapPage() {
  const communities = await getAllCommunitiesForMap();
  
  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-headline text-primary">Mapa Interativo de Comunidades</h1>
      <p className="text-lg text-foreground/80">
        Explore a localização das comunidades registradas. Clique nos marcadores para mais informações.
      </p>
      <div className="h-[600px] w-full rounded-lg overflow-hidden shadow-xl border border-border">
        <InteractiveMap communities={communities} />
      </div>
    </div>
  );
}
