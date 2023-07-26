import { Grid, TextField } from "@mui/material";
import { ChangeEventHandler, useState } from "react";
import { LayoutProps } from "./Layout";

/*
TODO: make something to check the values assigned to the object at runtime

currently I can do 
let obj: SignupUserData = {}

and at runtime have
<Input name="error_hardcoded" onChange={(e)=>obj[e.target.name] = value} />

it should have a check for e.target.name being within one of the values below
*/
export interface SignupUserData {
  nombre          ?: string,
  apellido        ?: string,
  correo          ?: string,
  telefono        ?: string,
  password        ?: string,
  passwordconfirm ?: string
}

type validateFunction = ChangeEventHandler<HTMLInputElement>
type validateChange   = (value: string, compare?: string) => string | undefined


export const validations: Record<keyof SignupUserData, validateChange> = {
  nombre: function(value){
    if (value.length < 2)  return "Debe tener almenos 2 letras";
    if (value.length > 50) return "Debe ser menor de 50 letras";
  },
  apellido: function(value){
    if (value.length < 2)  return "Debe tener almenos 2 letras";
    if (value.length > 50) return "Debe ser menor de 50 letras";
  },
  correo: function(value){
    if (value.indexOf('@')<0) return "Debe llevar @";
    if (value.length < 5)     return "Debe tener almenos 5 caracteres"; //a@b.c
    if (value.length > 50)    return "Debe ser menor de 50 letras";
  },
  telefono: function(value){
    // https://stackoverflow.com/questions/6960596/example-of-a-regular-expression-for-phone-numbers
    if(
      /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/.test(value) == false
    ) return "Numero telefónico inválido"
    if(value.length>20) return "Debe ser menor de 20 digitos"
  },
  password: function(value){
    if(value.length < 8)  return "Debe ser mas de 8 caracteres";
    if(value.length > 25) return "Debe ser menor de 25 caracteres";
    if(
      Array.from('!@#$%^&*').find(c=>value.indexOf(c)>=0) == undefined
    ) return "Debe incluir almenos uno de: ! @ # $ % ^ & *"
    if(
      /[A-Z]/.test(value) == false
    ) return "Debe contener letras Mayusculas";
    if(
      /[a-z]/.test(value) == false
    ) return "Debe contener letras minusculas";
    if(
      /\d/.test(value) == false
    ) return "Debe contener almenos un digito 0-9";
  },
  passwordconfirm: function(value, compare){
    if(value != compare) return "La contraseña no es igual en ambos campos";
  }
}


/* NOTICE: 
  manually check the input elements, 
  name and id properties exist in property names for SignupUserData 
  and that the returned root component id is in the format `view-${n}` 
  where n is the Sequential count in the assigned SignupSteps array
*/

const ContentStepWelcome = ({visible}:{visible:boolean})=>{
  const [nameerror,     setnameerror]     = useState<string|undefined> (undefined);
  const [lastnameerror, setlastnameerror] = useState<string|undefined> (undefined);

  const validateName: validateFunction = (e)=>{
    let message = validations.nombre(e.target.value);
    if(e.target.setCustomValidity) e.target.setCustomValidity(message||'')
    return setnameerror(message);
  }

  const validateLastname: validateFunction = (e)=>{
    let message = validations.apellido(e.target.value);
    if(e.target.setCustomValidity) e.target.setCustomValidity(message||'')
    return setlastnameerror(message);
  }

  return <Grid
    id="view-0" 
    container 
    direction={'column'}
    gap={2}
  >
    <Grid item>
      Gracias por Crear una cuenta nueva en el sistema,<br/>
      Para iniciar, por favor escriba su nombre y apellido, para continuar presione enter o continuar:
    </Grid>
    <Grid item>
      <TextField
        required={visible}
        fullWidth
        id="nombre" 
        label="Nombre"
        name="nombre"
        placeholder="Pancho"
        error={!!nameerror}
        helperText={nameerror||" "}
        onChange={validateName}
      />
    </Grid>
    <Grid item>
      <TextField
        required={visible}
        fullWidth
        id="apellido"
        label="Apellido"
        name="apellido"
        placeholder="Villa"
        error={!!lastnameerror}
        onChange={validateLastname}
        helperText={lastnameerror||" "}
      />
    </Grid>
  </Grid>
}

