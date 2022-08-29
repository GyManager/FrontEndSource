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
import { DataContext } from '../../context/DataContext';
import authService from '../../services/auth.service';
import Observaciones from '../observaciones/Observaciones';

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
    const {setDataSnackbar} = useContext(DataContext)
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
        // validationSchema: planSchema.validationSchema,
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
            handleRespuesta(respuesta, 'El micro plan ha sido creado con exito')
        } else {
            const respuesta = await planesService.putPlan(formik.values, clienteId, idPlan)
            handleRespuesta(respuesta, 'El micro plan ha sido modificado con exito')
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
            setDataSnackbar(mensaje)
        }
    }

    function handleEditObservaciones(observacionesEdited, index){
        formik.setFieldValue(`microPlans[${index}].observaciones`, observacionesEdited, false)
        setObservacionesEditing(null)
    }

    function handleDeleteMicroPlan(index){
        const newMicroPlans = formik.values.microPlans;
        newMicroPlans.splice(index,1)
        formik.setFieldValue('microPlans', newMicroPlans, false)
    }

    function handleEditMicroPlan(microPlanEdited, index){
        if(index === 'new') {
            microPlanEdited.idMicroPlan = null;

            microPlanEdited.esTemplate = false;
            microPlanEdited.rutinas.forEach(rutina => {
                rutina.esTemplate = false;
                rutina.ejerciciosAplicados.forEach(ejercicioAplicado => ejercicioAplicado.esTemplate = false)
            })

            const newMicroPlans = formik.values.microPlans;
            newMicroPlans.push(microPlanEdited)
            formik.setFieldValue('microPlans', newMicroPlans, false)
        } else {
            formik.setFieldValue(`microPlans[${index}]`, microPlanEdited, false)
        }
        setMicroPlanEditing(null)
    }

    if(microPlanEditing !== undefined && microPlanEditing !== null){
        
        const microPlanEditado = microPlanEditing !== 'new' ? formik.values.microPlans[microPlanEditing] : null;

        return (
            <MicroPlan
                esTemplate={false}
                editable={true}
                microPlan={microPlanEditado}
                handleSubmit={(microPlanEdited) => handleEditMicroPlan(microPlanEdited, microPlanEditing)}
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

            respuesta.esTemplate = false;
            respuesta.rutinas.forEach(rutina => {
                rutina.esTemplate = false;
                rutina.ejerciciosAplicados.forEach(ejercicioAplicado => ejercicioAplicado.esTemplate = false)
            })

            const newMicroPlans = formik.values.microPlans;
            newMicroPlans.push(respuesta)
            formik.setFieldValue('microPlans', newMicroPlans, false)
            setBuscarMicroPlan(false)
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
                                                        <Button variant='contained' size='small' color='error' startIcon={<Delete />} onClick={() => handleDeleteMicroPlan(index)}>  Borrar </Button>
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
                

            </Paper>
            
            <Modal
                open={buscarMicroPlan}
                onClose={() => setBuscarMicroPlan(false)}
                sx={{display:'flex', alignItems:'center',justifyContent:'center'}}
            >
                <MicroPlanes
                    onSelectedMicroPlan={handleSelectedMicroPlanFromSearch}
                    onNewMicroPlan={() => {setBuscarMicroPlan(false); setMicroPlanEditing('new')}}
                    onCancelSearch={() => setBuscarMicroPlan(false)}
                />
            </Modal>
        </Fragment>
    )
}
