import React, { Fragment } from "react";
import { Box } from "@mui/system";
import { Accordion, AccordionDetails, AccordionSummary, Divider, Paper, TextField, Typography } from "@mui/material";
import { ExpandMore, WarningAmberRounded } from "@mui/icons-material";
import EjercicioAplicado from "./EjercicioAplicado";

export default function Rutina(props){

    const errorPresent = props.errors !== undefined && (props.errors.nombre || props.errors.ejerciciosAplicados);
    
    return (
        <Accordion 
            TransitionProps={{unmountOnExit: true}}
            onChange={(event, isExpanded) => props.handleAccordion(isExpanded ? props.idRutina : false)}
            expanded={props.expanded === props.idRutina}
        >
            <AccordionSummary
                expandIcon={<ExpandMore />}
                aria-controls="panel1a-content"
                id="panel1a-header"
            >
                <Box sx={{display: 'flex', flexDirection: 'row', gap:1, alignItems: 'center'}}>
                    {
                        !errorPresent ? '' : 
                        <WarningAmberRounded color='error'/>
                    }
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
                    error={props.touched.nombre && props.errors !== undefined && Boolean(props.errors.nombre)}
                    helperText={props.touched.nombre && props.errors !== undefined && props.errors.nombre}
                    disabled={!props.editable}
                    variant="standard"
                    sx={{ minWidth:{ xs:'100%', md:'35%'}}}
                />

                <Paper elevation={1} sx={{ p: 2, my: 2}}>
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
                                    touched={props.touched?.ejerciciosAplicados? props.touched.ejerciciosAplicados[index] : {}}
                                    errors={props.errors?.ejerciciosAplicados? props.errors.ejerciciosAplicados[index] : {}}
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