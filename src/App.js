import React, { useState} from 'react';
import { Route, Routes } from 'react-router-dom';

import Home from './Components/Home';
import TogleTheme from './Components/TogleTheme';

import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline, GlobalStyles } from '@mui/material';
import About from './Components/About';
import NavbarBottom from './Components/NavbarBottom';
import NavigationLg from './Components/NavigationLg';
import Contact from './Components/Contact';
import Projects from './Components/Projects';
import Showcase from './Components/Showcase';



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
        <GlobalStyles
            styles={{
            "*::-webkit-scrollbar": {
              width: "0.3em"
            },
            "*::-webkit-scrollbar-track": {
              "-webkit-box-shadow": "inset 0 0 6px rgba(0,0,0,0.00)"
            },
            "*::-webkit-scrollbar-thumb": {
              backgroundColor: "rgba(0,0,0,.1)",
              outline: "1px solid slategrey"
            }
            }}
          />
        <NavigationLg />
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/about' element={<About/>} />
          <Route path='/Projects' element={<Projects/>} />
          <Route path="/showcase" element={<Showcase />} />
          <Route path='/contact' element={<Contact/>} />
          <Route path='*' element={<Home/>} />
        </Routes>
        <NavbarBottom/>
  </ThemeProvider>


  );
}

export default App;
