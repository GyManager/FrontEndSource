import React from "react";
import { Paper, TextField, Typography } from "@mui/material";
import EjercicioAplicado from "./EjercicioAplicado";

export default function Rutina(props){

    console.log("reload rutina")
    return(
        <Paper {...props.paperStyle}>

            <Typography sx={{ fontSize: { xs: 18, md: 24, lg: 30, xl: 36 } }}>
                Rutina {props.nombre}
            </Typography>

            <TextField 
                {...props.textFieldProps}
                label="Nombre de la rutina"
                id={`${props.namePrefix}.nombre`}
                name={`${props.namePrefix}.nombre`}
                error={props.touched.nombre && props.errors !== undefined && Boolean(props.errors.nombre)}
                helperText={props.touched.nombre && props.errors !== undefined && props.errors.nombre}
                onChange={props.handleChange}
                value={props.nombre}
                disabled={!props.editable}
                variant="standard"
                sx={{ minWidth:{ xs:'100%', md:'35%'}}}
            />

            <Paper {...props.paperStyle}>
                <Typography sx={{ fontSize: { xs: 12, md: 18, lg: 24, xl: 30 } }}>
                    Ejercicios
                </Typography>
                
                {props.ejerciciosAplicados.map((ejercicio, index) => 
                    <EjercicioAplicado key={ejercicio.idEjercicioAplicado}
                        {...ejercicio}
                        paperStyle={props.paperStyle} 
                        editable={props.editable} 
                        handleChange={props.handleChange}
                        namePrefix={`${props.namePrefix}.ejerciciosAplicados[${index}]`}
                        touched={props.touched?.ejerciciosAplicados? props.touched.ejerciciosAplicados[index] : {}}
                        errors={props.errors?.ejerciciosAplicados? props.errors.ejerciciosAplicados[index] : {}}
                    />
                )}
            </Paper>

        </Paper>
    )
}