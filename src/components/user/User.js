// Import Librerias
import { React, useState, useEffect, useContext } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { useFormik } from 'formik';
import { AxiosError } from 'axios';

// Imports Vista
import { Typography, Box, Paper, Stack, TextField } from '@mui/material'
import { AlertDialog, Breadcumbs, GenericComboBox } from '../reusable'

import ButtonsUser from './ButtonsUser';
import ButtonUserMobile from "./ButtonUserMobile";
import SeccionRoles from './SeccionRoles'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

// Imports Datos
import usersService from '../../services/users.service';
import userSchema from './userSchema';
import { DataContext } from "../../context/DataContext";
import { ErrorContext } from '../../context/ErrorContext';
import { Button } from 'react-scroll';
import SeccionPassword from './SeccionPassword';

function User() {
    // Estados de Formik
    const formik = useFormik({
        initialValues: {
            numeroDocumento: "",
            tipoDocumento: "",
            nombre: "",
            apellido: "",
            mail: "",
            celular: "",
            roles: []
        },
        validationSchema: userSchema.validationSchema,
        onSubmit: () => {
            handleSubmit()
        },
    });

    //Error Message Handling Context
    const {processErrorMessage} = useContext(ErrorContext)

    //Estados del AlertDialog
    const [openAlertDialog, setOpenAlertDialog] = useState(false);
    const handleClickOpenAlertDialog = () => {
        setOpenAlertDialog(true);
    };

    // Estados compartidos del Snackbar (Contexto)
    const { setDataSnackbar } = useContext(DataContext)

    // Variables generales
    const navigate = useNavigate()
    let { idUsuario } = useParams();
    const [editable, setEditable] = useState(false)
    const logicalDelete = process.env.REACT_APP_LOGICAL_DELETE;

    const getUserById = async () => {
        try {
            await usersService.getUserById(idUsuario).then(
                (persona) => {
                    formik.setFieldValue('numeroDocumento', persona.numeroDocumento || '', false)
                    formik.setFieldValue('tipoDocumento', persona.tipoDocumento || '', false)
                    formik.setFieldValue('apellido', persona.apellido || '', false)
                    formik.setFieldValue('nombre', persona.nombre || '', false)
                    formik.setFieldValue('mail', persona.mail || '', false)
                    formik.setFieldValue('celular', persona.celular || '', false)
                    formik.setFieldValue('roles', persona.roles || '', false)
                }
            )
        } catch (error) {
            console.log(error)
        }
    }

    const handleSubmit = async (e) => {
        e?.preventDefault();
        //TODO HACER ESTE MAPEO DESDE EL SERVICE??? Hay que mandar la info...
        const usuarioSubmit = {
                "numeroDocumento": Number(formik.values.numeroDocumento),
                "tipoDocumento": formik.values.tipoDocumento,
                "nombre": formik.values.nombre,
                "apellido": formik.values.apellido,
                "mail": formik.values.mail,
                "celular": Number(formik.values.celular),
                "roles": formik.values.roles
        }
        if (idUsuario === 'new') {
            const respuesta = await usersService.postUser(usuarioSubmit)
            handleRespuesta(respuesta, 'El usuario ha sido creado con exito')
        } else {
            const respuesta = await usersService.putUser(usuarioSubmit, idUsuario)
            handleRespuesta(respuesta, 'El usuario ha sido modificado con exito')
        }
    }

    const deleteUsuario = async () => {
        const respuesta = await usersService.deleteUserById(idUsuario);
        handleRespuesta(respuesta, `El usuario ha sido ${logicalDelete ? 'desactivado' : 'borrado'} con exito`)
    }

    const handleRespuesta = (respuesta, mensaje) => {
        if (respuesta instanceof AxiosError) {
            processErrorMessage(respuesta.response.data)
        } else {
            navigate("/usuarios")
            console.log(mensaje)
            setDataSnackbar(mensaje)
        }
        AlertDialog(respuesta)
    }
    // console.log(userDataSnackbar)

    const handleCancelEdit = () => {
        if (idUsuario === 'new') {
            navigate("/usuarios");
        } else {
            setEditable(false)
            getUserById();
        }
    }

    useEffect(() => {
        if (idUsuario === 'new') {
            setEditable(true)
        } else {
            getUserById()
        }
    }, [])

    // Estilos compartidos
    const stackStyle = {
        direction: { xs: 'column', sm: 'column', md: 'row' },
        spacing: { xs: 2, sm: 2, md: 5 },
        sx: { mt: 2 }
    }

    const paperStyle = {
        elevation: 2,
        sx: {
            p: 2,
            my: 2,
            width: { xs: "80vw", md: "50vw" },
        },
    };

    const TextFieldStyle = {
        disabled: !editable,
        inputProps: { readOnly: Boolean(!editable) },
        variant: "standard",
        onChange: formik.handleChange,
    };

    return (
        <div>
            <form method="post" onSubmit={formik.handleSubmit}>
                <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                >
                    <div>
                        <Breadcumbs
                            names={["Usuarios", "Usuario"]}
                            urls={["../usuarios/"]}
                        />
                        <Typography
                            noWrap={true}
                            sx={{
                                width: { xs: "88vw", md: "45vw", lg: "40vw" },
                                fontSize: { xs: 24, md: 28, lg: 30, xl: 34 },
                                mb: "1vh",
                            }}
                        >
                            Usuario: {formik.values.nombre}{" "}
                            {formik.values.apellido}
                        </Typography>
                    </div>
                    <div
                        sx={{
                            display: {
                                xs: "none",
                                sm: "none",
                                md: "inline-block",
                            },
                            justifyContent: "right",
                        }}
                    >

                        <ButtonsUser
                            editable={editable}
                            handleEditClick={() => setEditable(true)}
                            handleDeleteClick={handleClickOpenAlertDialog}
                            handleCancelEdit={handleCancelEdit}
                            idUsuario={idUsuario}
                            handleSubmit={formik.handleSubmit}
                            hideDelete={formik.values.roles.length === 0}
                        />
                    </div>
                </Stack>
                <Box display="flex" flexWrap="flexwrap" justifyContent="center">

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

                                    errorProp={
                                        formik.touched.tipoDocumento &&
                                        Boolean(formik.errors.tipoDocumento)
                                    }
                                    helperTextProp={
                                        formik.touched.tipoDocumento &&
                                        formik.errors.tipoDocumento
                                    }
                                    autoFocusProp={true}
                                />
                                <TextField
                                    fullWidth
                                    {...TextFieldStyle}
                                    label="Numero de documento"
                                    id="numeroDocumento"
                                    value={formik.values.numeroDocumento}
                                    error={
                                        formik.touched.numeroDocumento &&
                                        Boolean(formik.errors.numeroDocumento)
                                    }
                                    helperText={
                                        formik.touched.numeroDocumento &&
                                        formik.errors.numeroDocumento
                                    }

                                />
                            </Stack>
                        </Paper>

                        <Paper {...paperStyle}>
                            <Stack {...stackStyle}>
                                <TextField
                                    fullwidth
                                    {...TextFieldStyle}
                                    label="Nombre"
                                    id="nombre"
                                    value={formik.values.nombre}
                                    error={
                                        formik.touched.nombre &&
                                        Boolean(formik.errors.nombre)
                                    }
                                    helperText={
                                        formik.touched.nombre &&
                                        formik.errors.nombre
                                    }
                                />
                                <TextField
                                    fullwidth

                                    {...TextFieldStyle}
                                    label="Apellido"
                                    id="apellido"
                                    value={formik.values.apellido}
                                    error={
                                        formik.touched.apellido &&
                                        Boolean(formik.errors.apellido)
                                    }
                                    helperText={
                                        formik.touched.apellido &&
                                        formik.errors.apellido
                                    }
                                />
                            </Stack>
                        </Paper>

                        <Paper {...paperStyle}>
                            <Stack {...stackStyle}>
                                <TextField
                                    fullWidth

                                    {...TextFieldStyle}
                                    label="Email"
                                    id="mail"
                                    value={formik.values.mail}

                                    error={
                                        formik.touched.mail &&
                                        Boolean(formik.errors.mail)
                                    }
                                    helperText={
                                        formik.touched.mail &&
                                        formik.errors.mail
                                    }
                                />
                                <TextField
                                    fullWidth

                                    {...TextFieldStyle}
                                    label="Celular"
                                    id="celular"
                                    value={formik.values.celular}
                                    error={
                                        formik.touched.celular &&
                                        Boolean(formik.errors.celular)
                                    }
                                    helperText={
                                        formik.touched.celular &&
                                        formik.errors.celular
                                    }
                                />
                            </Stack>
                        </Paper>

                        <Paper {...paperStyle}>
                            <SeccionRoles
                                formikRoles={formik.values.roles}
                                formikSetRoles={formik.setFieldValue}
                                editable={editable}
                            />
                        </Paper>

                        { idUsuario !== 'new' &&
                            <SeccionPassword
                                idUsuario={idUsuario}
                                paperStyle={paperStyle}
                                nombre={formik.values.nombre}
                                apellido={formik.values.apellido}
                            />
                        }

                    </div>
                </Box>
                <ButtonUserMobile
                    editable={editable}
                    handleEditClick={() => setEditable(true)}
                    handleDeleteClick={deleteUsuario}
                    handleCancelEdit={handleCancelEdit}
                    clienteId={idUsuario}
                    handleSubmit={formik.handleSubmit}
                    hideDelete={formik.values.roles.length === 0}
                />
            </form>

            <AlertDialog
                open={openAlertDialog}
                setOpen={setOpenAlertDialog}
                title={
                    `Está por ${logicalDelete ? 'desactivar' : 'eliminar'} al usuario `
                    + formik.values.nombre + ' ' + formik.values.apellido
                }
                content={`¿Seguro desea ${logicalDelete ? 'desactivarlo' : 'eliminarlo'}?`}
                buttonTextAccept={logicalDelete ? 'Desactivar' : 'Borrar'}
                buttonTextDeny='Cancelar'
                buttonActionAccept={deleteUsuario}
            >
                <DeleteForeverIcon color="warning" fontSize="medium" />
            </AlertDialog>
        </div>

    );
}
export default User;

