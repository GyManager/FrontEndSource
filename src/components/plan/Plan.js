import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { Box, Button, Paper, Skeleton, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from '@mui/material/';
import { Breadcumbs, GenericComboBox } from '../reusable';
import planesService from '../../services/planes.service';
import { AxiosError } from 'axios';
import { ParameterDropdownContext } from '../../context/ParameterDropdownContext';
import DatePicker from '../reusable/DatePicker';
import microPlanesService from '../../services/micro-planes.service';
import { useFormik } from 'formik';
import FormOptions from '../reusable/FormOptions';
import { Add, Comment, Delete, Edit } from '@mui/icons-material';

export default function Plan() {

    let { clienteId, idPlan } = useParams();
    const [loading, setLoading] = useState(false);
    const formik = useFormik({
        initialValues: {
            descripcion: "",
            objetivo:"",
            cantidadSemanas: 0
        },
        // validationSchema: microPlanSchema.validationSchema,
        onSubmit: () => {
            // handleSubmit();
        },
    });
    const [microPlanes, setMicroPlanes] = useState([]);
    const { objetivos } = useContext(ParameterDropdownContext)

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

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            const respuesta = await microPlanesService.getMicroPlanByPlanId(idPlan);
            setLoading(false)
            if (respuesta instanceof AxiosError) {
                console.log(respuesta)
            } else {
                setMicroPlanes(respuesta)
            }
        }
        fetchData();
    }, [idPlan])

    function setCantidadSemanas(nuevaCantidadSemanas){
        formik.setFieldValue('cantidadSemanas', nuevaCantidadSemanas)
        const nuevaFechaHasta = Date.parse(formik.values.fechaDesde) + (nuevaCantidadSemanas * 7 * 24 * 60 * 60 * 1000);
        formik.setFieldValue('fechaHasta', nuevaFechaHasta)
    }

    function setMicroPlanTouched(){

    }

    function setMicroPlanDeleted(){

    }

    const paperStyle = {
        elevation:1,
        sx:{p: 2}
    }

    return (
        <Paper 
            sx={{p:2, gap:3, display:'flex', flexDirection:'column'}} 
            component="form" 
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
                    // handleSubmit={formik.handleSubmit}
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
                        value={formik.values.cantidadSemanas || ''}
                        sx={{width:'25%'}}
                        disabled={true}
                    />

                    <DatePicker
                        value={formik.values.fechaDesde || ""}
                        id="fechaDesde"
                        name="fechaDesde"
                        label="Fecha desde"
                        editable={true}
                        onChange={formik.setFieldValue}
                        // setFieldValue={formik.setFieldValue}
                        // errorProp={formik.touched.fechaNacimiento && Boolean(formik.errors.fechaNacimiento)}
                        // helperTextProp={formik.touched.fechaNacimiento && formik.errors.fechaNacimiento}
                    />
                    <DatePicker
                        value={formik.values.fechaHasta || ""}
                        id="fechaHasta"
                        name="fechaHasta"
                        label="Fecha hasta"
                        editable={false}
                        onChange={formik.setFieldValue}
                        // errorProp={formik.touched.fechaNacimiento && Boolean(formik.errors.fechaNacimiento)}
                        // helperTextProp={formik.touched.fechaNacimiento && formik.errors.fechaNacimiento}
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
                            {microPlanes.map(microPlan => (
                                <TableRow key={microPlan.idMicroPlan}>
                                        <TableCell>{microPlan.numeroOrden}</TableCell>
                                        <TableCell>{microPlan.nombre}</TableCell>
                                        <TableCell>{microPlan.cantidadSemanas}</TableCell>
                                        <TableCell>
                                            <Box sx={{display:'flex', gap:2}}>
                                                <Button variant='contained' size='small' color='secondary' startIcon={<Comment />}> Observaciones </Button>
                                                <Button variant='contained' size='small' startIcon={<Edit />}> Editar </Button>
                                                <Button variant='contained' size='small' color='error' startIcon={<Delete />}>  Borrar </Button>
                                            </Box>
                                        </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <Button variant='contained' size='medium'><Add /> Agregar Micro Plan </Button>
            </Paper>
        </Paper>
    )
}
