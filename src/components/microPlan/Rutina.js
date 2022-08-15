import React from "react";
import { Accordion, AccordionDetails, AccordionSummary, Divider, Paper, TextField, Typography } from "@mui/material";
import EjercicioAplicado from "./EjercicioAplicado";
import { ExpandMore, WarningAmberRounded } from "@mui/icons-material";
import { Box } from "@mui/system";

export default function Rutina(props){

    const expanded = props.expanded === props.idRutina;
    const errorPresent = props.errors !== undefined && (props.errors.nombre || props.errors.ejerciciosAplicados);
    
    return(
        <Accordion TransitionProps={{ unmountOnExit: true }}
            onChange={(event, isExpanded) => props.handleAccordion(isExpanded? props.idRutina : false)}
            expanded={expanded}
        >
            <AccordionSummary
                expandIcon={<ExpandMore />}
                aria-controls="panel1a-content"
                id="panel1a-header"
            >  
                <Box sx={{ display: 'flex', flexDirection: 'row', gap:1, alignItems: 'center'}}>
                    {errorPresent ? <WarningAmberRounded color='error'/> : ''}
                    <Typography color={errorPresent? 'error' : ''}>Rutina {props.nombre}</Typography>
                </Box>
            </AccordionSummary>
            <AccordionDetails>
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
                        <div>
                            <EjercicioAplicado key={ejercicio.idEjercicioAplicado}
                                {...ejercicio}
                                paperStyle={props.paperStyle} 
                                editable={props.editable} 
                                handleChange={props.handleChange}
                                namePrefix={`${props.namePrefix}.ejerciciosAplicados[${index}]`}
                                touched={props.touched?.ejerciciosAplicados? props.touched.ejerciciosAplicados[index] : {}}
                                errors={props.errors?.ejerciciosAplicados? props.errors.ejerciciosAplicados[index] : {}}
                            />

                            {index !== props.ejerciciosAplicados.length - 1 && <Divider sx={{my:4}}/>}
                        </div>
                    )}
                </Paper>
            </AccordionDetails>
        </Accordion>
    )
}