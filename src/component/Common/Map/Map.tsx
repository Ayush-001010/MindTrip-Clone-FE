import React, { useEffect, useRef } from "react";
import * as maptilersdk from "@maptiler/sdk";
import "@maptiler/sdk/dist/maptiler-sdk.css";
import type IMap from "./IMap";
import { renderToString } from "react-dom/server";
import { FaMapMarkerAlt } from "react-icons/fa";

const Map: React.FC<IMap> = ({
  latitude,
  longitude,
  hotels,
  selectedHotel,
  onHotelSelect,
  markerPoints,
}) => {
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const mapInstance = useRef<maptilersdk.Map | null>(null);

  const hotelMarkers = useRef<maptilersdk.Marker[]>([]);
  const pointMarkers = useRef<maptilersdk.Marker[]>([]);

  useEffect(() => {
    if (!mapContainer.current || mapInstance.current) return;

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
      hotelMarkers.current.forEach((marker) => marker.remove());
      pointMarkers.current.forEach((marker) => marker.remove());

      hotelMarkers.current = [];
      pointMarkers.current = [];

      map.remove();
      mapInstance.current = null;
    };
  }, []);

  useEffect(() => {
    if (!mapInstance.current) return;

    mapInstance.current.flyTo({
      center: [longitude, latitude],
      zoom: 11,
      essential: true,
    });
  }, [latitude, longitude]);

  useEffect(() => {
    if (!mapInstance.current) return;

    hotelMarkers.current.forEach((marker) => marker.remove());
    hotelMarkers.current = [];

    if (hotels) {
      hotels.forEach((hotel) => {
        const isSelected = selectedHotel?.id === hotel.id;

        const marker = new maptilersdk.Marker({
          color: isSelected ? "#22C55E" : "#3FB1CE",
        })
          .setLngLat([hotel.longitude, hotel.latitude])
          .addTo(mapInstance.current!);

        marker.getElement().style.cursor = "pointer";

        if (isSelected) {
          marker.getElement().style.transform = "scale(1.4)";
          marker.getElement().style.zIndex = "10";
        }

        marker.getElement().addEventListener("click", () => {
          onHotelSelect?.(hotel);
        });

        hotelMarkers.current.push(marker);
      });
    }
  }, [hotels, selectedHotel, onHotelSelect]);

  useEffect(() => {
    if (!mapInstance.current) return;

    pointMarkers.current.forEach((marker) => marker.remove());
    pointMarkers.current = [];

    if (markerPoints) {
      markerPoints.forEach(([lat, lng]) => {
        const el = document.createElement("div");
        el.innerHTML = renderToString(
          <FaMapMarkerAlt size={32} color="#3FB1CE" />
        );
        el.style.cursor = "pointer";

        const marker = new maptilersdk.Marker({
          element: el,
        })
          .setLngLat([lng, lat])
          .addTo(mapInstance.current!);

        pointMarkers.current.push(marker);
      });
    }
  }, [markerPoints]);

  useEffect(() => {
    if (!mapInstance.current || !selectedHotel) return;

    mapInstance.current.flyTo({
      center: [selectedHotel.longitude, selectedHotel.latitude],
      zoom: 14,
      essential: true,
    });
  }, [selectedHotel]);

  return (
    <div className="h-full w-full">
      <div ref={mapContainer} className="h-full w-full" />
    </div>
  );
};

export default Map;