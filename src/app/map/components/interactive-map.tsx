"use client";

import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css';
import 'leaflet-defaulticon-compatibility';
import type * as L from 'leaflet';

import type { Community } from '@/types';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ExternalLink } from 'lucide-react';

interface InteractiveMapProps {
  communities: Community[];
}

const BRAZIL_CENTER: L.LatLngExpression = [-14.2350, -51.9253];
const DEFAULT_ZOOM = 4;

export default function InteractiveMap({ communities }: InteractiveMapProps) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return (
      <div className="flex items-center justify-center h-full bg-muted text-muted-foreground p-4 text-center text-sm rounded-lg">
        Carregando mapa interativo...
      </div>
    );
  }
  
  const mapCenter = communities.length > 0 && communities[0].latitude && communities[0].longitude
    ? [communities[0].latitude, communities[0].longitude] as L.LatLngExpression
    : BRAZIL_CENTER;

  return (
    <MapContainer center={mapCenter} zoom={DEFAULT_ZOOM} scrollWheelZoom={true} style={{ height: '100%', width: '100%' }} className="rounded-lg">
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {communities.map((community) => (
        community.latitude && community.longitude && (
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
