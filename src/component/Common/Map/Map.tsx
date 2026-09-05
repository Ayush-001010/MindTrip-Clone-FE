import React, { useEffect, useRef } from "react";
import * as maptilersdk from "@maptiler/sdk";
import "@maptiler/sdk/dist/maptiler-sdk.css";
import type IMap from "./IMap";

const Map: React.FC<IMap> = ({
  latitude,
  longitude,
}) => {
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const mapInstance = useRef<maptilersdk.Map | null>(null);

  // Create the map once
  useEffect(() => {
    if (!mapContainer.current || mapInstance.current) {
      return;
    }

    const apiKey = import.meta.env.VITE_MAPTILER_API_KEY;

    if (!apiKey) {
      console.error("VITE_MAPTILER_API_KEY is missing");
      return;
    }

    maptilersdk.config.apiKey = apiKey;

    const map = new maptilersdk.Map({
      container: mapContainer.current,
      style: maptilersdk.MapStyle.STREETS,
      center: [longitude, latitude],
      zoom: 11,
    });

    mapInstance.current = map;

    return () => {
      map.remove();
      mapInstance.current = null;
    };
  }, []);

  // Move the existing map when location changes
  useEffect(() => {
    if (!mapInstance.current) {
      return;
    }

    mapInstance.current.flyTo({
      center: [longitude, latitude],
      zoom: 11,
      essential: true,
    });
  }, [latitude, longitude]);

  return (
    <div className="h-full w-full">
      <div
        ref={mapContainer}
        className="h-full w-full"
      />
    </div>
  );
};

export default Map;