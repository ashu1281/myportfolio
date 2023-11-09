import React, { useState} from 'react';
import { Route, Routes } from 'react-router-dom';

import Home from './Components/Home';
import TogleTheme from './Components/TogleTheme';

import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import About from './Components/About';
import NavbarBottom from './Components/NavbarBottom';
import NavigationLg from './Components/NavigationLg';
import Contact from './Components/Contact';



function App() {

  const [toggleDark, settoggleDark] = useState(true);

  const myTheme = createTheme({
    // Theme settings
    palette: {
      mode: toggleDark ? "dark" : "light",
      primary:{main:'#018dff'},
      text:{disabled:'#018dff'}
    },
    components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: "linear-gradient( rgba(255, 255, 255, 0.16), rgb(1 141 255 / 43%), rgba(255, 255, 255, 0.16))"
        },
      },
    },
  },
  });

  return (
    <ThemeProvider  theme={myTheme}>
      <CssBaseline />
        <TogleTheme toggleDark={toggleDark} settoggleDark={settoggleDark} />
        <NavigationLg />
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/about' element={<About/>} />
          <Route path='contact' element={<Contact/>} />
          <Route path='*' element={<Home/>} />
        </Routes>
        <NavbarBottom/>
  </ThemeProvider>


  );
}

export default App;
