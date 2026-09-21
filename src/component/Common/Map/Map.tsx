import React, { useEffect, useRef } from "react";
import * as maptilersdk from "@maptiler/sdk";
import "@maptiler/sdk/dist/maptiler-sdk.css";
import type { IMapMarkerPoint } from "./IMap";
import type IMap from "./IMap";
import { renderToString } from "react-dom/server";
import { FaMapMarkerAlt } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { MdOutlineLocalParking } from "react-icons/md";
import { FaCity } from "react-icons/fa6";
import { GiVillage } from "react-icons/gi";

const Map: React.FC<IMap> = ({
  latitude,
  longitude,
  hotels,
  selectedHotel,
  onHotelSelect,
  markerPoints,
  places,
  selectedPlace,
  onPlaceSelect,
}) => {
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const mapInstance = useRef<maptilersdk.Map | null>(null);
  const hotelMarkers = useRef<maptilersdk.Marker[]>([]);
  const pointMarkers = useRef<maptilersdk.Marker[]>([]);
  const placeMarkers = useRef<maptilersdk.Marker[]>([]);

  const createPointMarkerElement = (point: IMapMarkerPoint) => {
    const markerLabel = point.markerLabel || ""

    const markerContent = (markerLabel: string | undefined , markerDescription?: string | undefined) => {
      console.log(markerLabel);
      switch (markerLabel) {
        case "Town":
          return (
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#212529] text-xs shadow-lg text-[#fff]" title={markerDescription}>
              <FaCity size={18} />
            </div>
          )
        case "Village":
          return (
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#212529] text-xs shadow-lg text-[#fff]" title={markerDescription}>
              <GiVillage size={18} />
            </div>
          )
        default:
          return point.markerType === "location" ? (
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#212529] text-xs shadow-lg text-[#fff]">
              <FaLocationDot size={18} />
            </div>
          ) : (
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#212529] text-xs shadow-lg text-[#fff]">
              <MdOutlineLocalParking size={22} />
            </div>
          );
      }
    };

    const el = document.createElement("div");
    el.innerHTML = renderToString(
      <>
        {markerContent(markerLabel, point.markerDescription)}
      </>
    );
    el.style.cursor = "pointer";
    return el;
  };

  const createPlaceMarkerElement = (isSelected: boolean) => {
    const el = document.createElement("div");
    el.innerHTML = renderToString(
      <div
        className={`flex items-center justify-center rounded-full border-2 border-white text-white shadow-lg transition-all duration-200 ${isSelected
          ? "h-12 w-12 bg-amber-400 shadow-amber-400/35 ring-4 ring-amber-300/20"
          : "h-10 w-10 bg-sky-500 shadow-sky-500/35 ring-4 ring-sky-500/15"
          }`}
      >
        {isSelected ? <FaLocationDot size={20} /> : <FaMapMarkerAlt size={18} />}
      </div>
    );
    el.style.cursor = "pointer";
    return el;
  };

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
      center: [longitude || 0, latitude || 0],
      zoom: 11,
    });

    mapInstance.current = map;

    const resizeObserver = new ResizeObserver(() => {
      map.resize();
    });

    resizeObserver.observe(mapContainer.current);

    return () => {
      resizeObserver.disconnect();

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

    mapInstance.current.resize();
    mapInstance.current.flyTo({
      center: [longitude || 0, latitude || 0],
      zoom: 11,
      essential: true,
    });
  }, [latitude, longitude]);

  useEffect(() => {
    if (!mapInstance.current) return;

    hotelMarkers.current.forEach((marker) => marker.remove());
    placeMarkers.current.forEach((marker) => {
      marker.remove();
    });
    hotelMarkers.current = [];
    placeMarkers.current = [];
    if (hotels) {
      hotels.forEach((hotel) => {
        const isSelected = selectedHotel?.id === hotel.id;

        const marker = new maptilersdk.Marker({
          color: isSelected
            ? "#FACC15"
            : "#3FB1CE",
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
      markerPoints.forEach((point) => {
        const el = createPointMarkerElement(point);

        const marker = new maptilersdk.Marker({
          element: el,
        })
          .setLngLat([point.longitude, point.latitude])
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

  useEffect(() => {
    if (!mapInstance.current) return;

    placeMarkers.current.forEach((marker) => {
      marker.remove();
    });

    placeMarkers.current = [];

    if (!places) return;

    places.forEach((place) => {
      const isSelected =
        selectedPlace?.id === place.id;

      const marker = new maptilersdk.Marker({
        element: createPlaceMarkerElement(isSelected),
      })
        .setLngLat([
          place.longitude,
          place.latitude,
        ])
        .addTo(mapInstance.current!);

      marker.getElement().style.cursor = "pointer";

      if (isSelected) {
        marker.getElement().style.zIndex = "10";
      }

      marker.getElement().addEventListener("click", () => {
        onPlaceSelect?.(place);
      });

      placeMarkers.current.push(marker);
    });
  }, [places, selectedPlace, onPlaceSelect]);
  useEffect(() => {
    if (!mapInstance.current || !selectedPlace) return;

    mapInstance.current.flyTo({
      center: [
        selectedPlace.longitude,
        selectedPlace.latitude,
      ],
      zoom: 14,
      essential: true,
    });
  }, [selectedPlace]);
  return (
    <div className="h-full w-full">
      <div ref={mapContainer} className="h-full w-full" />
    </div>
  );
};

export default Map;