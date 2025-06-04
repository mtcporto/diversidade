
"use client";

import type { Community } from '@/types';
import dynamic from 'next/dynamic';
import type { ComponentType } from 'react';

// Dynamically import InteractiveMap with SSR turned off
const InteractiveMapComponent: ComponentType<{ communities: Community[] }> = dynamic(
  () => import('./interactive-map'),
  { 
    ssr: false,
    loading: () => <div className="flex items-center justify-center h-full bg-muted text-muted-foreground p-4 text-center text-sm rounded-lg shadow-xl border border-border">Carregando mapa...</div> 
  }
);

interface MapClientLoaderProps {
  communities: Community[];
}

export default function MapClientLoader({ communities }: MapClientLoaderProps) {
  return <InteractiveMapComponent communities={communities} />;
}
