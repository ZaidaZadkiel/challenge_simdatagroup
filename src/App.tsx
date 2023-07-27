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
import { Paper } from '@mui/material';

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
        <p>      
          Crear una aplicación web móvil de bebidas usando el api TheCocktailDB<br/>
          <a href="https://www.thecocktaildb.com/api.php">https://www.thecocktaildb.com/api.php</a><br/>
          La aplicación debe contener lo siguiente:
        </p>
        <ol type="a">
          <li>
            <b>Sección de búsqueda</b><br/>
            Mostrar un formulario para buscar una bebida en específico, realizar la búsqueda y mostrar los resultados mediante una lista tipo catalogo
            Cada elemento de la lista debe contener el nombre y la imagen de la bebida, así como un enlace para poder visualizar el detalle completo de la bebida en otra página a modo detalle.
            En el detalle mostrar información completa de la bebida, ingredientes, tags, etc.
            La información para mostrar dependerá de los datos que el api provee y lo que el usuario considere justo mostrar
          </li>
          <li>
            <b>Sección bebidas por categoría</b><br/>
            Obtener la lista de categorías, por cada categoría mostrar al menos 4 bebidas
            Al igual que la primera sección mostrar los elementos en una lista tipo catalogo y con su respectivo enlace para ver el detalle del registro
          </li>
          <li>
            <b>Diseño UIX</b><br/>
            El diseño es totalmente libre usando el framework MUI CORE, se tomará en cuenta experiencia de usuario al usar la aplicación, colores, propuesta, etc.
          </li>
        </ol>
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

  const navItems = [
    <Button variant="contained" disableElevation color="secondary" href="/#/caso1"><Hidden smDown>Caso</Hidden>#1</Button>,
    <Button variant="contained" disableElevation color="secondary" href="/#/caso2"><Hidden smDown>Caso</Hidden>#2</Button>,
    <Button variant="contained" disableElevation color="secondary" href="/#/caso3"><Hidden smDown>Caso</Hidden>#3</Button>,
    <Button variant="outlined"  disableElevation color="secondary" href="/#">Info</Button>
  ];

  return (
    <CssBaseline >
    <Box>

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
        <Paper sx={{p:2, whiteSpace:'normal', wordWrap:'break-word'}}>
          <Outlet />
        </Paper>
      </Grid>
    </Box>
    </CssBaseline>
  );
}

export default App;
