import { useState } from 'react';
import {
  Outlet, useLocation
} from "react-router-dom";

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Hidden from '@mui/material/Hidden';
import Information, {InformationProps} from './Information';

const data: Record<string, InformationProps['information']> = {
  '/caso1':{
    title: 'Formulario de Signup',
    content: (
    <>
      <p>Crear un formulario de registro con los siguientes campos:</p>
      <ol>
          <li><p><b>Nombre(s)</b><br/>
              Validaciones: requerido, min length 2, max length 50</p>
          </li>
          <li><p><b>Apellido(s)</b><br/>
              Validaciones: requerido, min length 2, max length 50</p>
          </li>
          <li><p><b>Correo electrónico</b><br/>
              Validaciones: requerido, tipo email, max length 50</p>
          </li>
          <li><p><b>Teléfono</b><br/>
              Validaciones: requerido, tipo tel, max length 20</p>
          </li>
          <li><p><b>Contraseña</b><br/>
              Validaciones: requerido, min length 8, max length 25,
      mayúsculas, minúsculas, números y algunos de los siguientes caracteres 
      !@#$%^&*</p>
          </li>
          <li><p><b>Confirmar contraseña</b><br/>
              Validaciones: requerido, que el valor ingresado sea igual al valor del campo contraseña</p>
          </li>
          <li><p><b>botón submit</b> “Registrar”</p></li>
      </ol>
      <p>
          Crear y diseñar el formulario, aplicar las validaciones correspondientes, mostrar mensajes de validaciones.
      </p>
      <p>
          Al hacer clic sobre el botón “Registrar”:<br/>
          Si el formulario no tiene errores de validación mostrar un mensaje o alerta “Registro completado” y reiniciar el formulario (limpiar los inputs)
      </p>
    </>
    )
  },
  '/caso2':{
    title: 'App de Bebidas',
    content: (
      <>
      <p>Crear una aplicación web móvil de bebidas usando el api TheCocktailDB </p>
      <p>https://www.thecocktaildb.com/api.php</p>
      </>
    )
  },
  '/caso3':{
    title:'',
    content:(
      <>
        <p>Crear una tabla de datos aleatorios usando el api Random Data Generator </p>
        <p>https://random-data-api.com/documentation</p>
      </>
    )
  }

}


function App() {
  const location = useLocation();
  const [showInfo, setShowInfo] = useState(false);
  const toggleShowInfo=()=>setShowInfo(!showInfo);
    
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
  <Button variant="contained" disableElevation color="secondary" href="/#/caso1"><Hidden smDown>Caso</Hidden>#1</Button>,
  <Button variant="contained" disableElevation color="secondary" href="/#/caso2"><Hidden smDown>Caso</Hidden>#2</Button>,
  <Button variant="contained" disableElevation color="secondary" href="/#/caso3"><Hidden smDown>Caso</Hidden>#3</Button>,
  <Button variant="outlined"  disableElevation color="secondary" href="/#">Info</Button>
];

  return (
    <CssBaseline >
    <Box sx={{ height:'100dvh', backgroundColor:'#1010ff20' }}>

      <AppBar component="nav" style={{position:'unset'}}>
        <Toolbar>
          <Grid container spacing={2}>
            {navItems.map((item, index) => (
                <Grid key={index} item sx={
                  index===(navItems.length-1) 
                    ? {
                        textAlign: 'right',
                        flexGrow:  1
                      }
                    : {}
                }>{item}</Grid>
            ))}
          </Grid>
        </Toolbar>
      </AppBar>
      
      <Grid component="main" sx={{ p: 2}}>
        {location.pathname != "/" &&
          <Grid item md>
            <Button onClick={toggleShowInfo}>info</Button>
            <Information 
              information={data[location.pathname]} 
              open={showInfo} 
              onClose={toggleShowInfo}
            />
          </Grid>
        }
        <Outlet />
      </Grid>
    </Box>
    </CssBaseline>
  );
}

export default App;
