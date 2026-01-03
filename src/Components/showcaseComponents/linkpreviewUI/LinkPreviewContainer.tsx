import React, { useEffect, useState } from "react";
import Skeleton from "@mui/material/Skeleton";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import SecureLinkPreviewComponent from "./SecureLinkPreviewComponent";

interface LinkPreviewContainerProps {
  url: string;
  width?: string;
  height?: string;
  showPreviewNotAvlUI?: boolean;
}

export interface APIResponse {
  title: string | null;
  description: string | null;
  image: string | null;
  siteName: string | null;
  hostname: string | null;
}

/* Mock API Response */
const Response: APIResponse = {
  title: "Ashish Gaikwad | Full-Stack Software Engineer",
  description:
    "Portfolio of Ashish Gaikwad – full-stack developer with expertise in React, Spring Boot, and building production-ready web applications.",
  image: "https://ashishgaikwad.in/portfolio.png",
  siteName: "Ashish Gaikwad",
  hostname: "ashishgaikwad.in",
};

const LinkPreviewContainer: React.FC<LinkPreviewContainerProps> = ({
  url,
  width = "550px",
  height = "162px",
  showPreviewNotAvlUI = false,
}) => {
  const [metaData, setMetaData] = useState<APIResponse | null>(null);

  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  useEffect(() => {
    const fetchPreview = async () => {
      // Simulated API delay send url to server and fetch metadata for link
      setTimeout(() => {
        setMetaData(Response);
      }, 3000);
    };

    fetchPreview();
  }, [url]);

  /* Skeleton Loader */
  const customSkeleton = (
    <Box
      sx={{
        width: "100%",
        mt: 1,
        borderRadius: "7px",
        border: isDark ? "1px solid #1e293b" : "1px solid #e5e7eb",
      }}
    >
      <Box sx={{ width: "100%", height }}>
        <Skeleton
          variant="rounded"
          sx={{ height: "100%", width: "100%" }}
        />
      </Box>
      <Box sx={{ p: 1.5 }}>
        <Skeleton variant="rounded" height={12} />
        <Skeleton variant="rounded" height={12} sx={{ mt: 1 }} />
      </Box>
    </Box>
  );

  if (metaData === null) {
    return <Box sx={{ width }}>{customSkeleton}</Box>;
  }

  const isValidPreview =
    metaData.title !== null &&
    metaData.image !== null &&
    metaData.hostname !== null;

  if (!isValidPreview) {
    return (
      <Box sx={{ width }}>
        <SecureLinkPreviewComponent
          url={url}
          data={metaData}
          showPreviewNotAvlUI={showPreviewNotAvlUI}
        />
      </Box>
    );
  }

  return (
    <Box sx={{ width, mt: 1 }}>
      {/* Visible URL */}
      <Box
        component="a"
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        sx={{
          display: "inline-block",
          mb: 0.5,
          fontSize: "14px",
          color: isDark ? "#38bdf8" : "#2563eb",
          textDecoration: "underline",
          maxWidth: "100%",
          overflow: "hidden",
          whiteSpace: "nowrap",
          textOverflow: "ellipsis",
        }}
      >
        {url}
      </Box>
      {/* Preview Card */}
      <Card
        sx={{
          borderRadius: "6px",
          cursor: "pointer",
          width: "100%",
          boxShadow: "none",
          backgroundColor: isDark ? "#0f1720" : "#ffffff",
          border: isDark ? "1px solid #1e293b" : "1px solid #e5e7eb",
        }}
        onClick={() => window.open(url, "_blank", "noopener,noreferrer")}
      >
        <CardContent sx={{ p: "0 !important" }}>
          {/* IMAGE */}
          <CardMedia
            component="img"
            height={height}
            image={metaData.image!}
            alt="Preview"
            sx={{
              objectFit: "cover",
              borderRadius: "6px 6px 0 0",
            }}
          />

          {/* TEXT CONTENT */}
          <Box
            sx={{
              backgroundColor: isDark ? "#151725" : "#f5f5f5",
              p: 1.5,
              borderRadius: "0 0 6px 6px",
              display: "flex",
              flexDirection: "column",
              gap: "4px",
            }}
          >
            {/* Title */}
            <Typography
              sx={{
                fontSize: "15px",
                fontWeight: 600,
                color: isDark ? "#ffffff" : "#1a1a1a",
                lineHeight: 1.3,
                overflow: "hidden",
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
              }}
            >
              {metaData.title}
            </Typography>

            {/* Description */}
            {metaData.description && (
              <Typography
                sx={{
                  fontSize: "13px",
                  fontWeight: 400,
                  color: isDark ? "#cbd5e1" : "#555",
                  lineHeight: 1.4,
                  overflow: "hidden",
                  display: "-webkit-box",
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: "vertical",
                }}
              >
                {metaData.description}
              </Typography>
            )}

            {/* Hostname */}
            <Typography
              sx={{
                fontSize: "12px",
                fontWeight: 500,
                color: isDark ? "#94a3b8" : "#6b7280",
                mt: "2px",
              }}
            >
              {metaData?.siteName ? metaData?.siteName + " . " : ''}
              {metaData.hostname}
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default LinkPreviewContainer;
