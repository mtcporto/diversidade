"use client";

import { APIProvider, Map, AdvancedMarker, Pin } from '@vis.gl/react-google-maps';

interface CommunityMiniMapProps {
  lat: number;
  lng: number;
  name: string;
}

const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "YOUR_GOOGLE_MAPS_API_KEY_HERE";

export default function CommunityMiniMap({ lat, lng, name }: CommunityMiniMapProps) {
  
  if (!GOOGLE_MAPS_API_KEY || GOOGLE_MAPS_API_KEY === "YOUR_GOOGLE_MAPS_API_KEY_HERE") {
    return (
      <div className="flex items-center justify-center h-full bg-muted text-muted-foreground p-4 text-center text-sm">
        Mapa indisponível. Configure a chave da API do Google Maps.
      </div>
    );
  }
  
  return (
    <APIProvider apiKey={GOOGLE_MAPS_API_KEY}>
      <Map
        center={{ lat, lng }}
        zoom={13}
        gestureHandling={'none'} // Disable all interactions
        disableDefaultUI={true}
        mapId={`miniMap-${name.replace(/\s+/g, '-')}`} // Unique mapId
        className="w-full h-full"
      >
        <AdvancedMarker position={{ lat, lng }} title={name}>
           <Pin background={'#2E8B57'} glyphColor={'#FFFFFF'} borderColor={'#D4A22B'} />
        </AdvancedMarker>
      </Map>
    </APIProvider>
  );
}
