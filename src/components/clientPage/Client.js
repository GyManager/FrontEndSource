import { React, useState, useEffect } from 'react'
import { Typography, Box, Paper, Stack, Button } from '@mui/material'
import { Edit, Delete } from '@mui/icons-material/';

import ButtonClientMobile from './ButtonClientMobile';
import TipoDoc from './TipoDoc';
import Input from './Input';

import clientsService from '../../services/clients.service';
// import { useEffect } from 'react';
// import EditIcon from '@mui/icons-material/Edit';

function Client() {

    const [tipoDoc, setTipoDoc] = useState('');

    const handleChangeTipoDoc = (event) => {
        setTipoDoc(event.target.value);
    };

    const [nroDoc, setNroDoc] = useState('');
    const handleChangeNroDoc = (event) => {
        setNroDoc(event.target.value);
    }

    const [nombre, setNombre] = useState('');
    const handleChangeNombre = (e) => {
        setNombre(e.target.value)
    }

    const [apellido, setApellido] = useState('');
    const handleChangeApellido = (e) => {
        setApellido(e.target.value)
    }

    const [email, setEmail] = useState('');
    const handleChangeEmail = (e) => {
        setEmail(e.target.value)
    }

    const [celular, setCelular] = useState('');
    const handleChangeCelular = (e) => {
        setCelular(e.target.value)
    }

    const [direccion, setDireccion] = useState('');
    const handleChangeDireccion = (e) => {
        setDireccion(e.target.value)
    }

    const [objetivo, setObjetivo] = useState('');
    const handleChangeObjetivo = (e) => {
        setObjetivo(e.target.value)
    }


    const getClient = async () => {
        try {
            await clientsService.getClient(33).then(
                (arrayPerson) => {
                    console.log(arrayPerson)
                    const per = arrayPerson[0]
                    setTipoDoc(per.idTipoDocumento)
                    setNroDoc(per.numeroDocumento)
                    setNombre(per.nombre)
                    setApellido(per.apellido)
                    setEmail(per.mail)
                    setCelular(per.celular)
                    setDireccion(per.direccion)
                    setObjetivo(per.objetivo)
                }
            )
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(()=> {getClient() }, [])

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
                    >
                        <Paper
                            elevation='3'

                        >
                            <Stack direction={{ xs: 'column', sm: 'column', md: 'row' }}>
                                <TipoDoc
                                    tipoDoc={tipoDoc}
                                    handleChange={handleChangeTipoDoc}
                                />
                                <Input label="Numero de documento"
                                    value={nroDoc}
                                    handleChange={handleChangeNroDoc}
                                />
                            </Stack>
                        </Paper>
                        <Paper
                            elevation='1'
                        >
                            <Stack direction={{ xs: 'column', sm: 'column', md: 'row' }}>
                                <Input label="Nombre"
                                    value={nombre}
                                    handleChange={handleChangeNombre}
                                />
                                <Input label="Apellido"
                                    value={apellido}
                                    handleChange={handleChangeApellido}
                                />
                                <Typography>DatePicker - Fecha de nacimiento </Typography>
                            </Stack>
                        </Paper>
                        <Paper
                            elevation='1'
                        >
                            <Stack direction={{ xs: 'column', sm: 'column', md: 'row' }}>
                                <Input label="Email"
                                    value={email}
                                    handleChange={handleChangeEmail}
                                />
                                <Input label="Celular"
                                    value={celular}
                                    handleChange={handleChangeCelular}
                                />
                                <Input label="Direccion"
                                    value={direccion}
                                    handleChange={handleChangeDireccion}
                                />

                            </Stack>
                        </Paper>

                        <Paper
                            elevation='1'
                        >
                            <Input label="Objetivo"
                                value={objetivo}
                                handleChange={handleChangeDireccion}
                            />


                        </Paper>

                        <Paper
                            elevation='1'
                        >
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