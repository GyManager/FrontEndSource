import { React, useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';

import { Typography, Box, Paper, Stack, Button } from '@mui/material'

import DatePicker from './DatePicker'

import ButtonClientMobile from './ButtonClientMobile';
import ButtonClientDesktop from './ButtonClientDesktop';
import TipoDoc from './TipoDoc';
import Input from './Input';

import clientsService from '../../services/clients.service';
import { Container } from '@mui/system';
import { date } from 'yup/lib/locale';
// import EditIcon from '@mui/icons-material/Edit';

function Client() {
    let { clienteId } = useParams();
    const [editable, setEditable] = useState(false)

    const [tipoDoc, setTipoDoc] = useState('');

    const [nombreTipoDoc, setNombreTipoDoc] = useState('')

    const handleChangeTipoDoc = (event) => {
        setTipoDoc(event.target.value);
        tipoDoc === 1 ? setNombreTipoDoc('DNI') :
            tipoDoc === 2 ? setNombreTipoDoc('Pasaporte') :
                tipoDoc === 3 ? setNombreTipoDoc('Otro') : console.log()
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

    // TODO NICO 001a
    // const [calendarValue, setCalendarValue] = useState(new Date('2014-08-18T21:11:54'));

    // const handleChangeCalendarValue = (newValue) => {
    //     setCalendarValue(newValue);
    // };

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
    //TODO NICO 005 Ver tema de formatos de fecha
    const handleSubmit = async (e) => {
        e.preventDefault();
        const actualTime = new Date();
        let actualTimeString = actualTime.toUTCString();
        console.log(actualTimeString)
        const cliente = {
            "usuario": {
                "numeroDocumento": Number(nroDoc),
                "tipoDocumento": nombreTipoDoc,
                "nombre": nombre,
                "apellido": apellido,
                "sexo": "Femenino",
                "mail": email,
                "celular": Number(celular),
                "fechaAlta": "2022-07-18",
                "fechaBaja": null
            },
            "objetivo": "Ganar masa muscular",
            "direccion": "Av Colon 4933",
            // "fechaNacimiento": calendarValue,
            "observaciones": "Algo gil"
        }
        console.log(cliente)
        setEditable(editable)
        if (clienteId === 'new') {
            // const postClient = async () => {
            console.log(clienteId)

            try {
                await clientsService.postClient(cliente).then(
                    () => {
                        console.log('El cliente se cargo con exito');
                    },
                );
                //TODO NICO 4 No entiendo porque se viene por la rama del error y no me lo renderiza...
                // Si bien no jode para terminar de cargar el cliente, si necesitase recuperar 
                // su id si me joderia.
            } catch (err) {
                console.log('Error en componente client')
                console.log(err)
            } finally {
                // esto deberia estar en la rama true (try/then)
                // console.log(response)
            }

        }
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
        <form
            method="post"
            onSubmit={handleSubmit}>
            {/* TODO 001 HACER UN COMPONENTE TIPOGRAPHY CON LOS TAMAÑOS DE LAS LETRAS PARA 
        REDUCIR MANTENIMINETO Y MEJORAR CONSISTENCIA   */}
            <Stack direction='row' justifyContent='space-between' alignItems='center'
                sx={{ width: { xs: '90vw', lg: '50vw' } }}
            >
                <Typography sx={{ fontSize: { xs: 24, md: 30, lg: 36, xl: 42 }, mb: '1vh' }} >
                    Cliente: {nombre} {apellido}
                </Typography>
                <div sx={{ display: { xs: 'none', sm: 'none', md: 'inline-block' } }}>
                    <ButtonClientDesktop
                        editable={editable}
                        setEditable={setEditable}
                        clienteId={clienteId}
                        handleSubmit={handleSubmit}

                    />
                </div>
            </Stack>
            <Box
                display='flex'
                flexWrap='flexwrap'
                justifyContent='center'

            >
                <div>
                    <Paper
                        elevation='12'
                    >
                        <Stack direction={{ xs: 'column', sm: 'column', md: 'row', }}
                            justifyContent='space-around'

                            sx={{
                                // backgroundColor: 'red',
                                width: { xs: '80vw', lg: '40vw' },
                            }}>
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
                        elevation='12'
                    >
                        <Stack direction={{ xs: 'column', sm: 'column', md: 'row' }}
                            sx={{
                                my: '1vh'
                            }} >
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
                            {/* TODO NICO 001b */}
                            <DatePicker
                            // calendarValue={calendarValue}
                            // handleChangeCalendarValue={handleChangeCalendarValue}

                            />

                        </Stack>
                    </Paper>
                    <Paper
                        elevation='12'
                    >
                        <Stack direction={{ xs: 'column', sm: 'column', md: 'row' }} >
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
                        elevation='12'
                    >
                        <Input label="Objetivo"
                            value={objetivo}
                            handleChange={handleChangeObjetivo}
                            editable={editable}
                        />
                    </Paper>
                    <Paper
                        elevation='12'
                    >
                        <Typography>Input - Medidas</Typography>
                    </Paper>
                    <Paper
                        elevation='12'
                        sx={{
                            backgroundColor: 'orange'
                        }}>
                        <Typography>Input - Planes</Typography>
                    </Paper>
                    <Paper
                        elevation='12'
                        sx={{
                            backgroundColor: 'lightblue'
                        }}>
                        <Typography>Input - Matriculas</Typography>
                    </Paper>
                </div>
            </Box>
            <ButtonClientMobile></ButtonClientMobile>
        </form>
    )
}

export default Client