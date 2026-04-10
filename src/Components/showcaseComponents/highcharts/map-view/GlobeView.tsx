import { Box } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import Globe from "react-globe.gl";

const projectData = [
    { name: "Mumbai – Fintech Dashboard", lat: 19.076, lon: 72.8777, z: 25, liability: true },
    { name: "Pune – AI Analytics Platform", lat: 18.5204, lon: 73.8567, z: 8, liability: false },
    { name: "Bangalore – Cloud Infrastructure", lat: 12.9716, lon: 77.5946, z: 15, liability: true },
    { name: "Hyderabad – Data Engineering", lat: 17.385, lon: 78.4867, z: 10, liability: false },
    { name: "Chennai – Enterprise Integrations", lat: 13.0827, lon: 80.2707, z: 16, liability: true },
    { name: "Delhi – Government Data Platform", lat: 28.6139, lon: 77.209, z: 10, liability: false }
];
const globeLabels = projectData.map(p => ({
    lat: p.lat,
    lng: p.lon,
    name: p.name.split(" – ")[0],
    value: p.z,
    liability: p.liability
}));

const MapView: React.FC<{ tab: number }> = ({ tab }) => {
    const [size, setSize] = useState({ width: 800, height: 600 });
    const globeRef = useRef<any>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    // ================= RESPONSIVE SIZE =================
    useEffect(() => {
        const handleResize = () => {
            if (!containerRef.current) return;

            setSize({
                width: containerRef.current.offsetWidth,
                height: containerRef.current.offsetHeight
            });
        };

        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => {
        if (!globeRef.current) return;

        if (tab !== 0) return;

        const globe = globeRef.current;
        const controls = globe.controls();

        globe.pointOfView(
            {
                lat: 10,
                lng: 50,
                altitude: 2.0,
            },
            0
        );

        controls.autoRotate = true;
        controls.autoRotateSpeed = 1.2;

        controls.enableZoom = true;
        controls.enablePan = true;

        controls.zoomSpeed = 0.6;
        controls.rotateSpeed = 0.6;

        controls.minDistance = 80;
        controls.maxDistance = 600;

        globe.pointOfView(
            {
                lat: 20,
                lng: 78,
                altitude: 1.5,
            },
            900
        );

        const t = setTimeout(() => {
            controls.autoRotateSpeed = 0.2;
        }, 900);

        const t2 = setTimeout(() => {
            controls.autoRotate = false;
        }, 1300);

        return () => {
            clearTimeout(t);
            clearTimeout(t2);
        };

    }, [tab]);
    return (
        <Box
            ref={containerRef}
            sx={{
                height: { xs: "80vh", md: "95vh" },
                width: "100%",
                background: "#070C1B",
                position: "relative",
                overflow: "hidden",
            }}
        >
            <Box
                sx={{
                    position: "absolute",
                    top: {xs: 80, sm: 12},
                    right: 20,
                    fontSize: "11px",
                    color: "#9FB3C8",
                    zIndex: 20,
                    opacity: 0.85,
                    textAlign: "right",
                    lineHeight: 1.4
                }}
            >
                Globe ©{" "}
                <a
                    href="https://github.com/vasturiano/react-globe.gl"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: "#9FB3C8" }}
                >
                    react-globe.gl
                </a>{" "}
                (Three.js) <br /> 
                and Tiles ©{" "}
                <a
                    href="https://www.esri.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: "#9FB3C8" }}
                >
                    Esri
                </a>
            </Box>


            <Globe
                ref={globeRef}
                width={size.width}
                height={size.height}

                globeTileEngineUrl={(x, y, l) => {
                    return `https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/${l}/${y}/${x}`;
                }}

                backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"

                atmosphereColor="#3a88ff"
                atmosphereAltitude={0.25}

                pointsData={projectData.map(p => ({
                    lat: p.lat,
                    lng: p.lon,
                    size: p.z,
                    liability: p.liability
                }))}
                pointAltitude={(d: any) => d.size / 120}
                pointRadius={(d: any) => d.size / 250}
                pointColor={(d: any) =>
                    d.liability ? "#4D8DFF" : "#FF6B6B"
                }

                labelsData={globeLabels}
                labelLat="lat"
                labelLng="lng"
                labelText={(d: any) => `${d.name}  ${d.value}`}
                labelSize={0.8}
                labelDotRadius={0.18}
                labelColor={(d: any) =>
                    d.liability ? "#6EA8FF" : "#FF9B9B"
                }
                labelAltitude={0.05}
                labelsTransitionDuration={300}
            />

        </Box>
    );
};

export default MapView;