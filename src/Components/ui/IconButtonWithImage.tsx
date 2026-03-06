import React from "react";
import { IconButton, Tooltip } from "@mui/material";

interface IconButtonWithImageProps {
  src: string;
  icon?: React.ReactNode;
  alt?: string;
  size?: number;
  tooltipText?: string | null;
  onClick?: () => any;
  bgColor?: string;
  hoverBgColor?: string;
  disabled?:boolean
  btnWidth?:string;
  btnHeight?:string;
  btnRadius?:string;
  sx?: any;
}

const IconButtonWithImage: React.FC<IconButtonWithImageProps> = ({
  src,
  icon,
  alt = "icon",
  size = 24,
  tooltipText,
  onClick,
  bgColor,
  hoverBgColor,
  disabled = false,
  btnWidth,
  btnHeight,
  btnRadius = "8px",
  sx
}) => {
  const Content = (
    <IconButton
      disabled={disabled}
      onClick={onClick}
      sx={{
        bgcolor: bgColor,
        borderRadius: btnRadius,
        padding: "4px",
        opacity: disabled ? 0.5 : 1,
        width: btnWidth,
        height: btnHeight,
        cursor: disabled ? 'default' : 'pointer',
        "&:hover": { bgcolor: hoverBgColor },
        ...sx
      }}
    >
      {icon ?? <img src={src} alt={alt} style={{ width: size, height: size }} />}
    </IconButton>
  );

  return tooltipText ? <Tooltip title={tooltipText}>{Content}</Tooltip> : Content;
};

export default IconButtonWithImage;
