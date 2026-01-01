import React from 'react';
import { Stack, Typography, Box } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import '../Styles/NavigationLg.css';

import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import WorkIcon from '@mui/icons-material/Work';
import PreviewIcon from '@mui/icons-material/Preview';
import MailIcon from '@mui/icons-material/Mail';

import { startLink } from './MyProjectData';

/* ================= MENU CONFIG ================= */
const menuItems = [
  {
    label: 'Home',
    path: `${startLink}/`,
    icon: <HomeIcon />,
  },
  {
    label: 'About Me',
    path: `${startLink}/about`,
    icon: <PersonIcon />,
  },
  {
    label: 'Projects',
    path: `${startLink}/projects`,
    icon: <WorkIcon />,
  },
  {
    label: 'Showcase',
    path: `${startLink}/showcase`,
    icon: <PreviewIcon />, // ⭐ showcase icon
  },
  {
    label: 'Contact',
    path: `${startLink}/contact`,
    icon: <MailIcon />,
  },
];

const NavigationLg = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Stack
      zIndex={99}
      position="fixed"
      top="50%"
      right={40}
      sx={{ transform: 'translateY(-50%)' }}
      display={{ xs: 'none', lg: 'flex' }}
    >
      <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="space-between"
          alignItems="end"
          gap={3}
          fontSize={18}
          fontWeight="bold"
        >
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;

            return (
              <div
                key={item.path}
                className="circle-btn"
                onClick={() => navigate(item.path)}
              >
                <Box
                  className={`circle-btn-icon ${
                    isActive ? 'pageActive' : ''
                  }`}
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
            );
          })}
        </Box>
      </ul>
    </Stack>
  );
};

export default NavigationLg;
