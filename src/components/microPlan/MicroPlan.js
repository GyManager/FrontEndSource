import React, { useState, useEffect, Fragment, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";
import { AxiosError } from "axios";
import { Box } from "@mui/system";
import { Button, Paper, Skeleton, TextField, Typography } from "@mui/material";
import { Add, WarningAmberRounded } from "@mui/icons-material";
import { ParameterDropdownProvider } from "../../context/ParameterDropdownContext";
import { Breadcumbs, GenericModal } from "../reusable";
import FormOptions from "../reusable/FormOptions";
import microPlanesService from "../../services/micro-planes.service";
import microPlanSchema from "./microPlanSchema";
import Rutina from "./Rutina";
import { SnackbarContext } from "../../context/SnackbarContext";
import FormOptionsSpeedDial from "../reusable/FormOptionsSpeedDial";

/**
 * 
 * @param {idMicroPlan} props 
 * @returns 
 */
export default function MicroPlan(props) {

    let { idMicroPlan } = useParams();

    const nuevoEjercicio = () => {
        return {
            esTemplate: props.esTemplate,
            tipoEjercicio: "",
            idEjercicio: "",
            bloque: "",
            series: "",
            repeticiones: "",
            pausaMacro: "",
            pausaMicro: "",
            tiempo: "",
            carga: ""
        };
    }
    const nuevaRutina = () => {return {nombre: "", ejerciciosAplicados: [nuevoEjercicio()], esTemplate: props.esTemplate};}

    const {addSnackbar} = useContext(SnackbarContext)
    const [loading, setLoading] = useState(false);
    const [modalMsj, setModalMsj] = useState("");
    const [expanded, setExpanded] = useState(() => false);
    const [editable, setEditable] = useState(() => props.editable);

    const navigate = useNavigate()

    const formikInitialValues = props.microPlan? props.microPlan : 
        ({ nombre: "", rutinas: [nuevaRutina()], esTemplate: props.esTemplate})

    const formik = useFormik({
        initialValues: formikInitialValues,
        validateOnChange: false,
        validateOnBlur: true,
        validationSchema: microPlanSchema.validationSchema,
        onSubmit: () => {
            handleSubmit();
        },
    });

    const addRutina = () => {
        const newRutinas = formik.values.rutinas;
        newRutinas.push(nuevaRutina())
        formik.setFieldValue('rutinas', newRutinas, false)
    }

    const removeRutina = (index) => {
        const newRutinas = formik.values.rutinas;
        newRutinas.splice(index,1)
        formik.setFieldValue('rutinas', newRutinas, false)
    }

    const addEjercicio = (indexRutina) => {
        const newEjercicios = formik.values.rutinas[indexRutina].ejerciciosAplicados;
        newEjercicios.push(nuevoEjercicio())
        formik.setFieldValue( `rutinas[${indexRutina}].ejerciciosAplicados`, newEjercicios, false)
    }

    const removeEjercicio = (indexRutina, index) => {
        const newEjercicios = formik.values.rutinas[indexRutina].ejerciciosAplicados;
        newEjercicios.splice(index,1)
        formik.setFieldValue(`rutinas[${indexRutina}].ejerciciosAplicados`, newEjercicios, false)
    }

    const getMicroPlanById = async () => {
        setLoading(true)
        const respuesta = await microPlanesService.getMicroPlanById(idMicroPlan);
        setLoading(false)
        if (respuesta instanceof AxiosError) {
            setModalMsj(respuesta?.message)
        } else {
            formik.setValues(respuesta, false);
        }
    }

    const handleSubmit = async (e) => {
        e?.preventDefault();
        if(props.handleSubmit){
            props.handleSubmit(formik.values)
        } else if (idMicroPlan === 'new') {
            const respuesta = await microPlanesService.postMicroPlan(formik.values)
            handleRespuesta(respuesta, 'El micro plan ha sido creado con exito')
        } else {
            const respuesta = await microPlanesService.putMicroPlan(formik.values, idMicroPlan)
            handleRespuesta(respuesta, 'El micro plan ha sido modificado con exito')
        }
    }

    const handleDelete = props.handleDelete ? props.handleDelete : async () => {
        const respuesta = await microPlanesService.deleteMicroPlanById(idMicroPlan);
        handleRespuesta(respuesta, 'El micro plan ha sido borrado con exito')
    }

    const handleCancel = props.handleCancel ? props.handleCancel : () => {
        if (idMicroPlan === 'new') {
            navigate("/micro-planes");
        } else {
            setEditable(false)
            getMicroPlanById()
        }
    }

    const handleRespuesta = (respuesta, mensaje) => {
        if (respuesta instanceof AxiosError) {
            setModalMsj(respuesta.response.data.message)
        } else {
            navigate("/micro-planes")
            addSnackbar({message: mensaje, severity: "success"})
        }
    }

    useEffect(() => {
        if (idMicroPlan === 'new' || !props.esTemplate) {
            setEditable(true)
        } else {
            getMicroPlanById()
        }
    }, [idMicroPlan])

    const breadcrums = props.namesBreadcrums ? 
        (
            <Breadcumbs
                names={[...props.namesBreadcrums, formik.values.nombre]}
                urls={props.urlsBreadcrums}
            /> 
        ):
        (
            <Breadcumbs
                names={['Micro Planes', formik.values.nombre]}
                urls={['../micro-planes/']}
            />
        )

    return (
        <Paper 
            sx={{p:2, gap:3, display:'flex', flexDirection:'column'}} 
            component="form" 
            onSubmit={formik.handleSubmit}
        >
            <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                <Box>
                    {breadcrums}
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
                    handleCancelEdit={handleCancel}
                    handleDeleteClick={handleDelete}
                    handleSubmit={formik.handleSubmit}
                    submitMessage={props.submitMessage}
                    id={idMicroPlan}
                    deleteAlertTitle={`Está por eliminar el micro plan ${formik.values.nombre}`}
                />
            </Box>

            <Paper elevation={1} sx={{ p: 2}}>
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
                            sx={{ minWidth:{ xs:'100%', md:'40%'}}}
                        />
                }
            </Paper>
            
            {
                ( formik.errors.rutinas !== undefined && !Array.isArray(formik.errors.rutinas)) &&
                <Box sx={{display: 'flex'}}>
                    <WarningAmberRounded color='error' sx={{mr: 1}}/>
                    <Typography color='error'>
                        {formik.errors.rutinas}
                    </Typography>
                </Box>
            }

            <ParameterDropdownProvider tipoEjercicio bloque ejercicio>
                <Fragment>
                    {loading?  <Skeleton/> :
                        formik.values.rutinas.map((rutina, index) => 
                            <Rutina 
                                key={rutina.idRutina} 
                                {...rutina} 
                                namePrefix={`rutinas[${index}]`}
                                handleChange={formik.handleChange}
                                removeRutina={removeRutina}
                                addEjercicio={addEjercicio}
                                removeEjercicio={removeEjercicio}
                                indexRutina={index}
                                touched={formik.touched.rutinas? formik.touched.rutinas[index] : {}}
                                errors={formik.errors.rutinas? formik.errors.rutinas[index] : {}}
                                expanded={expanded}
                                handleAccordion={setExpanded}
                                editable={editable} 
                            />
                        )
                    }
                </Fragment>
            </ParameterDropdownProvider>

            {
                editable &&
                <Button
                    size='medium'
                    variant='contained'
                    sx={{ maxWidth:{ xs:'100%', md:'30%'}}}
                    startIcon={<Add />}
                    onClick={addRutina}
                >
                    Agregar rutina
                </Button>
            }
            
            <FormOptionsSpeedDial
                editable={editable}
                handleEditClick={() => setEditable(true)}
                handleCancelEdit={handleCancel}
                handleDeleteClick={handleDelete}
                handleSubmit={formik.handleSubmit}
                id={idMicroPlan}
            />

            <GenericModal
                show={modalMsj !== ""}
                hide={() => setModalMsj("")}
                serverMsj={modalMsj} 
            />
        </Paper>
    )
}
