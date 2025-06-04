
"use client";

import dynamic from 'next/dynamic';
import type { ComponentType } from 'react';

// Dynamically import CommunityMiniMap with SSR turned off
const CommunityMiniMapComponent: ComponentType<{ lat: number; lng: number; name: string }> = dynamic(
  () => import('./community-mini-map'),
  { 
    ssr: false,
    loading: () => <div className="flex items-center justify-center h-64 bg-muted text-muted-foreground p-4 text-center text-sm rounded-md border border-border shadow-sm">Carregando mini mapa...</div>
  }
);

interface MiniMapClientLoaderProps {
  lat: number;
  lng: number;
  name: string;
}

export default function MiniMapClientLoader({ lat, lng, name }: MiniMapClientLoaderProps) {
  return <CommunityMiniMapComponent lat={lat} lng={lng} name={name} />;
}
