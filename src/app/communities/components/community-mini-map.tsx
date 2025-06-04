
"use client";

import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';
import type * as L from 'leaflet';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import React, { useEffect, useState } from 'react';

interface CommunityMiniMapProps {
  lat: number;
  lng: number;
  name: string;
}

export default function CommunityMiniMap({ lat, lng, name }: CommunityMiniMapProps) {
  const [iconsReady, setIconsReady] = useState(false);

  useEffect(() => {
    import('leaflet-defaulticon-compatibility')
      .then(() => setIconsReady(true))
      .catch(err => console.error("Failed to load leaflet-defaulticon-compatibility for MiniMap", err));
  }, []);

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
      {iconsReady && (
        <Marker position={position}>
          <Popup>
            {name}
          </Popup>
        </Marker>
      )}
    </MapContainer>
  );
}
