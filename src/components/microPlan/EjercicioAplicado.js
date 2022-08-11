import React, { useState, useEffect } from "react";
import { Paper, Stack, TextField, Typography } from "@mui/material";
import { GenericComboBox } from "../reusable";

export default function EjercicioAplicado(props){

    const stackStyle = {
        direction: { xs: 'column', sm: 'column', md: 'row' },
        spacing: { xs: 2, sm: 2, md: 5 },
        sx: { mt: 2 }
    }

    const textFieldProps = {
        disabled: !props.editable,
        variant: "standard",
    }

    return(
        <Paper {...props.paperStyle}>
            <Stack {...stackStyle}>
                <GenericComboBox
                    label="Tipo de Ejercicio"
                    id="tipoEjercicio"
                    value={props.tipoEjercicio}
                    valueForNone=""
                    labelForNone="Seleccionar..."
                    values={["Musculacion", "Cardio", props.tipoEjercicio]}
                    minWidth={250}
                />
                <GenericComboBox
                    label="Ejercicio"
                    id="ejercicio"
                    value={props.nombreEjercicio}
                    valueForNone=""
                    labelForNone="Seleccionar..."
                    values={["", props.nombreEjercicio]}
                    minWidth={250}
                />
                <GenericComboBox
                    label="Bloque"
                    id="bloque"
                    value={props.bloque}
                    valueForNone=""
                    labelForNone="Seleccionar..."
                    values={["", props.bloque]}
                    minWidth={250}
                />
            </Stack>

            <Stack {...stackStyle}>
                <TextField 
                    {...textFieldProps}
                    label="Series"
                    value={props.series}
                    sx={{ minWidth:{ xs:'100%', md:'10%'}}}
                />
                <TextField 
                    {...textFieldProps}
                    label="Repeticiones"
                    value={props.repeticiones}
                    sx={{ minWidth:{ xs:'100%', md:'10%'}}}
                />
                <TextField 
                    {...textFieldProps}
                    label="Pausa Micro"
                    value={props.pausaMicro}
                    sx={{ minWidth:{ xs:'100%', md:'10%'}}}
                />
                <TextField 
                    {...textFieldProps}
                    label="Pausa Macro"
                    value={props.pausaMacro}
                    sx={{ minWidth:{ xs:'100%', md:'10%'}}}
                />
                <TextField 
                    {...textFieldProps}
                    label="Tiempo"
                    value={props.tiempo}
                    sx={{ minWidth:{ xs:'100%', md:'10%'}}}
                />
                <TextField 
                    {...textFieldProps}
                    label="Carga"
                    value={props.carga}
                    sx={{ minWidth:{ xs:'100%', md:'10%'}}}
                />
            </Stack>
        </Paper>
    )
}