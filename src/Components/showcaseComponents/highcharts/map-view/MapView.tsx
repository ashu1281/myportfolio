import React, { useEffect, useRef, useState } from "react";
import Highcharts from "highcharts/highmaps";
import "highcharts/modules/tiledwebmap";
import "highcharts/modules/marker-clusters";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import MapViewCarousel from "./MapViewCarousel";
import { Box } from "@mui/material";

export const customStyles: React.CSSProperties = {
    backgroundColor: "#010202",
    zIndex: 1,
    backgroundImage: `
                    radial-gradient(4px 4px at 20px 30px, #386863, transparent),
                    url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='220' height='220' viewBox='0 0 200 200'%3E%3Cpath d='M100 94L101 99L106 100L101 101L100 106L99 101L94 100L99 99L100 94Z' fill='%235787BE'%3E%3Canimate attributeName='opacity' values='0.3;1;0.3' dur='2s' repeatCount='indefinite'/%3E%3C/path%3E%3C/svg%3E"),
                    url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='220' height='220' viewBox='0 0 200 200'%3E%3Cpath d='M100 94L101 99L106 100L101 101L100 106L99 101L94 100L99 99L100 94Z' fill='%236D4545'%3E%3Canimate attributeName='opacity' values='1;0.3;1' dur='2s' repeatCount='indefinite'/%3E%3C/path%3E%3C/svg%3E")
                    `,
    backgroundRepeat: "repeat, repeat, repeat",
    backgroundSize: "220px 220px, 220px 220px, 220px 220px",
    backgroundPosition: `
    0 0,
    70px 30px,
    210px 180px
  `
};

