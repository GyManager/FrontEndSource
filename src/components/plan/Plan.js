import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { Box, Paper, Skeleton, Stack, TextField, Typography } from '@mui/material/';
import { Breadcumbs, GenericComboBox } from '../reusable';
import planesService from '../../services/planes.service';
import { AxiosError } from 'axios';
import { ParameterDropdownContext } from '../../context/ParameterDropdownContext';
import DatePicker from '../reusable/DatePicker';

export default function Plan() {

    let { clienteId, idPlan } = useParams();
    const [loading, setLoading] = useState(false);
    const [plan, setPlan] = useState({});
    const [microPlanes, setMicroPlanes] = useState([]);
    const [cantidadSemanas, setCantidadSemanas] = useState(0);
    const { objetivos } = useContext(ParameterDropdownContext)

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            const respuesta = await planesService.getPlanById(idPlan);
            setLoading(false)
            if (respuesta instanceof AxiosError) {
                console.log(respuesta)
            } else {
                setPlan(respuesta)
            }
        }
        fetchData();
    }, [idPlan])

    function actualizarSemanas(amount){
        const nuevaCantidadSemanas = parseInt(cantidadSemanas) + parseInt(amount)
        setCantidadSemanas(nuevaCantidadSemanas)
        setPlan(prev => {
            const nuevaFechaHasta = Date.parse(prev.fechaDesde) + (nuevaCantidadSemanas * 7 * 24 * 60 * 60 * 1000);
            return {...prev, fechaHasta:nuevaFechaHasta}
        })
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
                    <Typography
                        noWrap={true} 
                        sx={{
                            width: {xs: '88vw', md: '100%', lg: '100%'},
                            fontSize: {xs: 24, md: 28, lg: 30, xl: 34},
                        }}
                    >
                        {loading ? <Skeleton/> : `Plan`}
                    </Typography>
                </Box>
            </Box>

            <Paper elevation={1} sx={{p: 2}}>

                <TextField fullWidth
                    label="Descripcion"
                    id="descripcion"
                    variant="standard"
                    value={plan.descripcion || ''}
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
                        value={plan.objetivo || ''}
                        values={objetivos}
                        valueForNone=""
                        labelForNone=""
                        minWidth={250}
                        editable={true}
                    />

                    <TextField fullWidth
                        label="Cantidad de semanas"
                        id="cantidadSemanas"
                        variant="standard"
                        value={cantidadSemanas || 0 }
                        sx={{width:'25%'}}
                        disabled={true}
                    />

                    <DatePicker
                        value={plan.fechaDesde}
                        id="fechaDesde"
                        label="Fecha desde"
                        editable={true}
                        // setFieldValue={formik.setFieldValue}
                        // errorProp={formik.touched.fechaNacimiento && Boolean(formik.errors.fechaNacimiento)}
                        // helperTextProp={formik.touched.fechaNacimiento && formik.errors.fechaNacimiento}
                    />
                    <DatePicker
                        value={plan.fechaHasta}
                        id="fechaHasta"
                        label="Fecha hasta"
                        editable={false}
                        // setFieldValue={formik.setFieldValue}
                        // errorProp={formik.touched.fechaNacimiento && Boolean(formik.errors.fechaNacimiento)}
                        // helperTextProp={formik.touched.fechaNacimiento && formik.errors.fechaNacimiento}
                    />

                </Stack>
            </Paper>

        </Paper>
    )
}
