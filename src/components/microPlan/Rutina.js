import React, { Fragment } from "react";
import { Box } from "@mui/system";
import { Accordion, AccordionDetails, AccordionSummary, Button, Divider, Paper, TextField, Typography } from "@mui/material";
import { Add, Delete } from "@mui/icons-material";
import { ExpandMore, WarningAmberRounded } from "@mui/icons-material";
import EjercicioAplicado from "./EjercicioAplicado";

export default function Rutina(props){

    const {errors = {}, touched = {}} = props;
    const errorPresent = (errors.nombre || errors.ejerciciosAplicados);
    
    return (
        <Accordion 
            TransitionProps={{unmountOnExit: true}}
            onChange={(event, isExpanded) => props.handleAccordion(isExpanded ? props.namePrefix : false)}
            expanded={props.expanded === props.namePrefix}
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
                                    removeEjercicio={() => props.removeEjercicio(props.indexRutina, index)}
                                />
                                {(index !== props.ejerciciosAplicados.length - 1) && <Divider sx={{my:4}}/>}
                            </Fragment>
                        )}
                        {
                            props.editable &&
                            <Button
                                size='medium'
                                variant='contained'
                                sx={{ maxWidth:{ xs:'100%', md:'30%'}, mt:3}}
                                startIcon={<Add />}
                                onClick={() => props.addEjercicio(props.indexRutina)}
                            >
                                Agregar ejercicio
                            </Button>
                        }
                </Paper>

                <Box sx={{display: 'flex', justifyContent: 'end'}}>
                    {
                        props.editable &&
                        <Button
                            size='small'
                            variant='outlined'
                            color="error"
                            sx={{ maxWidth:{ xs:'100%', md:'30%'}}}
                            startIcon={<Delete />}
                            onClick={() => props.removeRutina(props.indexRutina)}
                        >
                            Eliminar rutina
                        </Button>
                    }
                </Box>
            </AccordionDetails>

        </Accordion>
    )
}