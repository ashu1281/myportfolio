import React, { Fragment } from 'react';
import { Grid, Typography } from '@mui/material';

import {
	Timeline,
	TimelineItem,
	TimelineSeparator,
	TimelineConnector,
	TimelineDot,
	TimelineContent,
} from '@mui/lab';

import 'animate.css';
import { Education , Experience} from './MyProjectData';


export default function Journey() {
   const handleClick = () => {
      window.open('https://www.pratititech.com/', '_blank'); 
    };

	return (
		<Fragment>
			<Timeline position="right" color="text.white" sx={{ px: 0, overflow: 'hidden' , mt:5}}>
			<Grid container alignItems='baseline' spacing={4}>
               <Grid item xs={12} md={7}>
                  <Typography variant="h5" textTransform="uppercase" fontWeight={700} mb={2}>
                     Education : 
                  </Typography>
                  {Education.map((item, index) => (
                     <TimelineItem
                        key={index}
                        sx={{
                           '&::before': { content: 'none' },
                        }}
                     >
                        <TimelineSeparator>
                           <TimelineDot color="primary">{item.icon}</TimelineDot>
                           <TimelineConnector />
                        </TimelineSeparator>
                        <TimelineContent sx={{ py: '12px', px: 2 }}>
                           <Typography
                              variant="body1"
                              component="span"
                              bgcolor="divider"
                              py={0.3}
                              px={2}
                              borderRadius="20px"
                           >
                              {item.date}
                           </Typography>
                           <Typography variant="h6">{item.title}</Typography>
                           <Typography variant="h6">{item.organization}</Typography>
                        </TimelineContent>
                     </TimelineItem>
                  ))}
					</Grid>

               <Grid item xs={12} md={5} >
                  <Typography variant="h5" textTransform="uppercase" fontWeight={700} mb={2}>
                     Experince : 
                  </Typography>
                  {Experience.map((item, index) => (
                     <TimelineItem
                        key={index}
                        sx={{
                           '&::before': { content: 'none' },
                        }}
                     >
                        <TimelineSeparator>
                           <TimelineDot color="primary">{item.icon}</TimelineDot>
                           <TimelineConnector />
                        </TimelineSeparator>
                        <TimelineContent sx={{ py: '12px', px: 2 }}>
                           <Typography
                              variant="body1"
                              component="span"
                              bgcolor="divider"
                              py={0.3}
                              px={2}
                              borderRadius="20px"
                           >
                              {item.date}
                           </Typography>
                           <Typography variant="h6">{item.title}</Typography>
                           <Typography
                              variant="h6"
                              onClick={handleClick}
                              sx={{
                                 cursor: 'pointer',
                                 '&:hover': {
                                    textDecoration: 'underline',
                                    color: '#018dff',
                                 },
                              }}
                              >
                              {item.organization}
                           </Typography>
                        </TimelineContent>
                     </TimelineItem>
                  ))}
					</Grid>

				</Grid>
			</Timeline>
		</Fragment>
	);
}
