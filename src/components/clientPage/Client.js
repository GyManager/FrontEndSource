import React from 'react'
import { Typography, Box, Paper, Stack, Button } from '@mui/material'
import { Edit, Delete } from '@mui/icons-material/';
import ButtonClientMobile from './ButtonClientMobile';
// import EditIcon from '@mui/icons-material/Edit';



function Client() {
    return (
           <div>
                {/* TODO 001 HACER UN COMPONENTE TIPOGRAPHY CON LOS TAMAÑOS DE LAS LETRAS PARA 
        REDUCIR MANTENIMINETO Y MEJORAR CONSISTENCIA   */}
                <Stack direction='row' justifyContent='space-between'>
                    <Typography sx={{ fontSize: { xs: 24, md: 30, lg: 42 } }} >
                        Cliente: Federico Garip
                    </Typography>
                    <div sx={{ display: { xs: 'none', sm: 'none', md: 'inline-block' } }}>
                        <Button
                            sx={{ display: { xs: 'none', sm: 'none', md: 'inline-block' } }}
                            variant='contained'
                            startIcon={<Edit />}
                            size='large'
                        >Editar Cliente
                        </Button>
                        <Button
                            sx={{ display: { xs: 'none', sm: 'none', md: 'inline-block' } }}
                            variant='contained'
                            startIcon={<Delete />}
                            size='large'
                        >Borrar Cliente
                        </Button>
                    </div>
                </Stack >

                <Box
                    display='flex'
                    flexWrap='flexwrap'
                    justifyContent='center'
                >
                    <Paper
                        elevation='3'
                        sx={{
                            backgroundColor: 'lightblue'
                        }}>
                        <Paper
                            elevation='1'
                            sx={{
                                backgroundColor: 'lightblue'
                            }}>
                            <Stack direction={{ xs: 'column', sm: 'column', md: 'row' }}>
                                <Typography>Tipo de documento</Typography>
                                <Typography>Numero de documento</Typography>
                            </Stack>
                        </Paper>
                        <Paper
                            elevation='1'
                            sx={{
                                backgroundColor: 'orange'
                            }}>
                            <Stack direction={{ xs: 'column', sm: 'column', md: 'row' }}>
                                <Typography>Input - Nombre</Typography>
                                <Typography>Input - Apellido</Typography>
                                <Typography>DatePicker - Fecha de nacimiento </Typography>
                            </Stack>
                        </Paper>
                        <Paper
                            elevation='1'
                            sx={{
                                backgroundColor: 'lightblue'
                            }}>
                            <Stack direction={{ xs: 'column', sm: 'column', md: 'row' }}>
                                <Typography>Input - Email</Typography>
                                <Typography>Input - Numero de celular</Typography>
                                <Typography>Input - Direccion</Typography>
                            </Stack>
                        </Paper>

                        <Paper
                            elevation='1'
                            sx={{
                                backgroundColor: 'orange'
                            }}>
                            <Typography>Input - Objetivo Actual</Typography>
                        </Paper>

                        <Paper
                            elevation='1'
                            sx={{
                                backgroundColor: 'lightblue'
                            }}>
                            <Typography>Input - Medidas</Typography>
                        </Paper>

                        <Paper
                            elevation='1'
                            sx={{
                                backgroundColor: 'orange'
                            }}>
                            <Typography>Input - Planes</Typography>
                        </Paper>

                        <Paper
                            elevation='1'
                            sx={{
                                backgroundColor: 'lightblue'
                            }}>
                            <Typography>Input - Matriculas</Typography>
                        </Paper>
                    </Paper>
                </Box>
                <ButtonClientMobile></ButtonClientMobile>
                
                
                </div>

    )
}

export default Client