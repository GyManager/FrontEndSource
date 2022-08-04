// Import Librerias
import { React, useState, useEffect, useContext } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { useFormik } from 'formik';
import { AxiosError } from 'axios';

// Imports Vista
import { Typography, Box, Paper, Stack, TextField } from '@mui/material'
import { AlertDialog, Breadcumbs, GenericComboBox } from '../reusable'
// import AlertDialog from '../reusable/AlertDialog'
// import Breadcumbs from '../reusable/Breadcumbs'
// import GenericComboBox from '../reusable/GenericComboBox'
import GenericModal from '../reusable/GenericModal'

// import { , Breadcumbs, GenericComboBox, Modal } from '../reusable/'
import DatePicker from './DatePicker'
import ButtonClientMobile from './ButtonClientMobile';
import ButtonClientDesktop from './ButtonClientDesktop';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

// Imports Datos
import clientsService from '../../services/clients.service';
import clientSchema from './clientSchema';
import { DataContext } from "../../context/DataContext";

function Client() {
    //Estados de Modal
    const [modalMsj, setModalMsj] = useState("");
    const [openModal, setOpenModal] = useState(false);
    const handleCloseModal = () => { setOpenModal(false) }

    //Estados del AlertDialog
    const [openAlertDialog, setOpenAlertDialog] = useState(false);
    const handleClickOpenAlertDialog = () => {
        setOpenAlertDialog(true);
    };

    // Estados compartidos del Snackbar (Contexto)
    const { setDataSnackbar } = useContext(DataContext)

    // Estilos compartidos
    const stackStyle = {
        direction: { xs: 'column', sm: 'column', md: 'row' },
        spacing: { xs: 2, sm: 2, md: 1 },
        sx: { mt: 2 }
    }

    const paperStyle = {
        elevation: 12,
        sx: { p: 2 , my: 2}
    }
    // Variables generales
    const navigate = useNavigate()
    let { clienteId } = useParams();
    const [editable, setEditable] = useState(false)

    const getClientById = async () => {
        try {
            await clientsService.getClientById(clienteId).then(
                (persona) => {
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
        //TODO HACER ESTE MAPEO DESDE EL SERVICE??? Hay que mandar la info...
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
        if (clienteId === 'new') {
            const respuesta = await clientsService.postClient(clienteSubmit)
            handleRespuesta(respuesta, 'El cliente ha sido creado con exito')
        } else {
            const respuesta = await clientsService.putClient(clienteSubmit, clienteId)
            handleRespuesta(respuesta, 'El cliente ha sido modificado con exito')
        }
        setEditable(false)
    }

    const deleteCliente = async () => {
        const respuesta = await clientsService.deleteClientById(clienteId);
        handleRespuesta(respuesta, 'El cliente ha sido borrado con exito')
    }

    const handleRespuesta = (respuesta, mensaje) => {
        if (respuesta instanceof AxiosError) {
            setModalMsj(respuesta.response.data.message)
            setOpenModal(true)
        } else {
            setOpenModal(true)
            navigate("/clientes")
            setDataSnackbar(mensaje)
        }
    }

    const handleCancelEdit = () => {
        if (clienteId === 'new') {
            navigate("/clientes");
        } else {
            setEditable(false)
            getClientById();
        }
    }

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
            <form
                method="post"
                onSubmit={formik.handleSubmit}>
                {/* TODO 001 HACER UN COMPONENTE TIPOGRAPHY CON LOS TAMAÑOS DE LAS LETRAS PARA 
        REDUCIR MANTENIMINETO Y MEJORAR CONSISTENCIA   */}
                <Stack direction='row' justifyContent='space-between' alignItems='center'
                    sx={{ width: { xs: '90vw', lg: '50vw' } }}
                >
                    <div>
                    <Breadcumbs
                        names={['Clientes', 'Cliente']}
                        urls={['../clientes/']}
                    />
                    <Typography sx={{ fontSize: { xs: 24, md: 30, lg: 36, xl: 42 }, mb: '1vh' }} >
                        Cliente: {formik.values.nombre} {formik.values.apellido}
                    </Typography>
                    </div>
                    <div sx={{
                        display: { xs: 'none', sm: 'none', md: 'inline-block' },
                        justifyContent:'right'
                    }}>
                        <ButtonClientDesktop
                            editable={editable}
                            handleEditClick={() => setEditable(true)}
                            handleDeleteClick={handleClickOpenAlertDialog}
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
                                    autoFocusProp={true}

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
            <GenericModal
                show={openModal}
                hide={handleCloseModal}
                serverMsj={modalMsj} />

            <AlertDialog
                open={openAlertDialog}
                setOpen={setOpenAlertDialog}
                title={
                    'Está por eliminar al cliente '
                    + formik.values.nombre + ' ' + formik.values.apellido
                }
                content='¿Seguro desea eliminarlo?'
                buttonTextAccept='Borrar'
                buttonTextDeny='Cancelar'
                buttonActionAccept={deleteCliente}
            >
                <DeleteForeverIcon color="warning" fontSize="medium" />
            </AlertDialog>
        </div>
    )
}
export default Client