const MapView: React.FC = () => {
    const chartRef = useRef<HTMLDivElement>(null);
    const chartInstance = useRef<any>(null);
    const [screenHeight, setScreenHeight] = useState(800);

    const resetZoom = () => {
        const chart = chartInstance.current;
        if (!chart) return;

        chart.mapView?.setView([78, 18], 4.6);
    };

    useEffect(() => {
        const handleResize = () => {
            setScreenHeight(window.innerHeight);
        };

        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    /* ---------- ZOOM HELPER ---------- */
    const zoomToPoint = (
        chart: Highcharts.Chart,
        lat: number,
        lon: number,
        zoom: number
    ) => {
        (chart as any).mapView?.setView([lon, lat], zoom, true);
    };
    /* ---------- LABEL FORMATTER ---------- */

    const bubbleLabelFormatter = function (
        this: Highcharts.Point
    ) {
        const p = this as Highcharts.Point & { z: number };
        const r = ((p as any).marker?.radius || 40) * 1.8;

        return `
            <div style="text-align:center;font-family:Orbitron;margin-top:${r}px">
            <div style="
                color:#FFFFFF;
                font-size:16px;
                font-weight:600;
                margin-bottom:4px;
            ">
                ${p.name}
            </div>

            <div style="
                display:inline-block;
                padding:2px 8px;
                border-radius:4px;
                background: linear-gradient(282.36deg, rgba(0, 12, 94, 0.8) 2.78%, rgba(33, 45, 132, 0.8) 95.34%);
                border:2px solid #090E5D;
                font-size:14px;
                font-weight:600;
                letter-spacing: 4%;
                line-height: 140%;
                color: #FFFFFF;
            ">
                ${p.z}
            </div>
            </div>
        `;
    };

    /* ---------- SERIES FACTORY ---------- */

    const createBubbleSeries = (
        id: string,
        data: any[],
        visible: boolean
    ): Highcharts.SeriesOptionsType => ({
        id,
        type: "mapbubble",
        visible,
        data,
        minSize: 0,
        maxSize: 80,
        cursor: 'pointer',
        animation: false,
        marker: {
            states: {
                hover: {
                    enabled: false,
                },
            }
        },
        dataLabels: {
            enabled: true,
            useHTML: true,
            align: "center",
            verticalAlign: "top",
            formatter: bubbleLabelFormatter
        },
        point: {
            events: {
                click: function () {
                    const p = this as any;
                    const chart = this.series.chart as any;

                    zoomToPoint(chart, p.lat, p.lon, 10);
                }
            }
        }
    });


    /* ---------- MARKER STYLE ---------- */

    const createBubbleMarker = (liability: boolean) => {
        const base = liability ? "57,124,255" : "195,117,117";
        const darkBase = liability ? "152,187,255" : "250,187,187";
        const ring = liability ? "166,173,255" : "255,191,166";

        return {
            lineWidth: 1,
            lineColor: `rgba(${ring},0.8)`,
            fillColor: {
                radialGradient: { cx: 0.5, cy: 0.5, r: 0.5 },
                stops: [
                    [0, `rgba(${darkBase},1)`],
                    [0.2, `rgba(${darkBase},1)`],
                    [0.21, `rgba(${base},1)`],
                    [0.7, `rgba(${base},1)`],
                    [0.71, `rgba(${base},0.15)`],
                    [1, `rgba(${base},0.15)`]
                ]
            }
        };
    };

    useEffect(() => {
        if (!chartRef.current) return;

        const projectData = [
            { name: "Mumbai – Fintech Dashboard", lat: 19.076, lon: 72.8777, z: 25, liability: true },
            { name: "Pune – AI Analytics Platform", lat: 18.5204, lon: 73.8567, z: 8, liability: false },
            { name: "Bangalore – Cloud Infrastructure", lat: 12.9716, lon: 77.5946, z: 15, liability: true },
            { name: "Hyderabad – Data Engineering", lat: 17.385, lon: 78.4867, z: 10, liability: false },
            { name: "Chennai – Enterprise Integrations", lat: 13.0827, lon: 80.2707, z: 16, liability: true },
            { name: "Delhi – Government Data Platform", lat: 28.6139, lon: 77.209, z: 10, liability: false }
        ];

        const bubblesData = [
            ...projectData.map((p) => ({
                ...p,
                marker: createBubbleMarker(p.liability)
            })),
            {
                name: "__dummy__",
                lat: 0,
                lon: 0,
                z: 0,
                color: "transparent",
                dataLabels: { enabled: false },
                enableMouseTracking: false
            }
        ];

        chartInstance.current = Highcharts.mapChart(chartRef.current, {
            chart: {
                backgroundColor: "transparent",
                margin: 0,
                spacing: [0, 0, 0, 0],
                panning: {
                    enabled: true,
                    type: "xy"
                }
            },

            title: { text: "" },

            tooltip: {
                pointFormat: "<b>{point.name}</b><br/>Projects Delivered: {point.z}"
            },

            mapNavigation: {
                enabled: true,
                enableMouseWheelZoom: true,
                enableDoubleClickZoom: true,
                enableTouchZoom: true
            },

            mapView: {
                center: [78, 18],
                zoom: 4.6,
                projection: { name: "WebMercator" },
                maxZoom: 19
            },

            series: [
                {
                    type: "tiledwebmap",
                    name: "Satellite",
                    provider: {
                        type: "Esri",
                        theme: "WorldImagery"
                    }
                },

                // {
                //     type: "tiledwebmap",
                //     name: "Labels",
                //     provider: {
                //         type: "Esri",
                //         theme: "WorldBoundariesAndPlaces",
                //     },
                //     opacity: 0.2
                // },

                createBubbleSeries("places", bubblesData, true),
            ],

            credits: {
                enabled: true,
            },

            legend: { enabled: false }
        });

    }, []);

    useEffect(() => {
        const el = chartRef.current;
        if (!el) return;

        const handleWheel = (e: WheelEvent) => {
            if (e.ctrlKey) {
                e.preventDefault(); // stops browser zoom
            }
        };

        el.addEventListener("wheel", handleWheel, { passive: false });

        return () => {
            el.removeEventListener("wheel", handleWheel);
        };
    }, []);
    return (
        <Box
            sx={{
                height: { xs: "80vh", md: "95vh" },
                width: "100%",
                background: "#070C1B",
                position: "relative",
                overflow: "hidden",
                ...customStyles
            }}
        >
            {/* Credits to Highcharts and Esri*/}
            <Box
                sx={{
                    position: "absolute",
                    top: 12,
                    right: 20,
                    fontSize: "11px",
                    color: "#9FB3C8",
                    zIndex: 10,
                    opacity: 0.85
                }}
            >
                Map data ©{" "}
                <a
                    href="https://www.esri.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: "#9FB3C8" }}
                >
                    Esri
                </a>{" "}
                | Visualization ©{" "}
                <a
                    href="https://www.highcharts.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: "#9FB3C8" }}
                >
                    Highcharts
                </a>
            </Box>

            {/* Reset Zoom Button */}
            <Box
                onClick={resetZoom}
                sx={{
                    position: "absolute",
                    display: { xs: 'none', md: "flex" },
                    top: 50,
                    right: 20,
                    width: 38,
                    height: 38,
                    borderRadius: "8px",
                    background: "rgba(8,15,30,0.85)",
                    border: "1px solid #067FBA",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    color: "white",
                    zIndex: 10,
                    boxShadow: "0 0 10px rgba(0,200,255,0.4)"
                }}
            >
                <RestartAltIcon fontSize="small" />
            </Box>

            {/* Globe container */}
            <Box
                sx={{
                    position: "absolute",
                    right: { xs: "50%", md: "10%" },
                    transform: { xs: "translateX(50%)", md: "none" },
                    top: 0,
                    width: { xs: "95%", md: "80%" },
                    height: "100%",
                    aspectRatio: "1 / 1",
                    borderRadius: { xs: "5%", md: "50%" },
                    overflow: "hidden",
                    border: "12px solid transparent",
                    outline: "2.85px solid #067FBA",
                    outlineOffset: "-5px",
                    boxShadow: "0 0 30px rgba(0,200,255,0.6)",
                    background: "black"
                }}
            >
                <Box
                    ref={chartRef}
                    sx={{
                        width: "100%",
                        height: { xs: "60vh", md: `${Math.min(screenHeight - 50, 700)}px` }
                    }}
                />
            </Box>

            {/* Carousel */}
            <Box
                sx={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    width: "100%",
                    minHeight: { xs: "170px", md: "190px" },
                    zIndex: 2
                }}
            >
                <MapViewCarousel />
            </Box>
        </Box>
    );
};

export default MapView;