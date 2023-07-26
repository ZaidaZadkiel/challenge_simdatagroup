import { Box, Grid, Paper } from "@mui/material";

function Info(){
  return (
    <Grid item>
      <Paper>
        <Box p={2}>
          <Grid container direction="column">
            <Grid item>
              <h3>Examen de Zaida Mascorro</h3>
            </Grid>
            <Grid item>
              <p>
              Correo: <a href="mailto:ladyzaida@hotmail.com">ladyzaida@hotmail.com</a><br/>
              Telefono: <a href="tel:+524741101900">+52 474 110 1900</a>
              </p>
              <p>
                El objetivo es crear 3 casos demostrando el uso de MUI y Typescript<br/>
                Para acceder a los casos, use los botones etiquetados "Caso #x" en la barra superior.<br/>
                Cada caso tiene un botón de información que muestra en qué consiste cada uno.
              </p> 
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Grid>
  );
}

export default Info;