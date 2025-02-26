import { Box, Container, Grid, Link, Stack, Typography } from '@mui/material';
import React from 'react';

import { FaEnvelopeOpen, FaFacebookF, FaGithub, FaLinkedinIn, FaMap, FaPhoneAlt, FaTwitter, FaWhatsapp } from "react-icons/fa";
import '../Styles/Contact.css';
import ContactForm from './ContactForm';





const Contact = () => {


  return (

    <Container sx={{my:{xs:'12%', lg:'70px'}}}   >
      <Stack textTransform='uppercase' mb={6} >
        <Typography fontSize={{xs:'30px', lg:'100px'}} fontWeight="800"  letterSpacing={15}
          position='absolute' top={40} left={{xs:5, lg:'50%'}} sx={{transform:'translateX(-50%)'}}
          color={(theme) => theme.palette.mode === 'dark' ? '#ffffff12' : '#1e253012' }>
          Contact
        </Typography>
        <Typography fontWeight="900"
        fontSize={{xs:'25px', lg:'60px'}}  textAlign={{xs:'left', lg:'center'}}  >
          get in  <span style={{color:'var(--mainPraimary)'}} >touch</span>
        </Typography>
      </Stack>


        <Box  >
          <Typography  fontSize={{xs:'25px', lg:'25px'}}  textAlign={{xs:'center', lg:'left'}} mb={3} >
            Let's Connect!
          </Typography>
        </Box>


      <Grid  container>
        <Grid item  lg={4}  >
          <Stack  textTransform='capitalize' height='100%' direction='column' justifyContent='space-between'>
            <Typography fontWeight="700" fontSize='15px'  textAlign='justify' mb={4}  >
              Whether you're interested in my resume or looking to collaborate on freelance projects, feel free to reach out. I'm always open to discussing new opportunities, sharing creative ideas, and being a part of your vision.
            </Typography>

            <Stack display='flex' flexDirection='row' alignItems='center' gap={2}  mb={4} >
              <Stack fontSize={40} color='text.disabled' > <FaMap /> </Stack>

              <Stack fontSize={40} textAlign='left' >
                <Typography> Address point </Typography>
                <Typography> Pune - India </Typography>
              </Stack>
            </Stack>

            <Stack display='flex' flexDirection='row' alignItems='center' gap={2}  mb={4} >
              <Stack fontSize={30} color='text.disabled' > <FaEnvelopeOpen /> </Stack>

              <Stack fontSize={30} textAlign='left' >
                <Typography> Mail Me </Typography>

                <Link href='mailto:mr.ashishgg@gmail.com' underline="hover"  sx={{color:'text.praimary', textTransform: 'lowercase'}}   fontSize={15}>
                  mr.ashishgg@gmail.com
                </Link>
              </Stack>
            </Stack>

            <Stack display='flex' flexDirection='row' alignItems='center' gap={2}  mb={4} >
              <Stack fontSize={40} color='text.disabled' > <FaPhoneAlt /> </Stack>

              <Stack textAlign='left' >
                <Typography > Call Me </Typography>
                <Link href='tel:+919021823547' underline="hover"  sx={{color:'text.praimary'}} >
                +91 902 182 3547
                </Link>
                <Link href='tel:+917066130529' underline="hover" sx={{color:'text.praimary'}} >
                +91 706 613 0529
                </Link>
              </Stack>
            </Stack>

            <Stack display='flex' flexDirection='row' alignItems='center' gap={2}  mb={3}
              justifyContent={{xs:'center', lg:'left'}} className='animate__animated animate__zoomIn'>

              <Link href='https://www.facebook.com/ashish.gaikwad.96199344/' target='_blank' >
                <Box className='social-icons' bgcolor='action.disabledBackground'  > <FaFacebookF /> </Box>
              </Link>

              <Link href='https://www.linkedin.com/in/ashishggaikwad/' target='_blank' >
                <Box className='social-icons' bgcolor='action.disabledBackground'  > <FaLinkedinIn /> </Box>
              </Link>

              <Link href='https://wa.me/+919021823547' target='_blank' >
                <Box className='social-icons' bgcolor='action.disabledBackground'  > <FaWhatsapp /> </Box>
              </Link>

              <Link href='https://twitter.com/ashishggaikwad1' target='_blank' >
                <Box className='social-icons' bgcolor='action.disabledBackground'  > <FaTwitter /></Box>
              </Link>

              <Link href='https://github.com/ashu1281' target='_blank' >
                <Box className='social-icons' bgcolor='action.disabledBackground' > <FaGithub /></Box>
              </Link>

            </Stack>

          </Stack>
        </Grid>

        <Grid item lg={7}>
          <ContactForm />
        </Grid>
      </Grid>
    </Container>
  )
}
export default Contact ;