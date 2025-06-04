
import { getAllCommunitiesForMap } from '@/lib/data';
import MapClientLoader from './components/map-client-loader'; // Updated import

export default async function MapPage() {
  const communities = await getAllCommunitiesForMap();
  
  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-headline text-primary">Mapa Interativo de Comunidades</h1>
      <p className="text-lg text-foreground/80">
        Explore a localização das comunidades registradas. Clique nos marcadores para mais informações.
      </p>
      <div className="h-[600px] w-full rounded-lg overflow-hidden shadow-xl border border-border">
        <MapClientLoader communities={communities} />
      </div>
    </div>
  );
}
