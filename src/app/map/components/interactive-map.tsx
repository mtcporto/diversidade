"use client";

import type { Community } from '@/types';
import { APIProvider, Map, AdvancedMarker, Pin, InfoWindow } from '@vis.gl/react-google-maps';
import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ExternalLink } from 'lucide-react';

interface InteractiveMapProps {
  communities: Community[];
  apiKey: string;
}

// Default center for Brazil if no communities or if needed
const BRAZIL_CENTER = { lat: -14.2350, lng: -51.9253 };
const DEFAULT_ZOOM = 4;
const MARKER_ZOOM = 12;


export default function InteractiveMap({ communities, apiKey }: InteractiveMapProps) {
  const [selectedCommunity, setSelectedCommunity] = useState<Community | null>(null);

  const mapCenter = communities.length > 0 
    ? { lat: communities[0].latitude, lng: communities[0].longitude } 
    : BRAZIL_CENTER;

  const mapZoom = communities.length > 0 ? DEFAULT_ZOOM : DEFAULT_ZOOM;


  if (!apiKey || apiKey === "YOUR_GOOGLE_MAPS_API_KEY_HERE") {
     // This case should ideally be handled by the parent page, but as a fallback:
    return <div className="flex items-center justify-center h-full bg-muted text-muted-foreground">Por favor, configure a chave da API do Google Maps.</div>;
  }

  return (
    <APIProvider apiKey={apiKey}>
      <Map
        defaultCenter={mapCenter}
        defaultZoom={mapZoom}
        gestureHandling={'greedy'}
        disableDefaultUI={true}
        mapId="mapaDiversidade"
        className="w-full h-full"
      >
        {communities.map((community) => (
          <AdvancedMarker
            key={community.id}
            position={{ lat: community.latitude, lng: community.longitude }}
            onClick={() => setSelectedCommunity(community)}
          >
            <Pin background={'#2E8B57'} glyphColor={'#FFFFFF'} borderColor={'#D4A22B'} />
          </AdvancedMarker>
        ))}

        {selectedCommunity && (
          <InfoWindow
            position={{ lat: selectedCommunity.latitude, lng: selectedCommunity.longitude }}
            onCloseClick={() => setSelectedCommunity(null)}
            pixelOffset={[0,-30]}
          >
            <Card className="w-64 shadow-none border-none">
              <CardHeader className="p-3">
                <CardTitle className="font-headline text-lg text-primary">{selectedCommunity.name}</CardTitle>
              </CardHeader>
              <CardContent className="p-3 text-sm space-y-1">
                <p className="text-muted-foreground">{selectedCommunity.category}</p>
                <p className="truncate">{selectedCommunity.address}</p>
                 <Button asChild variant="link" size="sm" className="p-0 h-auto text-accent hover:text-accent/80">
                  <Link href={`/communities/${selectedCommunity.id}`}>
                    Ver Detalhes <ExternalLink className="ml-1 h-3 w-3" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </InfoWindow>
        )}
      </Map>
    </APIProvider>
  );
}
