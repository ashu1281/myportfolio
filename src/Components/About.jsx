import React from 'react';
import {
	Avatar,
	Box,
	Container,
	Divider,
	Link,
	Stack,
	Typography,
} from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2/Grid2';

import myImage from '../Images/MyImages/shortPassport.png';

import { myPersonalInfo, skills, otherSkills } from './MyProjectData';
import Journey from './Journey';
import { FiDownload } from 'react-icons/fi';

import '../Styles/index.css';


import { motion } from 'framer-motion';

export default function About() {
   const container = {
		hidden: { opacity: 1, scale: 0 },
		visible: {
			opacity: 1,
			scale: 1,
			transition: {
				delayChildren: 0.3,
				staggerChildren: 0.2,
				duration: 0.5,
			},
		},
	};

	const item = {
		hidden: { y: '100%', opacity: 0 },
		visible: { y: 0, opacity: 1 },
	};

	return (
		<Container sx={{ my: { xs: '12%', lg: '70px' } }}>
			<Stack textTransform="uppercase" mb={6}>
				<Typography
					fontSize={{ xs: '30px', lg: '100px' }}
					fontWeight="800"
					letterSpacing={15}
					position="absolute"
					top={40}
					left={{ xs: 5, lg: '50%' }}
					sx={{ transform: 'translateX(-50%)' }}
					color={(theme) =>
						theme.palette.mode === 'dark' ? '#ffffff12' : '#1e253012'
					}
				>
					Resume
				</Typography>

				<Typography
					fontWeight="900"
					fontSize={{ xs: '25px', lg: '60px' }}
					textAlign={{ xs: 'left', lg: 'center' }}
				>
					About
					<span style={{ color: 'var(--mainPraimary)' }}> Me</span>
				</Typography>
			</Stack>

			<Grid container spacing={3}>
				<Grid item xs={12} lg={5} color="text.secondary">
					<Box display="flex" justifyContent="center" mb={{ xs: 6, lg: 0 }}>
						<Avatar
							alt="Ashish  Gaikwad Pic"
							src={myImage}
							sx={{
								width: '300px',
								height: '320px',
								border: '4px solid #252525',
								objectFit: 'top',
							}}
						/>
					</Box>
				</Grid>

				{/* ------------------------------------- personal infos ------------------------------ */}
				<Grid item xs={12} lg={7}>
					<Box
						display="flex"
						flexDirection="column"
						justifyContent="center"
						width="100%"
					>
						<Typography variant="h5" textTransform="uppercase">
							personal infos :
						</Typography>

						<Box
							display="flex"
							flexWrap="wrap"
							justifyContent="space-between"
							mt={3}
							color="text.secondary"
						>
							{myPersonalInfo &&
								myPersonalInfo.map((item) => (
									<Stack flex="0 0 50%" key={item?.id}>
										<Stack
											direction={{ xs: 'column', sm: 'row' }}
											mb={1}
											columnGap={2}
										>
											<Typography color="text.secondary">
												{' '}
												{item?.title}{' '}
											</Typography>
											<Typography
												fontWeight={900}
												color={item?.color || 'var(--mainPraimary)'}
												mr={2}
												className="animate__animated animate__flipInX"
											>
												{item?.info}
											</Typography>
										</Stack>
									</Stack>
								))}
						</Box>
					</Box>

					<Box display="flex" justifyContent={{ xs: 'center', lg: 'left' }}>
						<Link
							href="./files/Ashish_Gaikwad_Resume.pdf"
							target="_blank"
							download
							color="#ffffff"
							underline="none"
						>
							<Box className="project-btn" color="text.primary" mt={5}>
								<Box className="project-btn-icon">
									<FiDownload />{' '}
								</Box>
								<Box className="project-btn-text"> Download CV </Box>
							</Box>
						</Link>
					</Box>
				</Grid>
			</Grid>

			<Divider sx={{ bgcolor: 'gray', width: '50%', mx: 'auto', my: 4 }} />

			{/* ------------------------------------- Skills ------------------------------ */}
			<Box mt={6} component="section">
				<Typography variant="h5" textTransform="uppercase" fontWeight={700}>
					Skills :
				</Typography>

				<Grid
					container
					spacing={2} 
					my={4}
					color="text.primary"
					textAlign="center"
	                component={motion.ul} 
					variants={container} initial="hidden" animate="visible"
					className="container"
				>
					{skills?.map((skill, i) => (
						<Grid xs={6} sm={4} lg={3} key={skill?.id} sx={{listStyle:'none',flexGrow:'1 !important'}}  
						component={motion.li} 
						variants={item}
						>
							<Box
								fontSize={60}
								color={skill?.color || 'text.primary'}
								bgcolor="action.hover"
								paddingY="20px"
								borderRadius="10px"
								boxShadow={3}
								sx={{
									'&:hover': {
										boxShadow: '0 4px 8px 0 rgb(1 141 255 / 42%)',
										transform: 'translateY(-10px)',
										transition: 'all .5s',
										transitionDelay: 80 * i,
									},
								}}
							>
								{skill?.icon}
								<Typography
									variant="body1"
									fontWeight={700}
									sx={{ userSelect: 'none' }}
								>
									{skill?.title}
								</Typography>
							</Box>
						</Grid>
					))}
				</Grid>
			</Box>

			<Divider sx={{ bgcolor: 'Divider', width: '50%', mx: 'auto', my: 4 }} />

			<Box my={6}>
				<Typography variant="h5" textTransform="uppercase" fontWeight={700} mb={2}>
					Other Skills :
				</Typography>

				<Box
					display="flex"
					flexDirection="row"
					gap={3}
					flexWrap="wrap"
					textAlign="center"
				>
					{otherSkills?.map((skill, i) => (
						<Box
							key={skill?.id}
							fontSize={60}
							color={skill?.color || 'primary'}
							flex={{ xs: '1 1 auto' }}
						>
							<Box
								sx={{
									'&:hover': {
										transform: 'scale(1.2)',
										transition: 'all .5s',
										filter: `drop-shadow(0 4px 8px ${skill?.color || 'blue'})`,
									},
								}}
							>
								{skill?.icon}
							</Box>

							<Typography variant="body1" mb={2}>
								{skill?.title}
							</Typography>
						</Box>
					))}
				</Box>
			</Box>

			<Divider sx={{ bgcolor: 'gray', width: '50%', mx: 'auto', my: 4 }} />

			{/* Journey component ------------------------------------- */}
			<Journey />
		</Container>
	);
}
