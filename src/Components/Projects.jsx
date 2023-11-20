import React, { useState } from 'react'
import { Box, Card, CardMedia, Container, Grid, Stack, Typography } from '@mui/material'

import '../Styles/Projects.css'
import 'animate.css';

// import axios from 'axios'
import {myProjects} from './MyProjectData'
import { motion } from 'framer-motion';



const Projects= ()=> {
  const container = {
		hidden: { opacity: 1, scale: 0 },
		visible: {
			opacity: 1,
			scale: 1,
			transition: {
				delayChildren: 0.2,
				staggerChildren: 0.2,
				duration: 0.5,
			},
		},
  };

  const item = {
		hidden: { y: '100%', opacity: 0 },
		visible: { y: 0, opacity: 1 },
  };

  const [open, setOpen] = useState(false);
  const [EProjectDetails, setProjectDetails] = useState({});


  const handleOpenLink=(e)=>{
    if(e.githubLink!==''){
      window.open(e.githubLink, '_blank');
    }
  }
  const [repos, setRepos] = useState(myProjects)
  const [filtertype, setFiltertype] = useState('All')


  const handelFilter = (e) =>{
    setRepos(myProjects?.filter(v => v?.Language?.includes(e.currentTarget.attributes?.value?.value)));
    setFiltertype(e.currentTarget.attributes?.value?.value)
  }


  return (
    <>
    <Container component='section'>
      <Stack textTransform='uppercase' mb={6} >

        <Typography fontSize={{xs:'30px', lg:'100px'}} fontWeight="800"  letterSpacing={15}
          position='absolute' top={40} left={{xs:5, lg:'50%'}} sx={{transform:'translateX(-50%)'}}
          color={(theme) => theme.palette.mode === 'dark' ? '#ffffff12' : '#1e253012' }>
          Works
        </Typography>

        <Typography fontWeight="900"
          fontSize={{xs:'25px', lg:'60px'}}  textAlign={{xs:'left', lg:'center'}}  >
            My
          <span style={{color:'var(--mainPraimary)'}} > Projects</span>
        </Typography>
      </Stack>


      <Stack direction='row' gap={{xs:2, md:4}} justifyContent='center' mt={10} mb={4} >
        <Typography  className={`project-type ${filtertype === 'All' && 'project-type-active'}`}
          onClick={()=> {setRepos(myProjects);
            setFiltertype('All')
            }} >
          All
        </Typography>
        <Typography  className={`project-type ${filtertype === 'Electron' && 'project-type-active'}`}
          value='Electron' onClick={(e)=> handelFilter(e) }>
            Electron
        </Typography>
        <Typography  className={`project-type ${filtertype === 'React' && 'project-type-active'}`}
          value='React' onClick={(e)=> handelFilter(e) }>
            React
        </Typography>
        <Typography  className={`project-type ${filtertype === '.Net' && 'project-type-active'}`}
          value='.Net' onClick={(e)=> handelFilter(e) }>
            .Net
        </Typography>
      </Stack>

      <Grid container spacing={3} 
        component={motion.ul} variants={container} initial="hidden" animate="visible" 
        className='animate__animated animate__zoomIn' 
        
      >
        {repos && repos.map(e =>
          <Grid item  xs={12} md={6} lg={4}  key={e?.id} sx={{position: 'relative', listStyle:'none'}}
            component={motion.li} variants={item}
          >
            <Card className="flip-card"  component={motion.div}
              onClick={()=> {setOpen(true); setProjectDetails(e); handleOpenLink(e)}} >

              <Box className="flip-card-inner">
                {/* when hover over card show next box */}
                <CardMedia className="flip-card-front"
                  component="img"
                  image={e.img} alt={e?.title} 
                  sx={{objectPosition: "top"}}
                />


                <Box className="flip-card-back" >
                  <Typography variant="h6" color='white' > {e?.title} </Typography>
                  {/* <Typography variant="h6" > {e.description} </Typography> */}
                </Box>
              </Box>
            </Card>
          </Grid>
        )}
      </Grid>

    </Container>
  </>
  )
}

export default Projects;