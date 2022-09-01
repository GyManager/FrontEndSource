import React, { Fragment, useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { Box, Button, Modal, Paper, Skeleton, Stack, TextField, Typography } from '@mui/material/';
import { Add } from '@mui/icons-material';
import { useFormik } from 'formik';
import { AxiosError } from 'axios';
import { ParameterDropdownContext } from '../../context/ParameterDropdownContext';
import { SnackbarContext } from '../../context/SnackbarContext';
import { Breadcumbs, GenericComboBox, GenericModal } from '../reusable';
import DatePicker from '../reusable/DatePicker';
import FormOptions from '../reusable/FormOptions';
import MicroPlan from '../microPlan/MicroPlan';
import MicroPlanes from '../microPlanes/MicroPlanes';
import Observaciones from '../observaciones/Observaciones';
import planesService from '../../services/planes.service';
import microPlanesService from '../../services/micro-planes.service';
import authService from '../../services/auth.service';
import PlanMicroPlansTable from './PlanMicroPlanTable';
import planSchema from './planSchema';

export default function Plan() {

    let { clienteId, idPlan } = useParams();
    const navigate = useNavigate();

    const {addSnackbar} = useContext(SnackbarContext)
    const {objetivos} = useContext(ParameterDropdownContext)

    const [modalMsj, setModalMsj] = useState("");
    const [loading, setLoading] = useState(false);

    const [idMicroPlanEdicion, setIdMicroPlanEdicion] = useState()
    const [indexMicroPlanEdicion, setIndexMicroPlanEdicion] = useState()
    const [editarMicroPlan, setEditarMicroPlan] = useState(false)

    const [buscarMicroPlan, setBuscarMicroPlan] = useState(false)

    const [editarObservaciones, setEditarObservaciones] = useState(false)
    const [indexObservacionesEdicion, setIndexObservacionesEdicion] = useState()

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

    const handleCancel = () => {
        navigate(`/clientes/${clienteId}`)
    }

    const handleRespuesta = (respuesta, mensaje) => {
        if (respuesta instanceof AxiosError) {
            setModalMsj(respuesta.response.data.message)
        } else {
            navigate(`/clientes/${clienteId}`)
            addSnackbar({message: mensaje, severity: "success"})
        }
    }

    // Metodos para el control y edicion de observaciones
    const handleStartEditObservaciones = (index) => {
        setIndexObservacionesEdicion(index);
        setEditarObservaciones(true)
    }

    const handleCloseEditObservaciones = () => {
        setIndexObservacionesEdicion(null)
        setEditarObservaciones(false)
    }

    function handleSaveObservaciones(updatedObservaciones, index){
        formik.setFieldValue(`microPlans[${index}].observaciones`, updatedObservaciones, false)
        handleCloseEditObservaciones()
        addSnackbar({message: "Se han modificado las observaciones del micro plan", severity: "info", duration:2000})
    }

    function handleBuscarMicroPlan () {
        setBuscarMicroPlan(true)
    }    
    function handleCancelBuscarMicroPlan () {
        setBuscarMicroPlan(false)
    }

    function handleNewMicroPlan() {
        setBuscarMicroPlan(false)
        setEditarMicroPlan(true)
        setIdMicroPlanEdicion(null)
        setIndexMicroPlanEdicion(null)
    }

    function handleEditMicroPlan(index){
        setEditarMicroPlan(true)
        setIdMicroPlanEdicion(null)
        setIndexMicroPlanEdicion(index)
    }

    function handleEditNewMicroPlan(idMicroPlan){
        setBuscarMicroPlan(false)
        setEditarMicroPlan(true)
        setIdMicroPlanEdicion(idMicroPlan)
        setIndexMicroPlanEdicion(null)
    }

    function handleCancelEditMicroPlan(){
        setEditarMicroPlan(false)
        setIndexMicroPlanEdicion(null)
        setIdMicroPlanEdicion(null)
    }

    async function addMicroPlanById(idMicroPlan){
        const respuesta = await microPlanesService.getMicroPlanById(idMicroPlan);
        if (respuesta instanceof AxiosError) {
            setModalMsj(respuesta?.message)
        } else {
            addMicroPlan(respuesta)
            addSnackbar({message: "El micro plan ha sido asignado", severity: "info", duration:2000})
        }
        setBuscarMicroPlan(false)
    }

    function addNewMicroPlan(microPlan){
        addMicroPlan(microPlan)
        addSnackbar({message: "El micro plan asignado ha sido creado", severity: "info", duration:2000})
        handleCancelEditMicroPlan()
    }

    function addMicroPlan(microPlan){
        microPlan.idMicroPlan = null;
        microPlan.observaciones = [{observacion: '', numeroSemana: 1}];
        microPlan.esTemplate = false;
        microPlan.rutinas.forEach(rutina => {
            rutina.esTemplate = false;
            rutina.ejerciciosAplicados.forEach(ejercicioAplicado => ejercicioAplicado.esTemplate = false)
        })

        const newMicroPlans = formik.values.microPlans;
        newMicroPlans.push(microPlan)
        formik.setFieldValue('microPlans', newMicroPlans, false)
    }

    function updateMicroPlan(updatedMicroPlan, index){
        formik.setFieldValue(`microPlans[${index}]`, updatedMicroPlan, false)
        
        addSnackbar({message: "El micro plan asignado ha sido editado", severity: "info", duration:2000})
        handleCancelEditMicroPlan()
    }

    function handleDeleteMicroPlan(index){
        const newMicroPlans = formik.values.microPlans;
        newMicroPlans.splice(index,1)
        formik.setFieldValue('microPlans', newMicroPlans, false)
        addSnackbar({message: "El micro plan ha sido removido del plan", severity: "info", duration:2000})
    }


    if(editarMicroPlan){

        const microPlanEditado = indexMicroPlanEdicion !== null && indexMicroPlanEdicion !== undefined ? 
            formik.values.microPlans[indexMicroPlanEdicion] : null

        const handleSubmitMicroPlan = indexMicroPlanEdicion !== null && indexMicroPlanEdicion !== undefined ? 
            (updatedMicroPlan) => updateMicroPlan(updatedMicroPlan, indexMicroPlanEdicion) : addNewMicroPlan

        return (
            <MicroPlan
                esTemplate={false}
                editable={true}
                microPlan={microPlanEditado}
                idMicroPlan={idMicroPlanEdicion}
                handleSubmit={handleSubmitMicroPlan}
                handleDelete={() => handleDeleteMicroPlan(indexMicroPlanEdicion)}
                handleCancel={handleCancelEditMicroPlan}
                submitMessage={"Aceptar"}
                namesBreadcrums={['Clientes', 'Cliente', 'Plan']}
                urlsBreadcrums={['/clientes', `/clientes/${clienteId}`]}
            />
        )
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
                        handleCancelEdit={handleCancel}
                        handleSubmit={formik.handleSubmit}
                        enableDeleteAlways={(idPlan !== "new")}
                        handleDeleteClick={handleDelete}
                        id={idPlan}
                        deleteAlertTitle="Esta por eliminar el plan"
                    />
                </Box>

                <Paper elevation={1} sx={{p: 2}}>

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

                <Paper elevation={1} sx={{p: 2}}>
                    <Typography sx={{fontSize: {xs: 20, md: 22, lg: 24, xl: 28}}}>
                        {loading ? <Skeleton/> : `Micro planes`}
                    </Typography>

                    <PlanMicroPlansTable
                        loading={loading}
                        microPlans={formik.values.microPlans}
                        handleStartEditObservaciones={handleStartEditObservaciones}
                        handleEditMicroPlan={handleEditMicroPlan}
                        handleDeleteMicroPlan={handleDeleteMicroPlan}
                    />

                    <Button variant='contained' size='medium' onClick={handleBuscarMicroPlan}>
                        <Add /> Agregar Micro Plan 
                    </Button>
                </Paper>
            </Paper>
                
            <GenericModal
                show={modalMsj !== ""}
                hide={() => setModalMsj("")}
                serverMsj={modalMsj} 
            />

            { editarObservaciones &&
                <Observaciones
                    open={editarObservaciones}
                    microPlanIndex={indexObservacionesEdicion}
                    microPlanName={formik.values.microPlans[indexObservacionesEdicion].nombre}
                    observaciones={formik.values.microPlans[indexObservacionesEdicion].observaciones }
                    handleSave={handleSaveObservaciones}
                    handleClose={handleCloseEditObservaciones}
                />
            }
                
            <Modal
                open={buscarMicroPlan}
                onClose={handleCancelBuscarMicroPlan}
                sx={{display:'flex', alignItems:'center',justifyContent:'center'}}
            >
                <Box sx={{minWidth:'80%'}}>
                    <MicroPlanes
                        onSelectedMicroPlan={addMicroPlanById}
                        onNewMicroPlan={handleNewMicroPlan}
                        onCancelSearch={handleCancelBuscarMicroPlan}
                        cellEditAction={(idMicroPlan) => handleEditNewMicroPlan(idMicroPlan)}
                    />
                </Box>
            </Modal>
        </Fragment>
    )
}
