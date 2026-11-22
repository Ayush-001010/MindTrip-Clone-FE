import React, { useMemo, useState } from "react";
import type IGlobe from "./IGlobe";
import { Canvas } from '@react-three/fiber';
import { useEffect } from "react";
import * as THREE from 'three';
import ThreeGlobe from 'three-globe';
import { OrbitControls } from "@react-three/drei/core/OrbitControls";
import { Html } from "@react-three/drei";
import { CiLocationOn } from "react-icons/ci";
import { FaLocationDot } from "react-icons/fa6";

const GLOBE_SCALE = 0.02;

const GlobeLayers: React.FC<{ globe: ThreeGlobe }> = ({ globe }) => {
    useEffect(() => {
        let cancelled = false;
        globe
            .showAtmosphere(true)
            .atmosphereColor('#3a228a')
            .atmosphereAltitude(0.25)
            .hexPolygonResolution(3)
            .hexPolygonMargin(0.7)
            .hexPolygonAltitude(0.008)
            .hexPolygonColor(() => 'rgba(255,255,255,0.7)')
            .arcsData([])
            .arcColor('color')
            .arcAltitude(0.3)
            .arcStroke(0.5)
            .arcDashLength(0.9)
            .arcDashGap(4)
            .arcDashAnimateTime(2000)
            .pointsData([])
            .pointColor(() => '#f97316')
            .pointAltitude(0.01)
            .pointRadius(0.8)
            .ringsData([])
            .ringColor(() => (t: number) => `rgba(249,115,22,${1 - t})`)
            .ringMaxRadius(5)
            .ringPropagationSpeed(3)
            .ringRepeatPeriod(1500);

        const material = globe.globeMaterial() as THREE.MeshPhongMaterial;
        material.color = new THREE.Color('#062056');
        material.emissive = new THREE.Color('#062056');
        material.emissiveIntensity = 0.1;
        material.shininess = 0.9;

        fetch('/countries.geojson').then((res) => res.json()).then((countries) => {
            if (cancelled) return;
            globe.hexPolygonsData(countries.features);
        });

        return () => {
            cancelled = true;
        };
    }, [globe]);

    return (
        <group scale={GLOBE_SCALE}>
            <primitive object={globe} />
        </group>
    );
};

const Globe: React.FC<IGlobe> = ({ places, type , onSelectPlace}) => {
    const globe = useMemo(() => new ThreeGlobe(), []);
    const [autoRotate, setAutoRotate] = useState(true);

    useEffect(() => {
        if (type === "place" && places.length > 0) {
            globe.pointsData(places.map(place => ({
                lat: place.latitude,
                lng: place.longitude,
                size: 0.5,
                icon: type === "place" ? CiLocationOn : undefined
            })));
        }
    }, [globe, places, type]);
    return (
        <section className="relative h-[calc(100vh-56px)] min-h-[420px] w-full overflow-hidden sm:min-h-[500px]">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(139,92,246,0.12),transparent_65%)]" />
            <p className="pointer-events-none absolute bottom-4 left-1/2 z-10 -translate-x-1/2 rounded-full border border-zinc-800 bg-zinc-900/80 px-4 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-zinc-400 shadow-md shadow-black/30 backdrop-blur">
                Drag to rotate · Scroll to zoom
            </p>
            <Canvas
                onPointerDown={() => setAutoRotate(false)}
                className="cursor-grab active:cursor-grabbing" camera={{ position: [0, 0, 6], fov: 45 }}>
                <ambientLight color="#38bdf8" intensity={0.6} />
                <directionalLight color="#ffffff" position={[-4, 3, 5]} intensity={1.2} />
                <primitive object={new THREE.PointLight(new THREE.Color('#a78bfa'), 20)} position={[-4, 2, 4]} />
                <GlobeLayers globe={globe} />
                {type === "place" && places.map((place) => {
                    const { x, y, z } = globe.getCoords(place.latitude, place.longitude, 0.02);
                    return (
                        <Html
                            key={`${place.placeName}-${place.latitude}-${place.longitude}`}
                            position={[x * GLOBE_SCALE, y * GLOBE_SCALE, z * GLOBE_SCALE]}
                            center
                            occlude
                            zIndexRange={[100, 0]}
                        >
                            <div className="group relative flex flex-col items-center">
                                <span className="pointer-events-none absolute bottom-full mb-2 max-w-48 truncate rounded-lg border border-[#003566] bg-[#000814]/95 px-3 py-1.5 text-xs font-semibold text-[#ffd60a] opacity-0 shadow-lg shadow-black/40 transition-opacity duration-200 group-hover:opacity-100 group-focus-within:opacity-100">
                                    {place.placeName}
                                </span>
                                <button
                                    type="button"
                                    onClick={() => onSelectPlace(place)}
                                    aria-label={place.placeName}
                                    className="relative flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-[#ffc300]/70 bg-[#000814] text-[#ffd60a] shadow-lg shadow-black/50 transition duration-200 hover:scale-110 hover:border-[#ffd60a] hover:bg-[#003566] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ffd60a] focus-visible:ring-offset-2 focus-visible:ring-offset-[#000814] active:scale-95 motion-reduce:transition-none"
                                >
                                    <span aria-hidden="true" className="pointer-events-none absolute inset-0 animate-ping rounded-full bg-[#ffc300]/20 motion-reduce:animate-none" />
                                    <FaLocationDot aria-hidden="true" className="relative" size={20} />
                                </button>
                            </div>
                        </Html>
                    );
                })}
                <OrbitControls
                    enablePan={false}
                    minDistance={3}
                    maxDistance={10}
                    autoRotate={autoRotate}
                    autoRotateSpeed={0.8}
                />
            </Canvas>
        </section>
    );
};

export default Globe;