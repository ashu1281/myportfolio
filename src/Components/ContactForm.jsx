import TaskAltIcon from '@mui/icons-material/TaskAlt';
import { Box, Grid, Paper, Slide, Snackbar, TextField, Typography } from '@mui/material';
import React, { Fragment, useRef, useState } from 'react';
import { IoPaperPlane } from "react-icons/io5";


/**
 * A form component for sending messages.
 * @returns {JSX.Element} The ContactForm component.
 */
// eslint-disable-next-line
export default function ContactForm() {
   const form = useRef();
   // const [errorState, setErrorState] = useState({name: false, email: false, message: false});
   const [message, setMessage] = useState('');
   const [messageColor, setMessageColor] = useState('error.main');
   const sendEmail = (e) => {
      e.preventDefault();
      const formData = new FormData(form.current);
      const data = {};
      for (let name of formData.keys()) {
        const input = form.current.elements[name];
        if (input.required && !input.value) {
         //  setErrorState(prevState => ({...prevState, [name]: true}));
          setMessageColor('error.main');
          setMessage('Please fill all required fields.');
          return;
        }
        if (name === 'user_email' && !validateEmail(input.value)) {
         //  setErrorState(prevState => ({...prevState, [name]: true}));
          setMessageColor('error.main');
          setMessage('Please enter a valid email address.');
          return;
        }
        data[name] = input.value;
      }
      setMessageColor('success.main');
      setMessage('Message was sent. Thank you for contacting me.');
      // setErrorState({name: false, email: false, message: false});
      form.current.reset();
   };

   const handleCloseSnackbar = () => {
      setMessage('');
   }

   const validateEmail = (email) => {
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return re.test(String(email).toLowerCase());
   }

   return (
      <Fragment>
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
         <Grid sx={{display:'flex', justifyContent:'space-between' , ml:8, mr:2,mb:2}}>
            <Typography variant='h6'   > Send me a message: </Typography>
            <Typography variant='subtitle1' > * Required fields</Typography>
         </Grid>
         <Box component="form" ref={form} noValidate onSubmit={sendEmail}  ml={{lg:8}} >
            <Grid container spacing={2}>
               <Grid item xs={12} >
                  <TextField
                     autoComplete="given-name"
                     name="user_name"
                     fullWidth
                     id="fullName"
                     label="Full Name"
                     required
                  />
               </Grid>
               <Grid item xs={12} >
                     <TextField
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="user_email"
                        autoComplete="email"
                        required
                     />
               </Grid>
               <Grid item xs={12} >
                  <TextField
                     fullWidth
                     id="subject"
                     label="Subject"
                     name="subject"
                  />
               </Grid>
               <Grid item xs={12}>
                  <TextField 
                     fullWidth
                     name="message"
                     label="write message"
                     type="text"
                     id="message"
                     multiline
                     rows={4}
                     required
                  />
               </Grid>
            </Grid>


            <Box
             className='project-btn'
             component='button'
             my={3} mx='auto'
             color='text.primary'
             type="submit"
            >
               <Box className='project-btn-icon' ><IoPaperPlane /></Box>
               <Box className='project-btn-text' > SEND MESSAGE</Box>
            </Box>

         </Box>
      </Box>

      {message && (
        <Snackbar
         open={Boolean(message)}
         onClose={handleCloseSnackbar}
         autoHideDuration={6000}
         TransitionComponent={Slide}
         sx={{ bottom: { xs: 65, md:'24px'} }} 
         children={
           <Paper elevation={4}  sx={{bgcolor:messageColor, color:'white', p:1.5, mx:'auto', display:'flex', gap:1}}>
              <TaskAltIcon />
              <span>{message}</span>
           </Paper>
         }
        />
      )}

      </Fragment>
   )
}
