import { useContext } from "react";
import { Box } from "@mui/system";
import { Stack, TextField } from "@mui/material";
import { GenericComboBox } from "../reusable";
import { ParameterDropdownContext } from "../../context/ParameterDropdownContext";

export default function EjercicioAplicado(props){

    const { tipoEjercicios, bloques } = useContext(ParameterDropdownContext)

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

    return (
        <Box>
            <Stack {...stackStyle}>
                <GenericComboBox
                    label="Tipo de Ejercicio"
                    id={`${props.namePrefix}.tipoEjercicio`}
                    name={`${props.namePrefix}.tipoEjercicio`}
                    value={props.tipoEjercicio}
                    values={tipoEjercicios}
                    errorProp={props.touched.tipoEjercicio && props.errors !== undefined && Boolean(props.errors.tipoEjercicio)}
                    helperTextProp={props.touched.tipoEjercicio && props.errors !== undefined && props.errors.tipoEjercicio}
                    {...genericComboBoxProps}
                    
                />
                <GenericComboBox
                    label="Ejercicio"
                    id={`${props.namePrefix}.nombreEjercicio`}
                    name={`${props.namePrefix}.nombreEjercicio`}
                    value={props.nombreEjercicio}
                    values={[props.nombreEjercicio]}
                    errorProp={props.touched.nombreEjercicio && props.errors !== undefined && Boolean(props.errors.nombreEjercicio)}
                    helperTextProp={props.touched.nombreEjercicio && props.errors !== undefined && props.errors.nombreEjercicio}
                    {...genericComboBoxProps}
                />
                <GenericComboBox
                    label="Bloque"
                    id={`${props.namePrefix}.bloque`}
                    name={`${props.namePrefix}.bloque`}
                    value={props.bloque}
                    values={bloques}
                    errorProp={props.touched.bloque && props.errors !== undefined && Boolean(props.errors.bloque)}
                    helperTextProp={props.touched.bloque && props.errors !== undefined && props.errors.bloque}
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
                    label="Tiempo"
                    id={`${props.namePrefix}.tiempo`}
                    name={`${props.namePrefix}.tiempo`}
                    value={props.tiempo || ''}
                    {...textFieldProps}
                />
                <TextField 
                    label="Carga"
                    id={`${props.namePrefix}.carga`}
                    name={`${props.namePrefix}.carga`}
                    value={props.carga || ''}
                    {...textFieldProps}
                />
            </Stack>
        </Box>
    )
}