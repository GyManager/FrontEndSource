import React, { Fragment } from "react";
import { Box } from "@mui/system";
import { Accordion, AccordionDetails, AccordionSummary, Divider, Paper, TextField, Typography } from "@mui/material";
import { ExpandMore, WarningAmberRounded } from "@mui/icons-material";
import EjercicioAplicado from "./EjercicioAplicado";

export default function Rutina(props){

    const {errors = {}, touched = {}} = props;
    const errorPresent = (errors.nombre || errors.ejerciciosAplicados);
    
    return (
        <Accordion 
            TransitionProps={{unmountOnExit: true}}
            onChange={(event, isExpanded) => props.handleAccordion(isExpanded ? props.idRutina : false)}
            expanded={props.expanded === props.idRutina}
        >
            <AccordionSummary expandIcon={<ExpandMore />}>
                <Box sx={{display: 'flex'}}>
                    {!errorPresent ? '' : <WarningAmberRounded color='error' sx={{mr: 1}}/>}
                    <Typography color={!errorPresent ? '' : 'error'}>
                        Rutina {props.nombre}
                    </Typography>
                </Box>
            </AccordionSummary>

            <AccordionDetails>
                <Typography sx={{fontSize: { xs: 18, md: 24, lg: 30, xl: 36 }}}>
                    Rutina {props.nombre}
                </Typography>

                <TextField 
                    label="Nombre de la rutina"
                    id={`${props.namePrefix}.nombre`}
                    name={`${props.namePrefix}.nombre`}
                    value={props.nombre}
                    onChange={props.handleChange}
                    error={touched.nombre && Boolean(errors.nombre)}
                    helperText={touched.nombre && errors.nombre}
                    disabled={!props.editable}
                    variant="standard"
                    sx={{ minWidth:{ xs:'100%', md:'40%'}}}
                />

                <Paper elevation={1} sx={{ p: 2, my: 1}}>
                    <Typography sx={{fontSize: { xs: 12, md: 18, lg: 24, xl: 30 }}}>
                        Ejercicios
                    </Typography>
                    
                    {
                        props.ejerciciosAplicados.map((ejercicio, index) => 
                            <Fragment>
                                <EjercicioAplicado 
                                    key={ejercicio.idEjercicioAplicado}
                                    {...ejercicio}
                                    namePrefix={`${props.namePrefix}.ejerciciosAplicados[${index}]`}
                                    handleChange={props.handleChange}
                                    touched={touched.ejerciciosAplicados? touched.ejerciciosAplicados[index] : {}}
                                    errors={errors.ejerciciosAplicados? errors.ejerciciosAplicados[index] : {}}
                                    editable={props.editable} 
                                />
                                {(index !== props.ejerciciosAplicados.length - 1) && <Divider sx={{my:4}}/>}
                            </Fragment>
                        )}
                </Paper>
            </AccordionDetails>

        </Accordion>
    )
}