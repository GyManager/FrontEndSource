import { Add, ArrowBackIos, ArrowForwardIos, Cancel, Delete, Save } from '@mui/icons-material';
import { Modal, Box, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, TextField, Paper, Stack } from '@mui/material/';
import { useEffect, useState } from "react";

export default function Observaciones(props){

    const [observaciones, setObservaciones] = useState(() => {
        if(props.observaciones !== null && props.observaciones !== undefined && props.observaciones.length > 0){
            return props.observaciones.sort((a,b) => a.numeroSemana - b.numeroSemana)
        }
        return [{observacion: ''}]
    });

    useEffect(() => {
        if(props.observaciones !== null && props.observaciones !== undefined && props.observaciones.length > 0){
            setObservaciones(props.observaciones.sort((a,b) => a.numeroSemana - b.numeroSemana))
        } else {
            setObservaciones([{observacion:''}])
        }

    }, [props.observaciones])

    function handleDeleteObservaciones(index){
        if(observaciones.length > 1){
            setObservaciones(prev => {
                prev.splice(index,1)
                return [...prev]
            })
        }
    }

    function addObservacion(){
        setObservaciones(prev => [...prev, {observacion: ''}])
    }

    function updateObservacion(event, index){
        const newObservacion = event.target.value;
        if(newObservacion.length <= 500){
            setObservaciones(prev => {
                prev[index] = {...(prev[index]), observacion: newObservacion};
                return [...prev]
            })
        }
    }

    function saveObservaciones(event){
        event?.preventDefault();
        const observacionesListas = observaciones;
        observacionesListas.forEach((observacion, index) => observacion.numeroSemana = index + 1)

        props.handleSave(observacionesListas, props.microPlanIndex)
    }

    function nextObservacion(event){
        event?.preventDefault();
        const observacionesListas = observaciones;
        observacionesListas.forEach((observacion, index) => observacion.numeroSemana = index + 1)

        props.handleNext(observacionesListas, props.microPlanIndex)
    }

    function previousObservacion(event){
        event?.preventDefault();
        const observacionesListas = observaciones;
        observacionesListas.forEach((observacion, index) => observacion.numeroSemana = index + 1)

        props.handlePrevious(observacionesListas, props.microPlanIndex)
    }

    return (
        <Modal
            open={props.open !== null && props.open !== undefined}
            onClose={props.handleClose}
            sx={{display:'flex', alignItems:'center',justifyContent:'center'}}
        >
            <Paper 
                sx={{
                    display:'flex',
                    flexDirection: 'column',
                    p: 4,
                    bgcolor: '#FFF',
                    // border: '2px solid #000',
                    width:{xs:'100%', md:'80%'}
                }}
            >
                <Stack direction="row"
                    justifyContent="space-around"
                    alignItems="center"
                    spacing={2}
                >
                    <Button
                        variant='contained' 
                        size='medium' 
                        startIcon={<ArrowBackIos />} 
                        sx={{width:'fit-content'}} 
                        onClick={previousObservacion}
                    >
                        Anterior
                    </Button>
                    <Typography  variant="h5" component="h5" align="center">
                        Observaciones Micro Plan <br/> "{props.microPlanName}"
                    </Typography>
                    <Button
                        variant='contained' 
                        size='medium' 
                        endIcon={<ArrowForwardIos />} 
                        sx={{width:'fit-content'}} 
                        onClick={nextObservacion}
                    >
                        Siguiente
                    </Button>
                </Stack>

                <Typography  variant="h5" component="h5">
                    Cantidad de semanas: {observaciones? observaciones.length : 0}
                </Typography>

                <TableContainer sx={{ height:{ xs: '64vh', md:'55vh'}, mb:2}}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell> Semana </TableCell>
                                <TableCell> Observaciones </TableCell>
                                <TableCell>  </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                observaciones.map((observacion, index) => (
                                    <TableRow key={index}>
                                            <TableCell>{index + 1 || ''}</TableCell>
                                            <TableCell>
                                                <TextField fullWidth
                                                    name="observacion"
                                                    variant="standard"
                                                    value={observacion.observacion || ''}
                                                    onChange={(event) => updateObservacion(event, index)}
                                                    inputProps={{ min: 0, max: 10}}
                                                    multiline
                                                />
                                            </TableCell>
                                            <TableCell>
                                                <Box sx={{display:'flex'}}>
                                                    <Button 
                                                        variant='outlined' 
                                                        size='small' 
                                                        color='error'
                                                        onClick={() => handleDeleteObservaciones(index)}
                                                    >
                                                        <Delete />
                                                    </Button>
                                                </Box>
                                            </TableCell>
                                    </TableRow>
                                ))
                            }
                        </TableBody>
                    </Table>
                </TableContainer>

                <Button 
                    variant='contained' 
                    size='medium' 
                    startIcon={<Add />} 
                    sx={{width:'fit-content'}} 
                    onClick={addObservacion}
                >
                    Agregar Semana
                </Button>

                <Box sx={{display:'flex', justifyContent:'end', mt:2, gap:2}}>
                    <Button
                        variant='outlined' 
                        size='medium' 
                        startIcon={<Save />}
                        onClick={saveObservaciones}
                    >
                        Guardar
                    </Button>
                    <Button
                        variant='outlined'
                        size='medium' 
                        color='secondary'
                        startIcon={<Cancel/>}
                        onClick={props.handleClose}
                    >
                        Cancelar
                    </Button>
                </Box>
            </Paper>
        </Modal>
    )
}