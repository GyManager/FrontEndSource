import React from "react";
import { Paper, TextField, Typography } from "@mui/material";
import EjercicioAplicado from "./EjercicioAplicado";

export default function Rutina(props){
    return(
        <Paper {...props.paperStyle}>

            <Typography sx={{ fontSize: { xs: 18, md: 24, lg: 30, xl: 36 } }}>
                Rutina {props.nombre}
            </Typography>

            <TextField 
                {...props.textFieldProps}
                label="Nombre de la rutina"
                id="nombreRutina"
                value={props.nombre}
                disabled={!props.editable}
                variant="standard"
                sx={{ minWidth:{ xs:'100%', md:'35%'}}}
            />

            <Paper {...props.paperStyle}>
                <Typography sx={{ fontSize: { xs: 12, md: 18, lg: 24, xl: 30 } }}>
                    Ejercicios
                </Typography>
                
                {props.ejerciciosAplicados.map((ejercicio) => 
                    <EjercicioAplicado key={ejercicio.idEjercicioAplicado} paperStyle={props.paperStyle} {...ejercicio}/>
                )}
            </Paper>

        </Paper>
    )
}