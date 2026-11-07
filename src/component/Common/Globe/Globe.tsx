import React, { useMemo, useState } from "react";
import type IGlobe from "./IGlobe";
import { Canvas } from '@react-three/fiber';
import { useEffect } from "react";
import * as THREE from 'three';
import ThreeGlobe from 'three-globe';
import { OrbitControls } from "@react-three/drei/core/OrbitControls";
import { Html } from "@react-three/drei";
import { CiLocationOn } from "react-icons/ci";

const GLOBE_SCALE = 0.02;

const isState = (d: object) => (d as { kind?: string }).kind === 'state';

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
            .polygonCapColor(() => 'rgba(0,0,0,0)')
            .polygonSideColor(() => 'rgba(0,0,0,0)')
            .polygonStrokeColor((d) => (isState(d) ? 'rgba(148,163,184,0.35)' : 'rgba(255,255,255,0.8)'))
            .polygonAltitude((d) => (isState(d) ? 0.004 : 0.006))
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

        Promise.all([
            fetch('/countries.geojson').then((res) => res.json()),
            fetch('/states.geojson').then((res) => res.json()),
        ]).then(([countries, states]) => {
            if (cancelled) return;
            const tag = (features: object[], kind: string) =>
                features.map((f) => ({ ...f, kind }));
            globe.hexPolygonsData(countries.features);
            globe.polygonsData([...tag(states.features, 'state'), ...tag(countries.features, 'country')]);
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

const Globe: React.FC<IGlobe> = ({ places, type }) => {
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
        <section className="relative h-[calc(100vh-56px)] min-h-[420px] w-full overflow-hidden bg-zinc-950 sm:min-h-[500px]">
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
                                <span className="absolute bottom-full mb-2 whitespace-nowrap rounded-md border border-zinc-700 bg-zinc-900/90 px-2 py-1 text-[10px] font-semibold uppercase tracking-wider text-zinc-100 opacity-0 shadow-md shadow-black/30 transition-opacity group-hover:opacity-100">
                                    {place.placeName}
                                </span>
                                <button
                                    type="button"
                                    aria-label={place.placeName}
                                    className="relative flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border-2 border-white bg-violet-500 text-white shadow-lg shadow-black/40 transition hover:scale-125 hover:bg-violet-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-300 active:scale-95"
                                >
                                    <span className="absolute inset-0 animate-ping rounded-full bg-violet-400/40" />
                                    <CiLocationOn className="relative" size={20} />
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