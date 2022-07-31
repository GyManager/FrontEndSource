import { React, useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { useFormik } from 'formik';

import { Typography, Box, Paper, Stack, TextField } from '@mui/material'

import DatePicker from './DatePicker'

import ButtonClientMobile from './ButtonClientMobile';
import ButtonClientDesktop from './ButtonClientDesktop';
import Breadcumbs from '../reusable/Breadcumbs'
import TipoDoc from './TipoDoc';
import Input from './Input';

import clientsService from '../../services/clients.service';
import GenericComboBox from '../reusable/GenericComboBox';
import clientSchema from './clientSchema';
// import EditIcon from '@mui/icons-material/Edit';

function Client() {

    const stackStyle = {
        direction: { xs: 'column', sm: 'column', md: 'row' },
        spacing: { xs: 2, sm: 2, md: 1 },
        sx: { mt: 2 }
    }

    const paperStyle = {
        elevation: 12,
        sx: { p: 2 }
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
                "tipoDocumento": formik.values.tipoDocumento,
                "nombre": formik.values.nombre,
                "apellido": formik.values.apellido,
                "sexo": formik.values.sexo,
                "mail": formik.values.mail,
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
                    navigate("/clientes")
                );
                //TODO NICO 4 No entiendo porque se viene por la rama del error y no me lo renderiza...
                // Si bien no jode para terminar de cargar el cliente, si necesitase recuperar 
                // su id si me joderia.
            } catch (err) {
                console.log('Error en componente client')
                console.log(err)
                alert(err)
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
        if (clienteId === 'new') {
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
            tipoDocumento: "",
            numeroDocumento: "",
            nombre: "",
            apellido: "",
            fechaNacimiento: "",
            sexo: "",
            mail: "",
            celular: "",
            direccion: "",
            objetivo: "",
            observaciones: ""
        },
        validationSchema: clientSchema.validationSchema,
        onSubmit: () => {
            handleSubmit()
        },
    });

    return (
        <div>
            <Breadcumbs
                names={['Clientes', 'Cliente']}
                urls={['../clientes/' ]}

            />
            <form
                method="post"
                onSubmit={formik.handleSubmit}>
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
                            handleSubmit={formik.handleSubmit}
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
                                    errorProp={formik.touched.tipoDocumento && Boolean(formik.errors.tipoDocumento)}
                                    helperTextProp={formik.touched.tipoDocumento && formik.errors.tipoDocumento}
                                />
                                <TextField fullWidth
                                    label="Numero de documento"
                                    id="numeroDocumento"
                                    variant="standard"
                                    value={formik.values.numeroDocumento}
                                    onChange={formik.handleChange}
                                    inputProps={{ readOnly: Boolean(!editable) }}
                                    error={formik.touched.numeroDocumento && Boolean(formik.errors.numeroDocumento)}
                                    helperText={formik.touched.numeroDocumento && formik.errors.numeroDocumento}

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
                                    error={formik.touched.nombre && Boolean(formik.errors.nombre)}
                                    helperText={formik.touched.nombre && formik.errors.nombre}
                                />
                                <TextField fullWidth
                                    label="Apellido"
                                    id="apellido"
                                    variant="standard"
                                    value={formik.values.apellido}
                                    onChange={formik.handleChange}
                                    inputProps={{ readOnly: Boolean(!editable) }}
                                    error={formik.touched.apellido && Boolean(formik.errors.apellido)}
                                    helperText={formik.touched.apellido && formik.errors.apellido}
                                />
                            </Stack>

                            <Stack {...stackStyle} sx={{ mt: 2 }}>
                                <DatePicker
                                    calendarValue={formik.values.fechaNacimiento}
                                    setFieldValue={formik.setFieldValue}
                                    editable={editable}
                                    errorProp={formik.touched.fechaNacimiento && Boolean(formik.errors.fechaNacimiento)}
                                    helperTextProp={formik.touched.fechaNacimiento && formik.errors.fechaNacimiento}
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
                                    error={formik.touched.mail && Boolean(formik.errors.mail)}
                                    helperText={formik.touched.mail && formik.errors.mail}

                                />
                                <TextField fullWidth
                                    label="Celular"
                                    id="celular"
                                    variant="standard"
                                    value={formik.values.celular}
                                    onChange={formik.handleChange}
                                    inputProps={{ readOnly: Boolean(!editable) }}
                                    error={formik.touched.celular && Boolean(formik.errors.celular)}
                                    helperText={formik.touched.celular && formik.errors.celular}
                                />
                                <TextField fullWidth
                                    label="Direccion"
                                    id="direccion"
                                    variant="standard"
                                    value={formik.values.direccion}
                                    onChange={formik.handleChange}
                                    inputProps={{ readOnly: Boolean(!editable) }}
                                    error={formik.touched.direccion && Boolean(formik.errors.direccion)}
                                    helperText={formik.touched.direccion && formik.errors.direccion}
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
                                    errorProp={formik.touched.objetivo && Boolean(formik.errors.objetivo)}
                                    helperTextProp={formik.touched.objetivo && formik.errors.objetivo}

                                />
                                <TextField fullWidth
                                    label="Observaciones"
                                    id="observaciones"
                                    variant="standard"
                                    value={formik.values.observaciones}
                                    onChange={formik.handleChange}
                                    inputProps={{ readOnly: Boolean(!editable) }}
                                    multiline
                                    error={formik.touched.observaciones && Boolean(formik.errors.observaciones)}
                                    helperText={formik.touched.observaciones && formik.errors.observaciones}

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
                    handleSubmit={formik.handleSubmit}
                />
            </form>
        </div>
    )
}

export default Client