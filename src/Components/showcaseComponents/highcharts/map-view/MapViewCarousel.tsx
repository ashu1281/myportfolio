import React, { useEffect, useRef, useState } from "react";
import { Box, Typography } from "@mui/material";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import IconButtonWithImage from "../../../ui/IconButtonWithImage";

const CARD_WIDTH = 420;
const GAP = 20;

const cardStyle = {
    minWidth: `${CARD_WIDTH}px`,
    height: "150px",
    borderRadius: "6px",
    border: "2px solid",
    borderImageSource:
        "linear-gradient(180deg, rgba(11,153,156,0.5) 0%, rgba(0,98,221,0.5) 100%)",
    background: "#00000033",
    backdropFilter: "blur(20px)",
    flexShrink: 0,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    padding: "18px"
};

const portfolioStats = [
    {
        title: "Data Visualization",
        value: "25+ Charts",
        description: "Interactive analytics dashboards using Highcharts & AmCharts"
    },
    {
        title: "Full-Stack Experience",
        value: "3+ Years",
        description: "Building scalable SPA dashboards with React.js and Spring Boot"
    },
    {
        title: "Created Reusable UI Architecture",
        value: "40+ Components",
        description: "Material-UI component library improving development speed"
    },
    {
        title: "Performance Optimization",
        value: "40% Faster",
        description: "Reduced rendering cost using memoization and efficient state design"
    },
    {
        title: "Production Systems",
        value: "Enterprise Ready",
        description: "Designed scalable systems used in real-world deployments"
    },
    {
        title: "Performance Engineering",
        value: "Optimized UI",
        description: "Reduced re-renders using memoization and efficient state patterns"
    },
    {
        title: "Geospatial Analytics",
        value: "Interactive Map",
        description: "Highcharts map dashboards for solar plant performance monitoring"
    },
    {
        title: "Map Visualizations",
        value: "Highcharts + GIS",
        description: "Interactive geospatial dashboards and analytics maps"
    },
];

const MapViewCarousel: React.FC = () => {
    const carouselRef = useRef<HTMLDivElement | null>(null);
    const [isHovered, setIsHovered] = useState(false);
    const [pauseAutoScroll, setPauseAutoScroll] = useState(false);

    // Auto infinite scroll
    useEffect(() => {
        const el = carouselRef.current;
        if (!el) return;

        const interval = setInterval(() => {
            if (!isHovered && !pauseAutoScroll) {
                el.scrollBy({ left: 1 });

                const scrollValue = CARD_WIDTH + GAP;

                if (el.scrollLeft >= scrollValue) {
                    const first = el.firstElementChild;
                    if (first) el.appendChild(first);
                    el.scrollLeft -= scrollValue;
                }
            }
        }, 20);

        return () => clearInterval(interval);
    }, [isHovered, pauseAutoScroll]);

    const scrollRight = () => {
        const el = carouselRef.current;
        if (!el) return;

        setPauseAutoScroll(true);
        const scrollValue = CARD_WIDTH + GAP;

        el.scrollBy({ left: scrollValue, behavior: "smooth" });

        setTimeout(() => {
            const first = el.firstElementChild;
            if (first) el.appendChild(first);
            el.scrollLeft -= scrollValue;
            setPauseAutoScroll(false);
        }, 400);
    };

    const scrollLeft = () => {
        const el = carouselRef.current;
        if (!el) return;

        setPauseAutoScroll(true);
        const scrollValue = CARD_WIDTH + GAP;

        const last = el.lastElementChild;
        if (last) el.prepend(last);

        el.scrollLeft += scrollValue;

        el.scrollBy({ left: -scrollValue, behavior: "smooth" });

        setTimeout(() => setPauseAutoScroll(false), 400);
    };

    return (
        <Box sx={{ display: "flex", alignItems: "center", width: "100%" }}>

            {/* Left Fade */}
            <Box
                sx={{
                    position: "absolute",
                    left: -5,
                    height: "100%",
                    width: "60px",
                    pointerEvents: "none",
                    background:
                        "linear-gradient(90deg,#020203 20%,rgba(1,2,2,0) 100%)",
                    zIndex: 3
                }}
            />

            {/* Right Fade */}
            <Box
                sx={{
                    position: "absolute",
                    right: -5,
                    height: "100%",
                    width: "60px",
                    pointerEvents: "none",
                    background:
                        "linear-gradient(270deg,#020203 20%,rgba(1,2,2,0) 100%)",
                    zIndex: 3
                }}
            />

            {/* LEFT BUTTON */}
            <Box sx={{
                position: 'absolute',
                left: 21,
                top: 'calc(50% - 16px)',
                zIndex: 4
            }}>
                <IconButtonWithImage
                    onClick={scrollLeft}
                    icon={<ChevronLeft sx={{ color: "white", fontSize: 32 }} />}
                    src=""
                    alt="Previous"
                    btnWidth="56px"
                    btnHeight="56px"
                    btnRadius="100px"
                    bgColor="#4785FF33 !important"
                    sx={{
                        border: "1px solid #98BBFF1A",
                        backdropFilter: "blur(4px)"
                    }}
                />
            </Box>

            {/* RIGHT BUTTON */}
            <Box sx={{
                position: 'absolute',
                right: 21,
                top: 'calc(50% - 16px)',
                zIndex: 4
            }}>
                <IconButtonWithImage
                    onClick={scrollRight}
                    icon={<ChevronRight sx={{ color: "white", fontSize: 32 }} />}
                    src=""
                    alt="Next"
                    btnWidth="56px"
                    btnHeight="56px"
                    btnRadius="100px"
                    bgColor="#4785FF33 !important"
                    sx={{
                        border: "1px solid #98BBFF1A",
                        backdropFilter: "blur(4px)"
                    }}
                />
            </Box>

            {/* Carousel */}
            <Box
                ref={carouselRef}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                sx={{
                    display: "flex",
                    gap: `${GAP}px`,
                    overflow: "hidden",
                    flex: 1,
                    paddingTop: "32px"
                }}
            >
                {portfolioStats.map((item, index) => (
                    <Box key={index} sx={cardStyle}>
                        <Typography variant="body2" sx={{ color: "#7FAEFF" }}>
                            {item.title}
                        </Typography>

                        <Typography
                            sx={{
                                fontSize: "22px",
                                fontWeight: 600,
                                color: "white",
                                marginTop: "4px"
                            }}
                        >
                            {item.value}
                        </Typography>

                        <Typography
                            sx={{
                                fontSize: "12px",
                                color: "#9FB3C8",
                                marginTop: "6px"
                            }}
                        >
                            {item.description}
                        </Typography>
                    </Box>
                ))}
            </Box>
        </Box>
    );
};

export default MapViewCarousel;