const PersonalInfo = ({visible}:{visible:boolean})=>{
  const [emailerror, setemailerror] = useState<string|undefined> (undefined);
  const [phoneerror, setphoneerror] = useState<string|undefined> (undefined);

  const validateEmail: validateFunction = (e)=>{
    let message = validations.correo(e.target.value);
    if(e.target.setCustomValidity) e.target.setCustomValidity(message||'')
    return setemailerror(message);
  }

  const validatePhone: validateFunction = (e)=>{
    let message = validations.telefono(e.target.value);
    if(e.target.setCustomValidity) e.target.setCustomValidity(message||'')
    return setphoneerror(message);
  }

  return <Grid
    id="view-1" 
    container 
    direction={'column'}
    gap={2}
  >
    <Grid item>
      A continuacion proporcione su correo electronico y su telefono de contacto.
    </Grid>
    <Grid item>
      <TextField
        required={visible}
        fullWidth
        type="email"
        id="correo"
        label="Correo Electronico"
        name="correo"
        placeholder="mi_email@correo.com"
        error={!!emailerror}
        onChange={validateEmail}
        helperText={emailerror||" "}
      />
    </Grid>
    <Grid item>
      <TextField
        required={visible}
        fullWidth
        id="telefono"
        label="Telefono"
        name="telefono"
        placeholder="018001234000"
        error={!!phoneerror}
        onChange={validatePhone}
        helperText={phoneerror||" "}
      />
    </Grid>
  </Grid>
}

const PasswordStep = ({visible}:{visible:boolean})=>{
  const [passworderror, setpassworderror] = useState<string|undefined> (undefined);
  const [confirmerror,  setconfirmerror]  = useState<string|undefined> (undefined);
  const [password,      setpassword]      = useState<string|undefined> (undefined);

  const validatePassword: validateFunction = (e)=>{
    setpassword(e.target.value)
    let message = validations.password(e.target.value);
    if(e.target.setCustomValidity) e.target.setCustomValidity(message||'')
    return setpassworderror(message);
  }

  const validateConfirm: validateFunction = (e)=>{
    let message = validations.passwordconfirm(e.target.value, password);
    if(e.target.setCustomValidity) e.target.setCustomValidity(message||'')
    return setconfirmerror(message);
  }

  return <Grid
    id="view-2" 
    container 
    direction={'column'}
    gap={2}
  >
    <Grid item>
      Por último paso, vamos a establecer una contraseña para su cuenta.<br/>
      Recuerde que este es un dato que no debe compartir con nadie,<br/>
      Por seguridad debe mezclar mayusculas y minusculas, e incluir almenos uno de estos caracteres especiales: ! @ # $ % ^ & *<br/>
      Asi como tener una longitud de más de 8 letras, y menor de 25 caracteres en total.

<br/>
    </Grid>
    <Grid item>
      <TextField
        required={visible}
        fullWidth
        id="password"
        label="Contraseña"
        name="password"
        placeholder="!01abAB*"
        error={!!passworderror}
        onChange={validatePassword}
        helperText={passworderror||" "}
      />
    </Grid>
    <Grid item>
      <TextField
        required={visible}
        fullWidth
        id="confirm"
        label="Confirmar Contraseña"
        name="passwordconfirm"
        placeholder="!01abAB*"
        error={!!confirmerror}
        onChange={validateConfirm}
        helperText={confirmerror||" "}
      />
    </Grid>
  </Grid>
}

const AccountReview = ({visible}:{visible:boolean})=>{
  if(visible) console.log('last');
  
  return <Grid
    id="view-3" 
    container 
    direction={'column'}
    gap={2}
  >
    <Grid item>
      Gracias por proporcionar su informacion<br/>
      Revise si la informacion que ha capturado es correcta y para terminar, precione "Enviar"
    </Grid>
    <Grid item>
      {/* TODO: show data review form, needs to find a way to get formdata here */}
    </Grid>
  </Grid>
}

/* TODO: make a generator for the root element with the proper view-N id 
  or figure out a way to get the content root some shareable html id prop
  in order to make the magic in onSubmit work
*/
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
    title: "Contraseña",
    content: PasswordStep
  },
  {
    title: "Revisar",
    content: AccountReview
  }
]

