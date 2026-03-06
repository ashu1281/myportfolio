import React, { useEffect, useRef, useState } from "react";
import Highcharts from "highcharts/highmaps";
import "highcharts/modules/tiledwebmap";
import "highcharts/modules/marker-clusters";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import MapViewCarousel from "./MapViewCarousel";
import { Box } from "@mui/material";

const customStyles: React.CSSProperties = {
    backgroundColor: "#010202",
    zIndex: 1,
    backgroundImage: `
    radial-gradient(4px 4px at 20px 30px, #386863, transparent),
    url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200' viewBox='0 0 200 200'%3E%3Cpath d='M100 94L101 99L106 100L101 101L100 106L99 101L94 100L99 99L100 94Z' fill='%235787BE'/%3E%3C/svg%3E"),
    url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200' viewBox='0 0 200 200'%3E%3Cpath d='M100 94L101 99L106 100L101 101L100 106L99 101L94 100L99 99L100 94Z' fill='%236D4545'/%3E%3C/svg%3E")
  `,
    backgroundRepeat: "repeat, repeat, repeat",
    backgroundSize: "200px 200px, 200px 200px, 200px 200px",
    backgroundPosition: `
    0 0,
    70px 30px,
    160px 100px
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

    useEffect(() => {
        if (!chartRef.current) return;

        const projectData = [
            { name: "Mumbai – Fintech Dashboard", lat: 19.076, lon: 72.8777, count: 12 },
            { name: "Pune – AI Analytics Platform", lat: 18.5204, lon: 73.8567, count: 8 },
            { name: "Bangalore – Cloud Infrastructure", lat: 12.9716, lon: 77.5946, count: 15 },
            { name: "Hyderabad – Data Engineering", lat: 17.385, lon: 78.4867, count: 10 },
            { name: "Chennai – Enterprise Integrations", lat: 13.0827, lon: 80.2707, count: 6 },
            { name: "Delhi – Government Data Platform", lat: 28.6139, lon: 77.209, count: 9 }
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

                {
                    type: "mapbubble",
                    data: projectData.map((p) => ({
                        name: p.name,
                        lat: p.lat,
                        lon: p.lon,
                        z: p.count
                    })),
                    minSize: 20,
                    maxSize: "8%",
                    sizeBy: "area",
                    marker: {
                        fillColor: "rgba(0,150,255,0.85)",
                        lineWidth: 0
                    },

                    dataLabels: {
                        enabled: true,
                        format: "{point.name}",
                        style: {
                            color: "#ffffff",
                            fontSize: "14px",
                            fontWeight: "600",
                            textOutline: "none"
                        }
                    }
                }
            ],

            credits: {
                enabled: true,
            },

            legend: { enabled: false }
        });

        const chart = chartInstance.current;

        Highcharts.addEvent(chart.mapView as any, "afterSetView", function () {
            const zoom = chart.mapView?.zoom || 1;

            const pointSeries = chart.series.find((s: any) => s.type === "mapbubble");

            if (pointSeries) {
                pointSeries.points.forEach((point: any) => {
                    const count = point.options.z || 1;
                    const baseSize = 8 + Math.log(count) * 2;
                    const zoomFactor = zoom * 1.5;

                    const finalRadius = baseSize + zoomFactor;

                    point.graphic?.attr({
                        r: finalRadius
                    });
                });
            }
        });
    }, []);

    return (
        <Box
            sx={{
                height: { xs: "70vh", md: "80vh" },
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
                    display:{xs:'none', md:"flex"},
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
                    right: { xs: "50%", md: "15%" },
                    transform: { xs: "translateX(50%)", md: "none" },
                    top: 0,
                    width: { xs: "95%", md: "70%" },
                    height: "100%",
                    aspectRatio: "1 / 1",
                    borderRadius:  { xs: "5%", md: "50%" },
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
                        height: { xs: "60vh", md: `${screenHeight - 100}px` }
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