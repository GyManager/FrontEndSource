import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useFormik } from "formik";
import { AxiosError } from "axios";
import { Box } from "@mui/system";
import { Paper, Skeleton, TextField, Typography } from "@mui/material";
import { ParameterDropdownProvider } from "../../context/ParameterDropdownContext";
import { Breadcumbs, GenericModal } from "../reusable";
import FormOptions from "../reusable/FormOptions";
import microPlanesService from "../../services/micro-planes.service";
import microPlanSchema from "./microPlanSchema";
import Rutina from "./Rutina";

export default function MicroPlan() {

    let { idMicroPlan } = useParams();

    const [loading, setLoading] = useState(false);
    const [modalMsj, setModalMsj] = useState("");
    const [expanded, setExpanded] = useState(() => false);
    const [editable, setEditable] = useState(() => false);

    const formik = useFormik({
        initialValues: {
            nombre: "",
            rutinas: []
        },
        validateOnChange: false,
        validateOnBlur: true,
        validationSchema: microPlanSchema.validationSchema,
        onSubmit: (e) => {
            e?.preventDefault();
        },
    });

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            const respuesta = await microPlanesService.getMicroPlanById(idMicroPlan);
            setLoading(false)
            if (respuesta instanceof AxiosError) {
                console.log(respuesta)
                setModalMsj(respuesta?.message)
            } else {
                formik.setValues(respuesta, false);
            }
        }

        fetchData();
    }, [idMicroPlan])

    return (
        <Paper 
            sx={{p:2, gap:3, display:'flex', flexDirection:'column'}} 
            component="form" 
            onSubmit={formik.handleSubmit}
        >
            <Box sx={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                <Box sx={{display: 'flex', flexDirection: 'column'}}>
                    <Breadcumbs
                        names={['Micro Planes', formik.values.nombre]}
                        urls={['../micro-planes/']}
                    />
                    <Typography 
                        noWrap={true} 
                        sx={{
                            width: {xs: '88vw', md: '100%', lg: '100%'},
                            fontSize: {xs: 24, md: 28, lg: 30, xl: 34},
                        }}
                    >
                        {loading ? <Skeleton/> : `Micro Plan: ${formik.values.nombre}`}
                    </Typography>
                </Box>

                <FormOptions
                    editable={editable}
                    handleEditClick={() => setEditable(true)}
                    handleCancelEdit={() => setEditable(false)}
                    handleDeleteClick={null}
                    handleSubmit={formik.handleSubmit}
                    id={idMicroPlan}
                />
            </Box>

            <Paper elevation='1' sx={{ p: 2, my: 2}}>
                {
                    loading ? <Skeleton/> :
                        <TextField 
                            label="Nombre"
                            id="nombre"
                            name="nombre"
                            value={formik.values.nombre}
                            onChange={formik.handleChange}
                            error={formik.touched.nombre && Boolean(formik.errors.nombre)}
                            helperText={formik.touched.nombre && formik.errors.nombre}
                            disabled={!editable}
                            variant="standard"
                            sx={{ minWidth:{ xs:'100%', md:'35%'}}}
                        />
                }
            </Paper>

            <ParameterDropdownProvider tipoEjercicio={true} bloque={true}>
                <div>
                    {loading?  <Skeleton/> :
                        formik.values.rutinas.map((rutina, index) => 
                            <Rutina 
                                key={rutina.idRutina} 
                                {...rutina} 
                                namePrefix={`rutinas[${index}]`}
                                handleChange={formik.handleChange}
                                touched={formik.touched.rutinas? formik.touched.rutinas[index] : {}}
                                errors={formik.errors.rutinas? formik.errors.rutinas[index] : {}}
                                expanded={expanded}
                                handleAccordion={setExpanded}
                                editable={editable} 
                            />
                        )
                    }
                </div>
            </ParameterDropdownProvider>

            <GenericModal
                show={modalMsj !== ""}
                hide={() => setModalMsj("")}
                serverMsj={modalMsj} 
            />
        </Paper>
    )
}

