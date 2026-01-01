import React, { Fragment, useEffect, useState } from 'react';
import {
  BottomNavigation,
  BottomNavigationAction,
  Box,
} from '@mui/material';

import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import WorkIcon from '@mui/icons-material/Work';
import PreviewIcon from '@mui/icons-material/Preview';
import MailIcon from '@mui/icons-material/Mail';

import { useLocation, useNavigate } from 'react-router-dom';
import { startLink } from './MyProjectData';

/* ================= NAV CONFIG ================= */
const navItems = [
  {
    label: 'Home',
    path: `${startLink}/`,
    icon: <HomeIcon />,
  },
  {
    label: 'About',
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
    icon: <PreviewIcon />,
  },
  {
    label: 'Contact',
    path: `${startLink}/contact`,
    icon: <MailIcon />,
  },
];

const NavbarBottom = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [value, setValue] = useState(0);

  /* ================= ACTIVE TAB HANDLING ================= */
  useEffect(() => {
    const currentIndex = navItems.findIndex(
      (item) => item.path === location.pathname
    );
    setValue(currentIndex === -1 ? 0 : currentIndex);
  }, [location.pathname]);

  return (
    <Fragment>
      {/* Spacer for fixed bottom nav */}
      <Box height="56px" display={{ xs: 'block', lg: 'none' }} />

      {/* Bottom Navigation */}
      <Box
        sx={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 20,
        }}
        display={{ xs: 'block', lg: 'none' }}
      >
        <BottomNavigation
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
            navigate(navItems[newValue].path);
          }}
          sx={{
            bgcolor: '#1a1a1a',
            '& .Mui-selected': {
              color: 'var(--mainPraimary)',
            },
            '& .MuiBottomNavigationAction-root': {
              color: '#ffffff',
            },
          }}
        >
          {navItems.map((item, index) => (
            <BottomNavigationAction
              key={index}
              label={item.label}
              icon={item.icon}
            />
          ))}
        </BottomNavigation>
      </Box>
    </Fragment>
  );
};

export default NavbarBottom;
