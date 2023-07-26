import { Button, Grid, Paper, Step, StepButton, StepLabel, Stepper, TextField, useMediaQuery } from "@mui/material";
import { FormEventHandler, useState } from "react";

interface SignupUserData {
  nombre          ?: string,
  apellido        ?: string,
  correo          ?: string,
  telefono        ?: string,
  password        ?: string,
  passwordconfirm ?: string
}

const SignupSteps = [
  "Bienvenida",
  "Datos Personales",
  "Correo",
  "Cuenta",
]

function Caso1({}){
  const [formdata, setformdata] = useState<SignupUserData>({});
  const handleformdata: FormEventHandler<HTMLFormElement | HTMLInputElement> = (
    event: React.ChangeEvent<HTMLInputElement>
  )=>{
    console.log(event)
    setformdata({
      ...formdata,
      [event.target.name]: event.target.value
    });
  }

  const handleformsubmit = (
    event: React.FormEvent
  )=>{
    event.preventDefault()
    console.log(formdata, event)
  }

  return (
  <>
    <Paper>
    <Grid item xs p={2} >
      <form onChange={handleformdata} onSubmit={handleformsubmit}>
        {/* <Grid item>
          <TextField label="Nombre de Usuario" name="username" placeholder="Pancho Villa" />
        </Grid>
        <Grid item>
          <Button type="submit">Enviar</Button>
        </Grid> */}
        
        <SignupProcess/>
      </form>
      {JSON.stringify(formdata)}
    </Grid>
    </Paper>
  </>
  );
}

const SignupProcess: React.FunctionComponent<> = (

) => {
  const isSmallScreen = useMediaQuery('(max-width:600px)');
  return (
    <Stepper 
      activeStep={0} 
      alternativeLabel={(isSmallScreen)}
    >
      {SignupSteps.map(
        (step, index)=>
          <Step key={index} >
            <StepButton>{step} {isSmallScreen||'t'}</StepButton>
          </Step>
      )} 
    </Stepper>
  )
}

export default Caso1;