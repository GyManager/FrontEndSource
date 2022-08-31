import React, { Fragment, useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { Box, Button, Modal, Paper, Skeleton, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from '@mui/material/';
import { Breadcumbs, GenericComboBox, GenericModal } from '../reusable';
import planesService from '../../services/planes.service';
import { AxiosError } from 'axios';
import { ParameterDropdownContext } from '../../context/ParameterDropdownContext';
import DatePicker from '../reusable/DatePicker';
import { useFormik } from 'formik';
import FormOptions from '../reusable/FormOptions';
import { Add, Comment, Delete, Edit } from '@mui/icons-material';
import MicroPlan from '../microPlan/MicroPlan';
import MicroPlanes from '../microPlanes/MicroPlanes';
import microPlanesService from '../../services/micro-planes.service';
import { SnackbarContext } from '../../context/SnackbarContext';
import authService from '../../services/auth.service';
import Observaciones from '../observaciones/Observaciones';
import DeleteButtonWithAlert from '../reusable/buttons/DeleteButtonWithAlert';
import planSchema from './planSchema';

const paperStyle = {
    elevation:1,
    sx:{p: 2}
}

const skeleton = (
    <TableRow>
        <TableCell><Skeleton animation='wave'/></TableCell>
        <TableCell><Skeleton animation='wave'/></TableCell>
        <TableCell><Skeleton animation='wave'/></TableCell>
        <TableCell><Skeleton animation='wave'/></TableCell>
    </TableRow>
);

export default function Plan() {

    let { clienteId, idPlan } = useParams();
    const navigate = useNavigate();
    const {addSnackbar} = useContext(SnackbarContext)
    const {objetivos} = useContext(ParameterDropdownContext)

    const [modalMsj, setModalMsj] = useState("");
    const [loading, setLoading] = useState(false);
    const [microPlanEditing, setMicroPlanEditing] = useState()
    const [buscarMicroPlan, setBuscarMicroPlan] = useState(false)
    const [observacionesEditing, setObservacionesEditing] = useState()

    const formik = useFormik({
        initialValues: {
            descripcion: "",
            objetivo:"",
            fechaDesde: new Date(),
            microPlans: []
        },
        validationSchema: planSchema.validationSchema,
        onSubmit: () => {
            handleSubmit();
        },
    });

    const cantidadSemanas = formik.values.microPlans.flatMap(microPlan => microPlan.observaciones).length;
    const fechaHasta = Date.parse(formik.values.fechaDesde) + (cantidadSemanas * 7 * 24 * 60 * 60 * 1000);

    useEffect(() => {
        if (idPlan !== 'new') {
            const fetchData = async () => {
                setLoading(true)
                const respuesta = await planesService.getPlanById(idPlan);
                setLoading(false)
                if (respuesta instanceof AxiosError) {
                    console.log(respuesta)
                } else {
                    respuesta.microPlans = respuesta.microPlans.sort((a,b) => a.numeroOrden - b.numeroOrden)
                    formik.setValues(respuesta, false)
                }
            }
            fetchData();
        }
    }, [idPlan])

    const handleSubmit = async (e) => {
        e?.preventDefault();
        const plan = formik.values;
        plan.fechaHasta = new Date(Date.parse(formik.values.fechaDesde) + (cantidadSemanas * 7 * 24 * 60 * 60 * 1000));
        plan.microPlans.forEach((microPlan, index) => microPlan.numeroOrden = index + 1)
        if (idPlan === 'new') {
            plan.usuarioProfesor = authService.getStoredSession().mail;
            const respuesta = await planesService.postPlan(plan, clienteId)
            handleRespuesta(respuesta, 'El plan ha sido creado con exito')
        } else {
            const respuesta = await planesService.putPlan(formik.values, clienteId, idPlan)
            handleRespuesta(respuesta, 'El plan ha sido modificado con exito')
        }
    }

    const handleDelete = async () => {
        const respuesta = await planesService.deletePlanById(clienteId, idPlan);
        handleRespuesta(respuesta, 'El plan ha sido borrado con exito')
    }

    const handleRespuesta = (respuesta, mensaje) => {
        if (respuesta instanceof AxiosError) {
            setModalMsj(respuesta.response.data.message)
        } else {
            navigate(`/clientes/${clienteId}`)
            addSnackbar({message: mensaje, severity: "success"})
        }
    }

    function handleEditObservaciones(observacionesEdited, index){
        formik.setFieldValue(`microPlans[${index}].observaciones`, observacionesEdited, false)
        setObservacionesEditing(null)
        addSnackbar({message: "Se han modificado las observaciones del micro plan", severity: "info", duration:2000})
    }

    function handleDeleteMicroPlan(index){
        const newMicroPlans = formik.values.microPlans;
        newMicroPlans.splice(index,1)
        formik.setFieldValue('microPlans', newMicroPlans, false)
        addSnackbar({message: "El micro plan ha sido removido del plan", severity: "info", duration:2000})
    }

    function handleEditMicroPlan(microPlanEdited, index){
        if(index === 'new') {
            microPlanEdited.idMicroPlan = null;

            microPlanEdited.observaciones = [{observacion: '', numeroSemana: 1}];
            microPlanEdited.esTemplate = false;
            microPlanEdited.rutinas.forEach(rutina => {
                rutina.esTemplate = false;
                rutina.ejerciciosAplicados.forEach(ejercicioAplicado => ejercicioAplicado.esTemplate = false)
            })

            const newMicroPlans = formik.values.microPlans;
            newMicroPlans.push(microPlanEdited)
            formik.setFieldValue('microPlans', newMicroPlans, false)
            addSnackbar({message: "El micro plan asignado ha sido creado", severity: "info", duration:2000})
        } else {
            formik.setFieldValue(`microPlans[${index}]`, microPlanEdited, false)
            addSnackbar({message: "El micro plan asignado ha sido editado", severity: "info", duration:2000})
        }
        setMicroPlanEditing(null)
    }

    if(microPlanEditing !== undefined && microPlanEditing !== null){
        
        const microPlanEditado = microPlanEditing === 'new' ? null :
            microPlanEditing.idMicroPlanAEditar ? null : formik.values.microPlans[microPlanEditing];

        return (
            <MicroPlan
                esTemplate={false}
                editable={true}
                microPlan={microPlanEditado}
                idMicroPlan={microPlanEditing.idMicroPlanAEditar}
                handleSubmit={(microPlanEdited) => handleEditMicroPlan(microPlanEdited, microPlanEditing.idMicroPlanAEditar ? 'new' : microPlanEditing)}
                handleDelete={() => handleDeleteMicroPlan(microPlanEditing)}
                handleCancel={() => setMicroPlanEditing(null)}
                submitMessage={"Aceptar"}
                namesBreadcrums={['Clientes', 'Cliente', 'Plan']}
                urlsBreadcrums={['/clientes', `/clientes/${clienteId}`]}
            />
        )
    }

    async function handleSelectedMicroPlanFromSearch(idMicroPlan){
        const respuesta = await microPlanesService.getMicroPlanById(idMicroPlan);
        if (respuesta instanceof AxiosError) {
            setModalMsj(respuesta?.message)
        } else {
            respuesta.idMicroPlan = null;

            respuesta.observaciones = [{observacion: '', numeroSemana: 1}];
            respuesta.esTemplate = false;
            respuesta.rutinas.forEach(rutina => {
                rutina.esTemplate = false;
                rutina.ejerciciosAplicados.forEach(ejercicioAplicado => ejercicioAplicado.esTemplate = false)
            })

            const newMicroPlans = formik.values.microPlans;
            newMicroPlans.push(respuesta)
            formik.setFieldValue('microPlans', newMicroPlans, false)
            setBuscarMicroPlan(false)
            addSnackbar({message: "El micro plan ha sido asignado", severity: "info", duration:2000})
        }
    }

    return (
        <Fragment>
            <Paper 
                sx={{p:2, gap:3, display:'flex', flexDirection:'column'}} 
                component="form"
                onSubmit={formik.handleSubmit}
            >       
                <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                    <Box>
                        <Breadcumbs
                            names={['Clientes', 'Cliente', 'Plan']}
                            urls={['/clientes', `/clientes/${clienteId}`]}
                        />
                        <Typography sx={{fontSize: {xs: 24, md: 28, lg: 30, xl: 34}}}>
                            {loading ? <Skeleton/> : `Plan`}
                        </Typography>
                    </Box>
                    <FormOptions
                        editable={true}
                        handleCancelEdit={() => navigate(`/clientes/${clienteId}`)}
                        handleSubmit={formik.handleSubmit}
                        enableDeleteAlways={(idPlan !== "new")}
                        handleDeleteClick={handleDelete}
                        id={idPlan}
                        deleteAlertTitle="Esta por eliminar el plan"
                    />
                </Box>

                <Paper {...paperStyle}>

                    <TextField fullWidth
                        label="Descripcion"
                        id="descripcion"
                        name="descripcion"
                        variant="standard"
                        value={formik.values.descripcion || ''}
                        onChange={formik.handleChange}
                        multiline
                        error={formik.touched.descripcion && Boolean(formik.errors.descripcion)}
                        helperText={formik.touched.descripcion && formik.errors.descripcion}
                    />

                    <Stack 
                        direction={{xs: 'column', sm: 'column', md: 'row'}} 
                        spacing={{xs: 2, sm: 2, md: 5}} 
                        sx={{ mt: 3 }}
                    >
                        <GenericComboBox
                            label="Objetivo"
                            id="objetivo"
                            name="objetivo"
                            value={formik.values.objetivo || ''}
                            handleChange={formik.handleChange}
                            values={objetivos}
                            valueForNone=""
                            labelForNone=""
                            minWidth={250}
                            editable={true}
                            errorProp={formik.touched.objetivo  && Boolean(formik.errors.objetivo)}
                            helperTextProp={formik.touched.objetivo && formik.errors.objetivo}
                        />

                        <TextField fullWidth
                            label="Cantidad de semanas"
                            id="cantidadSemanas"
                            name="cantidadSemanas"
                            variant="standard"
                            value={cantidadSemanas || '0'}
                            sx={{width:{xs:'100%', md:'25%'}}}
                            disabled={true}
                        />

                        <DatePicker
                            value={formik.values.fechaDesde || ""}
                            id="fechaDesde"
                            name="fechaDesde"
                            label="Fecha desde"
                            editable={true}
                            onChange={formik.setFieldValue}
                            errorProp={formik.touched.fechaDesde && Boolean(formik.errors.fechaDesde)}
                            helperTextProp={formik.touched.fechaDesde && formik.errors.fechaDesde}
                        />
                        <DatePicker
                            value={fechaHasta || ""}
                            id="fechaHasta"
                            name="fechaHasta"
                            label="Fecha hasta"
                            editable={false}
                        />

                    </Stack>
                </Paper>

                <Paper {...paperStyle}>
                    <Typography sx={{fontSize: {xs: 20, md: 22, lg: 24, xl: 28}}}>
                        {loading ? <Skeleton/> : `Micro planes`}
                    </Typography>

                    <TableContainer sx={{mb:2}}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell > Numero </TableCell>
                                    <TableCell > Nombre </TableCell>
                                    <TableCell > Semanas </TableCell>
                                    <TableCell > Acciones </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    loading ? skeleton : 
                                    formik.values.microPlans.map((microPlan, index) => (
                                        <TableRow key={index}>
                                                <TableCell>{index + 1}</TableCell>
                                                <TableCell>{microPlan.nombre}</TableCell>
                                                <TableCell>{microPlan.observaciones? microPlan.observaciones.length : 0}</TableCell>
                                                <TableCell>
                                                    <Box sx={{display:'flex', gap:2}}>
                                                        <Button variant='contained' size='small' color='secondary' startIcon={<Comment />} onClick={() => setObservacionesEditing(index)}> Observaciones </Button>
                                                        <Button variant='contained' size='small' startIcon={<Edit />} onClick={() => setMicroPlanEditing(index)}> Editar </Button>
                                                        <DeleteButtonWithAlert
                                                            handleAccept={() => handleDeleteMicroPlan(index)}
                                                            buttonProps={{variant:"contained", size:"small", color:"error"}}
                                                            alertTitle={`Está por eliminar el micro plan ${microPlan.nombre}`}
                                                        />
                                                    </Box>
                                                </TableCell>
                                        </TableRow>
                                    ))
                                }
                            </TableBody>
                        </Table>
                    </TableContainer>

                    <Button variant='contained' size='medium' onClick={() => setBuscarMicroPlan(true)}>
                        <Add /> Agregar Micro Plan 
                    </Button>
                </Paper>
            </Paper>
                
            <GenericModal
                show={modalMsj !== ""}
                hide={() => setModalMsj("")}
                serverMsj={modalMsj} 
            />

            { observacionesEditing !== null && observacionesEditing !== undefined &&
                <Observaciones
                    open={observacionesEditing !== null && observacionesEditing !== undefined}
                    microPlanIndex={observacionesEditing}
                    microPlanName={formik.values.microPlans[observacionesEditing].nombre}
                    observaciones={formik.values.microPlans[observacionesEditing].observaciones }
                    handleSave={handleEditObservaciones}
                    handleClose={() => setObservacionesEditing(null)}
                />
            }
                
            <Modal
                open={buscarMicroPlan}
                onClose={() => setBuscarMicroPlan(false)}
                sx={{display:'flex', alignItems:'center',justifyContent:'center'}}
            >
                <Box sx={{minWidth:'80%'}}>
                    <MicroPlanes
                        onSelectedMicroPlan={handleSelectedMicroPlanFromSearch}
                        onNewMicroPlan={() => {setBuscarMicroPlan(false); setMicroPlanEditing('new')}}
                        onCancelSearch={() => setBuscarMicroPlan(false)}
                        cellEditAction={(idMicroPlan) => {{setBuscarMicroPlan(false); setMicroPlanEditing({idMicroPlanAEditar:idMicroPlan})}}}
                    />
                </Box>
            </Modal>
        </Fragment>
    )
}
