import { Grid, TextField } from "@mui/material";
import { ChangeEventHandler, useState } from "react";
import { LayoutProps } from "./Layout";

export interface SignupUserData {
  nombre          ?: string,
  apellido        ?: string,
  correo          ?: string,
  telefono        ?: string,
  password        ?: string,
  passwordconfirm ?: string
}

type validateChange = {
  (value: string): boolean
}

type validateFunction = ChangeEventHandler<HTMLInputElement>

export const validations: Record<string, validateChange> = {
  'name': (value: string)=>{
      if(value.length<2) return true;
      if(value.length>50) return true;
      return false;
    }
}

const ContentStepWelcome: React.ComponentType = ()=>{
  const [nameerror, setnameerror] = useState<boolean> (false);

  const validateName: validateFunction  = (e)=>{
    return setnameerror(validations.name(e.target.value));
  }

  return <Grid 
    container 
    direction={'column'}
    gap={2}
  >
    <Grid item>
      Gracias por Crear una cuenta nueva en el sistema,<br/>
      Para iniciar, por favor escriba su nombre y apellid, para continuar presione enter o continuar:
    </Grid>
    <Grid item>
      <TextField
        required
        error={nameerror}
        fullWidth
        id="name"
        label="Nombre"
        name="name"
        placeholder="Pancho"
        onChange={validateName}
      />
    </Grid>
    <Grid item>
      <TextField
        required
        fullWidth
        id="lastname"
        label="Apellido"
        name="lastname"
        placeholder="Villa"
      />
    </Grid>
  </Grid>
}

const PersonalInfo: React.ComponentType = ()=>{
  return <div>
    <Grid item>
      Proporcione su nombre y apellido
    </Grid>
    <Grid item>
      <TextField fullWidth id="name" label="Nombre" name="henlo" placeholder="henlo"/>
    </Grid>
  </div>
}

const EmailStep: React.ComponentType = ()=>(
  <div>
    <Grid item>
      Gracias por Crear una cuenta nueva en el sistema,<br/>
      Para iniciar, por favor escriba su nombre y presione enter o continuar:
    </Grid>
    <Grid item>
      <TextField fullWidth id="name" label="Nombre" name="henlo" placeholder="henlo"/>
    </Grid>
  </div>
)

const AccountReview: React.ComponentType = ()=>(
  <div>
    <Grid item>
      Gracias por Crear una cuenta nueva en el sistema,<br/>
      Para iniciar, por favor escriba su nombre y presione enter o continuar:
    </Grid>
    <Grid item>
      <TextField fullWidth id="name" label="Nombre" name="henlo" placeholder="henlo"/>
    </Grid>
  </div>
)

export const SignupSteps: LayoutProps['SignupSteps'] = [
  {
    title:  "Bienvenida",
    content: ContentStepWelcome
  },
  {
    title: "Datos Personales",
    content: PersonalInfo
  },
  {
    title: "Correo",
    content: EmailStep
  },
  {
    title: "Cuenta",
    content: AccountReview
  }
]

