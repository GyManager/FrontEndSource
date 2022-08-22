import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { Box, Button, fabClasses, Paper, Skeleton, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from '@mui/material/';
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

export default function Plan() {

    let { clienteId, idPlan } = useParams();
    const navigate = useNavigate();
    const [modalMsj, setModalMsj] = useState("");
    const [loading, setLoading] = useState(false);
    const {setDataSnackbar} = useContext(DataContext)
    
    const [microPlanEditing, setMicroPlanEditing] = useState()
    const [buscarMicroPlan, setBuscarMicroPlan] = useState(false)

    const { objetivos } = useContext(ParameterDropdownContext)

    const formik = useFormik({
        initialValues: {
            descripcion: "",
            objetivo:"",
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
        const fetchData = async () => {
            setLoading(true)
            const respuesta = await planesService.getPlanById(idPlan);
            setLoading(false)
            if (respuesta instanceof AxiosError) {
                console.log(respuesta)
            } else {
                formik.setValues(respuesta, false)
            }
        }
        fetchData();
    }, [idPlan])

    const handleSubmit = async (e) => {
        e?.preventDefault();
        if (idPlan === 'new') {
            const respuesta = await planesService.postPlan(formik.values, clienteId)
            handleRespuesta(respuesta, 'El micro plan ha sido creado con exito')
        } else {
            const respuesta = await planesService.putPlan(formik.values, clienteId, idPlan)
            handleRespuesta(respuesta, 'El micro plan ha sido modificado con exito')
        }
    }

    const handleRespuesta = (respuesta, mensaje) => {
        if (respuesta instanceof AxiosError) {
            setModalMsj(respuesta.response.data.message)
        } else {
            navigate(`/clientes/${clienteId}`)
            setDataSnackbar(mensaje)
        }
    }

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

    function editMicroPlan(index){
        setMicroPlanEditing(index);
    }

    function handleDeleteMicroPlan(index){
        const newMicroPlans = formik.values.microPlans;
        newMicroPlans.splice(index,1)
        formik.setFieldValue('microPlans', newMicroPlans, false)
    }

    function handleEditMicroPlan(microPlanEdited, index){
        formik.setFieldValue(`microPlans[${index}]`, microPlanEdited, false)
        setMicroPlanEditing(null)
    }

    if(microPlanEditing !== undefined && microPlanEditing !== null){
        return (
            <MicroPlan
                esTemplate={false}
                editable={true}
                microPlan={formik.values.microPlans[microPlanEditing]}
                handleSubmit={(microPlanEdited) => handleEditMicroPlan(microPlanEdited, microPlanEditing)}
                handleDelete={() => handleDeleteMicroPlan(microPlanEditing)}
                handleCancel={() => setMicroPlanEditing(null)}
                submitMessage={"Aceptar"}
            />
        )
    }

    async function handleSelectedMicroPlanFromSearch(idMicroPlan){
        const respuesta = await microPlanesService.getMicroPlanById(idMicroPlan);
        if (respuesta instanceof AxiosError) {
            setModalMsj(respuesta?.message)
        } else {
            const newMicroPlans = formik.values.microPlans;
            respuesta.idMicroPlan = null;
            respuesta.esTemplate = false;
            const numerosDeOrden = formik.values.microPlans.map(microPlan => microPlan.numeroOrden);
            console.log(numerosDeOrden)
            respuesta.numeroOrden = Math.max(...numerosDeOrden) + 1 
            respuesta.rutinas.forEach(rutina => {
                rutina.esTemplate = false;
                rutina.ejerciciosAplicados.forEach(ejercicioAplicado => ejercicioAplicado.esTemplate = false)
            })
            newMicroPlans.push(respuesta)
            formik.setFieldValue('microPlans', newMicroPlans, false)
            setBuscarMicroPlan(false)
        }
    }

    if(buscarMicroPlan){
        return (
            <MicroPlanes
                onSelectedMicroPlan={handleSelectedMicroPlanFromSearch}
            />
        )
    }

    return (
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
                    // handleCancelEdit={handleCancel}
                    handleSubmit={formik.handleSubmit}
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
                                    <TableRow key={microPlan.idMicroPlan}>
                                            <TableCell>{microPlan.numeroOrden}</TableCell>
                                            <TableCell>{microPlan.nombre}</TableCell>
                                            <TableCell>{microPlan.observaciones? microPlan.observaciones.length : 0}</TableCell>
                                            <TableCell>
                                                <Box sx={{display:'flex', gap:2}}>
                                                    <Button variant='contained' size='small' color='secondary' startIcon={<Comment />}> Observaciones </Button>
                                                    <Button variant='contained' size='small' startIcon={<Edit />} onClick={() => editMicroPlan(index)}> Editar </Button>
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
        </Paper>
    )
}
