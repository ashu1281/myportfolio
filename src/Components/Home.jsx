import React from 'react';
import { Avatar, Card, CardMedia, Grid, Typography } from '@mui/material';
import { Box, Container } from '@mui/system';
import { useNavigate } from 'react-router-dom';
import { startLink } from './MyProjectData';

import myImage from '../Images/MyImages/styledcoat.png';
import myImage2 from '../Images/MyImages/shortPassport.png';
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
			></Box>

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
						display="flex"
						alignItems="center"
						justifyContent={{ xs: 'center', md: 'left' }}
						p={{ xs: 2, md: 6 }}
					>
						<Grid item md={4} padding={0} height="100%">
							<Box display={{ xs: 'none', md: 'flex' }} height="100%">
								<Card
									sx={{
										borderRadius: '30px',
										boxShadow: 2,
										bgcolor: '#000000ed',
									}}
								>
									{/* <CardMedia
										component="img"
										image={myImage}
										alt="Ashish  Gaikwad Pic"
										height="100%"
										width="100%"
									/> */}
								</Card>
							</Box>

							<Box display={{ xs: 'flex', md: 'none' }}>
								<Avatar
									alt="Ashish  Gaikwad Image"
									// src={myImage2}
									sx={{
										width: '100%',
										height: '300px',
										border: '4px solid #252525',
										objectFit: 'top',
										bgcolor: 'black',
									}}
								/>
							</Box>
						</Grid>

						<Grid item md={8} mt={{ xs: 4, md: 0 }}>
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
									"I'm a dedicated full-stack developer committed to crafting clean and user-friendly software experiences. My passion is to build exceptional software that enriches the lives of individuals, driven by the belief that technology can be a powerful force for good.
								</Typography>

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
									<Box className="project-btn-text"> More about me </Box>
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
