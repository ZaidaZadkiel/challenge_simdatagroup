import { useState, useEffect } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import axios from 'axios';
import {
  Link, Outlet
} from "react-router-dom";

import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';


function App() {

  // useEffect(() => {
  //   axios
  //     .get('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita')
  //     .then((response) => {
  //       console.log('what?');
  //       setCount(response.data);
  //     })
  //     .catch((e) => setCount(e));
  // }, []);

const navItems = [
  <Button variant="contained" color="secondary" href="/#/caso1">Caso #1</Button>,
  <Button variant="contained" color="secondary" href="/#/caso2">Caso #2</Button>,
  <Button variant="contained" color="secondary" href="/#/caso3">Caso #3</Button>
];

  return (
      <CssBaseline >
    <Box sx={{ height:'100dvh', backgroundColor:'#1010ff20' }}>

      <AppBar component="nav" style={{position:'unset'}}>
        <Toolbar>
          <Box>
            {navItems.map((item, index) => (
              <Button key={index} sx={{ color: '#fff' }}>
                {item}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </AppBar>
      
      <Grid component="main" sx={{ p: 3}}>
        <Outlet />
      </Grid>
    </Box>
    </CssBaseline>
  );
}

export default App;
