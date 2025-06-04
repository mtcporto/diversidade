"use client";

import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css'; // Changed from .webpack.css
import 'leaflet-defaulticon-compatibility';
import type * as L from 'leaflet';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import React, { useState, useEffect } from 'react';

interface CommunityMiniMapProps {
  lat: number;
  lng: number;
  name: string;
}

export default function CommunityMiniMap({ lat, lng, name }: CommunityMiniMapProps) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return (
      <div className="flex items-center justify-center h-full bg-muted text-muted-foreground p-4 text-center text-sm">
        Carregando mapa...
      </div>
    );
  }

  const position: L.LatLngExpression = [lat, lng];

  return (
    <MapContainer 
        center={position} 
        zoom={13} 
        scrollWheelZoom={false} 
        style={{ height: '100%', width: '100%' }}
        attributionControl={false}
        zoomControl={false}
        className="rounded-md"
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={position}>
        <Popup>
          {name}
        </Popup>
      </Marker>
    </MapContainer>
  );
}
