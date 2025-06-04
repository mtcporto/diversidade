
"use client";

import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';
import type * as L from 'leaflet';

import type { Community } from '@/types';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ExternalLink } from 'lucide-react';

interface InteractiveMapProps {
  communities: Community[];
}

const BRAZIL_CENTER: L.LatLngExpression = [-14.2350, -51.9253];
const INITIAL_ZOOM = 4; 
const MIN_ZOOM_LEVEL = 4; // Mantém o foco no Brasil
const MAX_ZOOM_LEVEL = 9; // Nível máximo de zoom para visualização de estados/cidades maiores

export default function InteractiveMap({ communities }: InteractiveMapProps) {
  const [iconsReady, setIconsReady] = useState(false);

  useEffect(() => {
    import('leaflet-defaulticon-compatibility')
      .then(() => setIconsReady(true))
      .catch(err => console.error("Failed to load leaflet-defaulticon-compatibility for InteractiveMap", err));
  }, []);

  const mapCenter = communities.length > 0 && typeof communities[0].latitude === 'number' && typeof communities[0].longitude === 'number'
    ? [communities[0].latitude, communities[0].longitude] as L.LatLngExpression
    : BRAZIL_CENTER;
  
  const currentInitialZoom = communities.length > 0 ? Math.max(INITIAL_ZOOM, 5) : INITIAL_ZOOM;

  return (
    <MapContainer 
        center={mapCenter} 
        zoom={currentInitialZoom} 
        minZoom={MIN_ZOOM_LEVEL}
        maxZoom={MAX_ZOOM_LEVEL}
        scrollWheelZoom={true} 
        style={{ height: '100%', width: '100%' }} 
        className="rounded-lg"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {iconsReady && communities.map((community) => (
        community.latitude != null && community.longitude != null && ( // Check for null or undefined
          <Marker key={community.id} position={[community.latitude, community.longitude]}>
            <Popup minWidth={220}>
               <Card className="w-full shadow-none border-none rounded-md">
                <CardHeader className="p-2">
                  <CardTitle className="font-headline text-base text-primary">{community.name}</CardTitle>
                </CardHeader>
                <CardContent className="p-2 text-xs space-y-1">
                  <p className="text-muted-foreground">{community.category}</p>
                  <p className="truncate">{community.address}</p>
                  <Button asChild variant="link" size="sm" className="p-0 h-auto text-xs text-accent hover:text-accent/80">
                    <Link href={`/communities/${community.id}`}>
                      Ver Detalhes <ExternalLink className="ml-1 h-3 w-3" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </Popup>
          </Marker>
        )
      ))}
    </MapContainer>
  );
}
