import { React, useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';

import { Typography, Box, Paper, Stack, Button } from '@mui/material'
import { Edit, Delete, Save } from '@mui/icons-material/';

import ButtonClientMobile from './ButtonClientMobile';
import TipoDoc from './TipoDoc';
import Input from './Input';

import clientsService from '../../services/clients.service';
// import EditIcon from '@mui/icons-material/Edit';

function Client() {
    let { clienteId } = useParams();
    const [editable, setEditable] = useState(false)

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

    const getClientById = async () => {
        try {
            await clientsService.getClientById(clienteId).then(
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

    const putClient = async () => {
        const cliente = {
            "mail": email,
            "numeroDocumento": nroDoc,
            "idTipoDocumento": tipoDoc,
            "nombre": nombre,
            "apellido": apellido,
            "direccion": direccion,
            "fechaNacimiento": "1995-05-30T03:00:00.000+00:00",
            "celular": celular,
            "objetivo": objetivo
        }
        try {
            await clientsService.putClient(clienteId, cliente)
        } catch (error) {
            console.log('Error ')
        }
    }

    const handleClickEditarCliente = () => {
        setEditable(!editable)
        //Si estaba en modo de edicion, quiero hacer un post con los nuevos datos. pero arriba cambie el modo de edicion asi que:
        // me voy por la rama del false
        if (editable) {
        } else {
            putClient()
            // TODO 005
        }
        // editable ? null : putClient
    }
    // TODO 004 ver el error y leer sobre los hooks useEffect, debe estar vacia?
    // debe tener un array
    useEffect(() => {
        if (clienteId === 'new') {
            setEditable(true)
        } else {
            getClientById()
        }
    }, [])
    return (
        <div>
            {/* TODO 001 HACER UN COMPONENTE TIPOGRAPHY CON LOS TAMAÑOS DE LAS LETRAS PARA 
        REDUCIR MANTENIMINETO Y MEJORAR CONSISTENCIA   */}
            <Stack direction='row' justifyContent='space-between' alignItems='center'>
                <Typography sx={{ fontSize: { xs: 20, md: 24, lg: 32 } }} >
                    Cliente: {nombre} {apellido}
                </Typography>
                <div sx={{ display: { xs: 'none', sm: 'none', md: 'inline-block' } }}>
                    <Button
                        sx={{ display: { xs: 'none', sm: 'none', md: 'inline-block' } }}
                        variant='contained'
                        startIcon={editable ? <Save /> : <Edit />}
                        size='medium'
                        onClick={handleClickEditarCliente}
                    >
                        {editable ? "Guardar Cliente" : "Editar Cliente"}
                    </Button>
                    {
                        clienteId === 'new'
                            ?
                            null
                            :
                            <Button
                                sx={{ display: { xs: 'none', sm: 'none', md: 'inline-block' } }}
                                variant='contained'
                                startIcon={<Delete />}
                                size='medium'
                            >Borrar Cliente
                            </Button>
                    }
                </div>
            </Stack>
            <Box
                display='flex'
                flexWrap='flexwrap'
                justifyContent='center'
            >
                <Paper
                    elevation='3'
                    // TODO 007

                >
                    <Paper
                        elevation='3'
                    >
                        <Stack direction={{ xs: 'column', sm: 'column', md: 'row' }}>
                            <TipoDoc
                                tipoDoc={tipoDoc}
                                handleChange={handleChangeTipoDoc}
                                editable={editable}
                            />
                            <Input label="Numero de documento"
                                value={nroDoc}
                                handleChange={handleChangeNroDoc}
                                editable={editable}
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
                                editable={editable}
                            />
                            <Input label="Apellido"
                                value={apellido}
                                handleChange={handleChangeApellido}
                                editable={editable}
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
                                editable={editable}
                            />
                            <Input label="Celular"
                                value={celular}
                                handleChange={handleChangeCelular}
                                editable={editable}
                            />
                            <Input label="Direccion"
                                value={direccion}
                                handleChange={handleChangeDireccion}
                                editable={editable}
                            />
                        </Stack>
                    </Paper>
                    <Paper
                        elevation='1'
                    >
                        <Input label="Objetivo"
                            value={objetivo}
                            handleChange={handleChangeObjetivo}
                            editable={editable}
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