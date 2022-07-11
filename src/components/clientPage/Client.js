import React from 'react'
import { Typography, Box, Paper, Stack } from '@mui/material'




function Client() {
    return (
        <div >

            {/* TODO 001 HACER UN COMPONENTE TIPOGRAPHY CON LOS TAMAÑOS DE LAS LETRAS PARA 
        REDUCIR MANTENIMINETO Y MEJORAR CONSISTENCIA   */}
            <Typography sx={{ fontSize: { xs: 24, md: 30, lg: 42 } }} >
                Cliente: Federico Garip
            </Typography>
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

        </div>


    )
}

export default Client