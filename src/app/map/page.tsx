import { getAllCommunitiesForMap } from '@/lib/data';
import InteractiveMap from './components/interactive-map';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

// It's critical that users provide their own Google Maps API key.
// THIS IS A PLACEHOLDER. Replace with your actual API key, preferably from environment variables.
const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "YOUR_GOOGLE_MAPS_API_KEY_HERE";

export default async function MapPage() {
  const communities = await getAllCommunitiesForMap();

  if (GOOGLE_MAPS_API_KEY === "YOUR_GOOGLE_MAPS_API_KEY_HERE") {
    return (
       <Card className="max-w-2xl mx-auto my-10 shadow-xl">
        <CardHeader>
          <CardTitle className="font-headline text-3xl text-destructive">Configuração Necessária</CardTitle>
          <CardDescription>Para visualizar o mapa interativo, é necessário configurar a chave da API do Google Maps.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>
            Por favor, adicione sua chave da API do Google Maps à variável de ambiente 
            <code className="font-code bg-muted text-muted-foreground p-1 rounded-sm mx-1">NEXT_PUBLIC_GOOGLE_MAPS_API_KEY</code>
            no seu arquivo <code className="font-code bg-muted text-muted-foreground p-1 rounded-sm mx-1">.env.local</code>.
          </p>
          <p>Exemplo <code className="font-code bg-muted text-muted-foreground p-1 rounded-sm mx-1">.env.local</code>:</p>
          <pre className="bg-muted p-3 rounded-md text-sm font-code">
            NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=SUA_CHAVE_API_AQUI
          </pre>
          <p>Após adicionar a chave, reinicie o servidor de desenvolvimento.</p>
        </CardContent>
      </Card>
    );
  }
  
  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-headline text-primary">Mapa Interativo de Comunidades</h1>
      <p className="text-lg text-foreground/80">
        Explore a localização das comunidades registradas. Clique nos marcadores para mais informações.
      </p>
      <div className="h-[600px] w-full rounded-lg overflow-hidden shadow-xl border border-border">
        <InteractiveMap communities={communities} apiKey={GOOGLE_MAPS_API_KEY} />
      </div>
    </div>
  );
}
