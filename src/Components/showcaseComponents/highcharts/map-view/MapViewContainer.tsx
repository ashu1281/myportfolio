import React, { useState } from "react";
import { Box, Tabs, Tab } from "@mui/material";
import GlobeView from "./GlobeView";
import MapView from "./MapView";
import PublicIcon from "@mui/icons-material/Public";
import MapIcon from "@mui/icons-material/Map";
import MapViewCarousel from "./MapViewCarousel";

const MapViewContainer: React.FC = () => {
    const [tab, setTab] = useState(0);

    return (
        <Box
            sx={{
                width: "100%",
                background: "#070C1B",
                position: "relative",
                overflow: "hidden",
            }}
        >
            <Tabs
                value={tab}
                onChange={(_, newValue) => setTab(newValue)}
                sx={{
                    position: "absolute",
                    top: 10,
                    left: 10,
                    zIndex: 20,
                    background: "rgba(10,15,30,0.8)",
                    borderRadius: "10px",
                    minHeight: "36px",
                    backdropFilter: "blur(6px)",
                }}
                TabIndicatorProps={{
                    style: {
                        backgroundColor: "#067FBA",
                        height: "3px",
                    },
                }}
            >
                <Tab
                    icon={<PublicIcon fontSize="small" />}
                    iconPosition="start"
                    label="3D Globe View"
                    sx={{
                        color: "#9FB3C8",
                        fontSize: "13px",
                        minHeight: "36px",
                        "&.Mui-selected": { color: "#ffffff" },
                         maxWidth: { xs: '100px', sm: "auto" }
                    }}
                />

                <Tab
                    icon={<MapIcon fontSize="small" />}
                    iconPosition="start"
                    label="2D Map View"
                    sx={{
                        color: "#9FB3C8",
                        fontSize: "13px",
                        minHeight: "36px",
                        "&.Mui-selected": { color: "#ffffff" },
                        maxWidth: { xs: '100px', sm: "auto" }
                    }}
                />
            </Tabs>

            <Box
                sx={{
                    height: "100%",
                    width: "100%",
                    display: tab === 0 ? "block" : "none",
                }}
            >
                <GlobeView tab={tab} />
            </Box>

            <Box
                sx={{
                    height: "100%",
                    width: "100%",
                    display: tab === 1 ? "block" : "none",
                }}
            >
                <MapView />
            </Box>

            {/* Carousel */}
            <Box
                sx={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    width: "100%",
                    minHeight: { xs: "170px", md: "190px" },
                    zIndex: 20
                }}
            >
                <MapViewCarousel />
            </Box>
        </Box>
    );
};

export default MapViewContainer;