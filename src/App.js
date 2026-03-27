import { CssBaseline, GlobalStyles } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useState } from "react";

import About from "./Components/About";
import Contact from "./Components/Contact";
import Home from "./Components/Home";
import Projects from "./Components/Projects";
import Showcase from "./Components/Showcase";

import { useEffect } from "react";
import { scroller } from "react-scroll";
import NavbarBottom from "./Components/NavbarBottom";
import NavigationLg, { menuItems } from "./Components/NavigationLg";
import TogleTheme from "./Components/TogleTheme";
function App() {
  const [toggleDark, settoggleDark] = useState(true);

  const myTheme = createTheme({
    palette: {
      mode: toggleDark ? "dark" : "light",
      primary: { main: "#018dff" },
      text: { disabled: "#018dff" }
    },
    components: {
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.16), rgb(1 141 255 / 43%), rgba(255,255,255,0.16))"
          }
        }
      }
    }
  });
  useEffect(() => {
    const path = window.location.pathname.replace("/", "");

    const target = menuItems.find(item => item.to === path);

    if (target) {
      setTimeout(() => {
        scroller.scrollTo(target.to, {
          smooth: true,
          duration: 600,
          offset: -80,
        });
      }, 100); // wait for DOM
    }
  }, []);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <ThemeProvider theme={myTheme}>
        <CssBaseline />

        <TogleTheme toggleDark={toggleDark} settoggleDark={settoggleDark} />

        <GlobalStyles
          styles={{
            "*::-webkit-scrollbar": { width: "0.3em" },
            "*::-webkit-scrollbar-thumb": {
              backgroundColor: "rgba(0,0,0,.1)"
            }
          }}
        />

        <NavigationLg />

        {/* SCROLL SECTIONS */}
        <div id="home"><Home /></div>
        <div id="about"><About /></div>
        <div id="showcase"><Showcase /></div>
        <div id="projects"><Projects /></div>
        <div id="contact"><Contact /></div>

        <NavbarBottom />
      </ThemeProvider>
    </LocalizationProvider>
  );
}

export default App;