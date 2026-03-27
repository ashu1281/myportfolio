import {
  BottomNavigation,
  BottomNavigationAction,
  Box,
} from '@mui/material';
import { Fragment, useEffect, useState } from 'react';

import { scroller, Events, scrollSpy } from "react-scroll"; // ✅ add
import { menuItems } from './NavigationLg';

const NavbarBottom = () => {
  const [value, setValue] = useState(0);

  /* ACTIVE TAB VIA SCROLL */
  useEffect(() => {
    Events.scrollEvent.register("begin", () => {});

    scrollSpy.update();

    const handleScroll = () => {
      const sections = menuItems.map(item =>
        document.getElementById(item.to)
      );

      let activeIndex = 0;

      sections.forEach((section, index) => {
        if (!section) return;

        const rect = section.getBoundingClientRect();

        if (rect.top <= 100 && rect.bottom >= 100) {
          activeIndex = index;
        }
      });

      setValue(activeIndex);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      Events.scrollEvent.remove("begin");
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <Fragment>
      <Box height="56px" display={{ xs: 'block', lg: 'none' }} />

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

            scroller.scrollTo(menuItems[newValue].to, {
              smooth: true,
              duration: 500,
              offset: -80,
            });
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
          {menuItems.map((item, index) => (
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