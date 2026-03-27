import { Box, Stack, Typography } from "@mui/material";
import "../Styles/NavigationLg.css";

import HomeIcon from "@mui/icons-material/Home";
import MailIcon from "@mui/icons-material/Mail";
import PersonIcon from "@mui/icons-material/Person";
import PreviewIcon from "@mui/icons-material/Preview";
import WorkIcon from "@mui/icons-material/Work";

import { Link } from "react-scroll";

export const menuItems = [
  { label: "Home", to: "home", icon: <HomeIcon /> },
  { label: "About Me", to: "about", icon: <PersonIcon /> },
  { label: "Showcase", to: "showcase", icon: <PreviewIcon /> },
  { label: "Projects", to: "projects", icon: <WorkIcon /> },
  { label: "Contact", to: "contact", icon: <MailIcon /> }
];

const NavigationLg = () => {
  return (
    <Stack
      position="fixed"
      top="50%"
      right={40}
      zIndex={99}
      sx={{ transform: "translateY(-50%)" }}
      display={{ xs: "none", lg: "flex" }}
    >
      <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
        <Box
          display="flex"
          flexDirection="column"
          alignItems="end"
          gap={3}
          fontSize={18}
          fontWeight="bold"
        >
          {menuItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              smooth={true}
              duration={500}
              spy={true}
              offset={-80}
              activeClass="pageActive"
            >
              <div className="circle-btn">
                <Box
                  className="circle-btn-icon"
                  bgcolor="action.disabledBackground"
                  color="text.secondary"
                >
                  {item.icon}
                </Box>

                <div className="circle-btn-text">
                  <Typography variant="h6">
                    {item.label}
                  </Typography>
                </div>
              </div>
            </Link>
          ))}
        </Box>
      </ul>
    </Stack>
  );
};

export default NavigationLg;