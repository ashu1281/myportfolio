import { Grid, Typography } from '@mui/material';
import { Box, Container } from '@mui/system';
import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { startLink } from './MyProjectData';

import '../Styles/Home.css';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

export const Home = () => {
  const navigate = useNavigate();
  return (
    <Box minHeight="710px" height="100vh" overflow="hidden">
      <Box
        className="home-bg-img"
        minHeight="710px"
        height="100vh"
        bgcolor="text.disabled"
        display={{ xs: 'none', md: 'block' }}
      />

      <Container maxWidth="xs">
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          position="absolute"
          top={0}
          left={0}
          height="100%"
          minHeight="710px"
        >
          <Grid
            container
            height={{ xs: 'auto', md: '100%' }}
            alignItems="center"
            justifyContent={{ xs: 'center', md: 'left' }}
            p={{ xs: 2, md: 6 }}
          >
            <Grid item md={12} mt={{ xs: 4, md: 0 }} px={{ xs: 2, sm: 20 }}>
              <Box>
                <Typography
                  fontSize={{ xs: '25px', md: '50px' }}
                  fontWeight="bold"
                  color="text.disabled"
                  textAlign="center"
                >
                  ASHISH Gaikwad
                </Typography>

                <Typography
                  className="animate-charcter"
                  fontSize={{ xs: '21px', md: '40px' }}
                  fontWeight="bold"
                  textAlign="center"
                  my={1}
                >
                  Full-stack developer
                </Typography>

                <Typography
                  fontSize={{ xs: '15px', md: '20px' }}
                  color="text.secondary"
                  textAlign="justify"
                  px={{ xs: 2, md: 10 }}
                  className="animate__animated animate__fadeIn"
                >
                  I'm a dedicated full-stack developer committed to crafting clean
                  and user-friendly software experiences. My passion is to build
                  exceptional software that enriches lives and creates real impact.
                </Typography>

                {/* Manual navigation button (still works) */}
                <Box
                  className="project-btn"
                  component="button"
                  mt={5}
                  mx="auto"
                  color="text.primary"
                  boxShadow={2}
                  onClick={() => navigate(`${startLink}/about`)}
                >
                  <Box className="project-btn-icon">
                    <ArrowForwardIosIcon />
                  </Box>
                  <Box className="project-btn-text">More about me</Box>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  );
};

export default Home;
