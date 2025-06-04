import { getAllCommunitiesForMap } from '@/lib/data';
import InteractiveMap from './components/interactive-map';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

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
