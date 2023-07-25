import { Box, Button, Card, CardHeader, Container, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, Modal, Paper, TextField, Typography } from "@mui/material";
import { useState } from "react";

function Information({open, onClose}){
    return (
<Dialog 
    open={open}
    onClose={onClose}
    scroll="paper"
    aria-labelledby="scroll-dialog-title"
    aria-describedby="scroll-dialog-description"
>
    <DialogTitle id="scroll-dialog-title">Descripción del caso</DialogTitle>
        <DialogContent dividers={true}>
            <DialogContentText>
                <h4>Caso práctico 1</h4>
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
            </DialogContentText>
        </DialogContent>
    <DialogActions>
        <Button variant="contained" onClick={onClose}>Cerrar</Button>
    </DialogActions>
    </Dialog>
    );
}

function Caso1({}){
    const [showInfo, setShowInfo] = useState(false);
    const toggleShowInfo=()=>setShowInfo(!showInfo);
    const [formdata, setformdata] = useState({});
    const handleformdata = (event)=>{
        setformdata({
            ...formdata,
            [event.target.name]: event.target.value
        });
    }

    return (
    <>
            <Grid item md>
                <Button onClick={toggleShowInfo}>info</Button>
            </Grid>
            <Grid item xs>
                <Paper>
                    <form onChange={handleformdata}>
                        <TextField name="username" placeholder="yes" />
                    </form>
                    {JSON.stringify(formdata)}
                </Paper>
            </Grid>
        <Information open={showInfo} onClose={toggleShowInfo}/>
    </>
    );
}

export default Caso1;