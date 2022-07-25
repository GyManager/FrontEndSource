import { React, useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { useFormik } from 'formik';

import { Typography, Box, Paper, Stack, TextField } from '@mui/material'

import DatePicker from './DatePicker'

import ButtonClientMobile from './ButtonClientMobile';
import ButtonClientDesktop from './ButtonClientDesktop';
import TipoDoc from './TipoDoc';
import Input from './Input';

import clientsService from '../../services/clients.service';
import GenericComboBox from '../reusable/GenericComboBox';
import clientSchema from './clientSchema';
// import EditIcon from '@mui/icons-material/Edit';

function Client() {

    const stackStyle = {
        direction: { xs: 'column', sm: 'column', md: 'row' },
        spacing: { xs: 2, sm: 2, md:1},
        sx: { mt:2 }
    }

    const paperStyle = {
        elevation: 12,
        sx: { p:2 } 
    }
    
    const navigate = useNavigate()

    let { clienteId } = useParams();

    const [editable, setEditable] = useState(false)

    const getClientById = async () => {
        try {
            await clientsService.getClientById(clienteId).then(
                (persona) => {
                    console.log(persona)
                    formik.setFieldValue('numeroDocumento', persona.numeroDocumento || '', false)
                    formik.setFieldValue('tipoDocumento', persona.tipoDocumento || '', false)
                    formik.setFieldValue('apellido', persona.apellido || '', false)
                    formik.setFieldValue('nombre', persona.nombre || '', false)
                    formik.setFieldValue('mail', persona.mail || '', false)
                    formik.setFieldValue('fechaNacimiento', persona.fechaNacimiento || '', false)
                    formik.setFieldValue('sexo', persona.sexo || '', false)
                    formik.setFieldValue('objetivo', persona.objetivo || '', false)
                    formik.setFieldValue('celular', persona.celular || '', false)
                    formik.setFieldValue('direccion', persona.direccion || '', false)
                    formik.setFieldValue('observaciones', persona.observaciones || '', false)
                }
            )
        } catch (error) {
            console.log(error)
        }
    }
    
    const handleSubmit = async (e) => {
        e?.preventDefault();
        console.log("asd")
        const actualTime = new Date();
        let actualTimeString = actualTime.toUTCString();
        console.log(actualTimeString)
        const clienteSubmit = {
            "usuario": {
                "numeroDocumento": Number(formik.values.numeroDocumento),
                "tipoDocumento": formik.values.tipoDocumento ,
                "nombre": formik.values.nombre,
                "apellido": formik.values.apellido,
                "sexo": formik.values.sexo,
                "mail": formik.values.email,
                "celular": Number(formik.values.celular)
            },
            "objetivo": formik.values.objetivo,
            "direccion": formik.values.direccion,
            "fechaNacimiento": formik.values.fechaNacimiento,
            "observaciones": formik.values.observaciones 
        }
        console.log(clienteSubmit)
        console.log(clienteId)

        if (clienteId === 'new') {
            try {
                await clientsService.postClient(clienteSubmit).then(
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
                navigate("/clientes")
            }
        } else {
            try {
                await clientsService.putClient(clienteSubmit, clienteId).then(
                    () => {
                        console.log('El cliente se actualizo con exito');
                    },
                );
            } catch (err) {
                console.log('Error en componente client')
                console.log(err)
            } finally {
                setEditable(false)
            }
        }
    }

    const deleteCliente = () => {
        clientsService.deleteClientById(clienteId);
        navigate("/clientes");
    }

    const handleCancelEdit = () => {
        if(clienteId === 'new'){
            navigate("/clientes");
        } else {
            setEditable(false)
            getClientById();
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


    const formik = useFormik({
        initialValues: {
            numeroDocumento: "",
            tipoDocumento: "",
            apellido: "",
            nombre: "",
            mail: "",
            fechaNacimiento: "",
            sexo: "",
            objetivo: "",
            celular: "",
            direccion: "",
            observaciones: ""
        },
        validationSchema: clientSchema.validationSchema,
        onSubmit: () => {
            handleSubmit()
        },
    });

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
                    Cliente: {formik.values.nombre} {formik.values.apellido}
                </Typography>
                <div sx={{ display: { xs: 'none', sm: 'none', md: 'inline-block' } }}>
                    <ButtonClientDesktop
                        editable={editable}
                        handleEditClick={() => setEditable(true)}
                        handleDeleteClick={deleteCliente} 
                        handleCancelEdit={handleCancelEdit} 
                        clienteId={clienteId}
                        handleSubmit={handleSubmit}
                    />
                </div>
            </Stack>
            <Box display='flex' flexWrap='flexwrap' justifyContent='center'>
                <div>
                    <Paper {...paperStyle}>
                        <Stack {...stackStyle}>
                            <GenericComboBox
                                label="Tipo de documento"
                                id="tipoDocumento"
                                value={formik.values.tipoDocumento}
                                handleChange={formik.handleChange}
                                editable={editable}
                                valueForNone=""
                                labelForNone="Seleccionar tipo de documento"
                                values={["DNI", "Pasaporte"]}
                                minWidth={250}
                            />
                            <TextField fullWidth
                                label="Numero de documento"
                                id="numeroDocumento"
                                variant="standard"
                                value={formik.values.numeroDocumento}
                                onChange={formik.handleChange}
                                inputProps={{ readOnly: Boolean(!editable) }}
                            />
                        </Stack>
                    </Paper>

                    <Paper {...paperStyle}>
                        <Stack {...stackStyle}>
                            <TextField fullWidth
                                label="Nombre"
                                id="nombre"
                                variant="standard"
                                value={formik.values.nombre}
                                onChange={formik.handleChange}
                                inputProps={{ readOnly: Boolean(!editable) }}
                            />
                            <TextField fullWidth
                                label="Apellido"
                                id="apellido"
                                variant="standard"
                                value={formik.values.apellido}
                                onChange={formik.handleChange}
                                inputProps={{ readOnly: Boolean(!editable) }}
                            />
                        </Stack>                        
                        
                        <Stack {...stackStyle}sx={{mt:2}}>
                            <DatePicker
                                calendarValue={formik.values.fechaNacimiento}
                                handleChange={formik.handleChange}
                                editable={editable}
                            />

                            <GenericComboBox
                                label="Sexo"
                                id="sexo"
                                value={formik.values.sexo}
                                handleChange={formik.handleChange}
                                editable={editable}
                                valueForNone=""
                                labelForNone="Seleccionar sexo"
                                values={["Masculino", "Femenino", "No especifica"]}
                                minWidth={250}
                            />
                        </Stack>
                    </Paper>
                    
                    <Paper {...paperStyle}>
                        <Stack {...stackStyle}>
                            <TextField fullWidth
                                label="Email"
                                id="mail"
                                variant="standard"
                                value={formik.values.mail}
                                onChange={formik.handleChange}
                                inputProps={{ readOnly: Boolean(!editable) }}
                            />
                            <TextField fullWidth
                                label="Celular"
                                id="celular"
                                variant="standard"
                                value={formik.values.celular}
                                onChange={formik.handleChange}
                                inputProps={{ readOnly: Boolean(!editable) }}
                            />
                            <TextField fullWidth
                                label="Direccion"
                                id="direccion"
                                variant="standard"
                                value={formik.values.direccion}
                                onChange={formik.handleChange}
                                inputProps={{ readOnly: Boolean(!editable) }}
                            />
                        </Stack>
                    </Paper>

                    <Paper {...paperStyle}>
                        <Stack direction={'column'} spacing={2}>
                            <GenericComboBox
                                label="Objetivo"
                                id="objetivo"
                                value={formik.values.objetivo}
                                handleChange={formik.handleChange}
                                editable={editable}
                                valueForNone=""
                                labelForNone="Seleccionar objetivo"
                                values={["Ganar masa muscular", "Perder peso", "Tonificar", "No especifica"]}
                                minWidth={250}
                            />
                            <TextField fullWidth
                                label="Observaciones"
                                id="observaciones"
                                variant="standard"
                                value={formik.values.observaciones}
                                onChange={formik.handleChange}
                                inputProps={{ readOnly: Boolean(!editable) }}
                                multiline
                            />
                        </Stack>
                    </Paper>

                    <Paper elevation={12}>
                        <Typography>Input - Medidas</Typography>
                    </Paper>

                    <Paper
                        elevation={12}
                        sx={{
                            backgroundColor: 'orange'
                        }}>
                        <Typography>Input - Planes</Typography>
                    </Paper>

                    <Paper
                        elevation={12}
                        sx={{
                            backgroundColor: 'lightblue'
                        }}>
                        <Typography>Input - Matriculas</Typography>
                    </Paper>
                </div>
            </Box>
            <ButtonClientMobile
                editable={editable}
                handleEditClick={() => setEditable(true)}
                handleDeleteClick={deleteCliente} 
                handleCancelEdit={handleCancelEdit} 
                clienteId={clienteId}
                handleSubmit={handleSubmit}
            />
        </form>
    )
}

export default Client