
"use client";

import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';
// import 'leaflet-defaulticon-compatibility'; // Side effect import handled in useEffect
import type * as L from 'leaflet';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import React, { useEffect } from 'react'; // Removed useState

interface CommunityMiniMapProps {
  lat: number;
  lng: number;
  name: string;
}

export default function CommunityMiniMap({ lat, lng, name }: CommunityMiniMapProps) {
  useEffect(() => {
    // Dynamically import for side effects on client, only when window is available
    if (typeof window !== "undefined") {
        import('leaflet-defaulticon-compatibility');
    }
  }, []); // Empty dependency array, runs once on mount

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
