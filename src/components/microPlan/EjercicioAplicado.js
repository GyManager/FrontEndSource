import { useContext } from "react";
import { Box } from "@mui/system";
import { Button, Stack, TextField } from "@mui/material";
import { GenericComboBox } from "../reusable";
import { ParameterDropdownContext } from "../../context/ParameterDropdownContext";
import GenericComboBoxWithIds from "../reusable/GenericComboBoxWithIds";
import { Delete } from "@mui/icons-material";

export default function EjercicioAplicado(props){

    const {errors = {}, touched = {}} = props;
    const { tipoEjercicios, bloques, ejercicios } = useContext(ParameterDropdownContext)

    const stackStyle = {
        direction: { xs: 'column', sm: 'column', md: 'row' },
        spacing: { xs: 2, sm: 2, md: 5 },
        sx: { mt: 2 }
    }

    const textFieldProps = {
        disabled: !props.editable,
        variant: "standard",
        sx: { minWidth:{ xs:'100%', md:'10%'}},
        onChange: props.handleChange
    }

    const genericComboBoxProps = {
        handleChange: props.handleChange,
        valueForNone: "",
        labelForNone: "",
        minWidth: 250,
        editable: props.editable
    }

    const ejerciciosOptions = ejercicios.filter(ejercicio => ejercicio.tipoEjercicio === props.tipoEjercicio)
        .map(ejercicio => {
            return {
                id:ejercicio.idEjercicio,
                value:ejercicio.nombre
            };
        })

    const ejercicioInicial = {
        id:props.idEjercicio,
        value:props.nombreEjercicio
    }

    if(props.idEjercicio !== undefined 
        && props.idEjercicio !== null 
        && ejerciciosOptions.find(ejercicio => ejercicio.id === props.idEjercicio) === undefined){
        ejerciciosOptions.push({
            id:props.idEjercicio,
            value:props.nombreEjercicio
        })
    }

    return (
        <Box>
            <Stack {...stackStyle}>
                <GenericComboBox
                    label="Tipo de Ejercicio"
                    id={`${props.namePrefix}.tipoEjercicio`}
                    name={`${props.namePrefix}.tipoEjercicio`}
                    value={props.tipoEjercicio || ''}
                    values={tipoEjercicios}
                    errorProp={touched.tipoEjercicio  && Boolean(errors.tipoEjercicio)}
                    helperTextProp={touched.tipoEjercicio && errors.tipoEjercicio}
                    {...genericComboBoxProps}
                    
                />
                <GenericComboBoxWithIds
                    label="Ejercicio"
                    id={`${props.namePrefix}.idEjercicio`}
                    name={`${props.namePrefix}.idEjercicio`}
                    value={ejerciciosOptions.some(option => option.id === props.idEjercicio)? props.idEjercicio : ''}
                    values={ejerciciosOptions}
                    errorProp={touched.idEjercicio && Boolean(errors.idEjercicio)}
                    helperTextProp={touched.idEjercicio && errors.idEjercicio}
                    {...genericComboBoxProps}
                />
                <GenericComboBox
                    label="Bloque"
                    id={`${props.namePrefix}.bloque`}
                    name={`${props.namePrefix}.bloque`}
                    value={props.bloque || ''}
                    values={bloques}
                    errorProp={touched.bloque && Boolean(errors.bloque)}
                    helperTextProp={touched.bloque && errors.bloque}
                    {...genericComboBoxProps}
                />
            </Stack>

            <Stack {...stackStyle}>
                <TextField 
                    label="Series"
                    id={`${props.namePrefix}.series`}
                    name={`${props.namePrefix}.series`}
                    value={props.series || ''}
                    {...textFieldProps}
                />
                <TextField 
                    label="Repeticiones"
                    id={`${props.namePrefix}.repeticiones`}
                    name={`${props.namePrefix}.repeticiones`}
                    value={props.repeticiones || ''}
                    {...textFieldProps}
                />
                <TextField 
                    label="Pausa Micro"
                    id={`${props.namePrefix}.pausaMicro`}
                    name={`${props.namePrefix}.pausaMicro`}
                    value={props.pausaMicro || ''}
                    {...textFieldProps}
                />
                <TextField 
                    label="Pausa Macro"
                    id={`${props.namePrefix}.pausaMacro`}
                    name={`${props.namePrefix}.pausaMacro`}
                    value={props.pausaMacro || ''}
                    {...textFieldProps}
                />
                <TextField 
                    label="Tiempo (minutos)"
                    id={`${props.namePrefix}.tiempo`}
                    name={`${props.namePrefix}.tiempo`}
                    value={props.tiempo || ''}
                    {...textFieldProps}
                    error={touched.tiempo && Boolean(errors.tiempo)}
                    helperText={touched.tiempo && errors.tiempo}
                    type="number"
                />
                <TextField 
                    label="Carga (Kg)"
                    id={`${props.namePrefix}.carga`}
                    name={`${props.namePrefix}.carga`}
                    value={props.carga || ''}
                    {...textFieldProps}
                    error={touched.carga && Boolean(errors.carga)}
                    helperText={touched.carga && errors.carga}
                    type="number"
                />
                
                <Box sx={{display: 'flex', justifyContent: 'end', alignItems: 'end' }}>
                    {
                        props.editable &&
                        <Button
                            size='small'
                            variant='outlined'
                            color="error"
                            sx={{ maxWidth:{ xs:'100%'}, height: 'fit-content'}}
                            startIcon={<Delete />}
                            onClick={props.removeEjercicio}
                        >
                            Eliminar
                        </Button>
                    }
                </Box>
            </Stack>
        </Box>
    )
}