import { useContext } from "react";
import { Divider, Paper, Stack, TextField } from "@mui/material";
import { GenericComboBox } from "../reusable";
import { ParameterDropdownContext } from "../../context/ParameterDropdownContext";
import { Box } from "@mui/system";

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
    }

    return(
        <Box>
            <Stack {...stackStyle}>
                <GenericComboBox
                    label="Tipo de Ejercicio"
                    id={`${props.namePrefix}.tipoEjercicio`}
                    name={`${props.namePrefix}.tipoEjercicio`}
                    value={props.tipoEjercicio}
                    handleChange={props.handleChange}
                    valueForNone=""
                    labelForNone=""
                    values={tipoEjercicios}
                    editable={props.editable}
                    errorProp={props.touched.tipoEjercicio && props.errors !== undefined && Boolean(props.errors.tipoEjercicio)}
                    helperTextProp={props.touched.tipoEjercicio && props.errors !== undefined && props.errors.tipoEjercicio}
                    minWidth={250}
                />
                <GenericComboBox
                    label="Ejercicio"
                    id={`${props.namePrefix}.nombreEjercicio`}
                    name={`${props.namePrefix}.nombreEjercicio`}
                    value={props.nombreEjercicio}
                    handleChange={props.handleChange}
                    valueForNone=""
                    labelForNone=""
                    values={[props.nombreEjercicio]}
                    editable={props.editable}
                    errorProp={props.touched.nombreEjercicio && props.errors !== undefined && Boolean(props.errors.nombreEjercicio)}
                    helperTextProp={props.touched.nombreEjercicio && props.errors !== undefined && props.errors.nombreEjercicio}
                    minWidth={250}
                />
                <GenericComboBox
                    label="Bloque"
                    id={`${props.namePrefix}.bloque`}
                    name={`${props.namePrefix}.bloque`}
                    value={props.bloque}
                    handleChange={props.handleChange}
                    valueForNone=""
                    labelForNone=""
                    values={bloques}
                    editable={props.editable}
                    errorProp={props.touched.bloque && props.errors !== undefined && Boolean(props.errors.bloque)}
                    helperTextProp={props.touched.bloque && props.errors !== undefined && props.errors.bloque}
                    minWidth={250}
                />
            </Stack>

            <Stack {...stackStyle}>
                <TextField 
                    {...textFieldProps}
                    label="Series"
                    id={`${props.namePrefix}.series`}
                    name={`${props.namePrefix}.series`}
                    onChange={props.handleChange}
                    value={props.series || ''}
                    sx={{ minWidth:{ xs:'100%', md:'10%'}}}
                />
                <TextField 
                    {...textFieldProps}
                    label="Repeticiones"
                    id={`${props.namePrefix}.repeticiones`}
                    name={`${props.namePrefix}.repeticiones`}
                    onChange={props.handleChange}
                    value={props.repeticiones || ''}
                    sx={{ minWidth:{ xs:'100%', md:'10%'}}}
                />
                <TextField 
                    {...textFieldProps}
                    label="Pausa Micro"
                    id={`${props.namePrefix}.pausaMicro`}
                    name={`${props.namePrefix}.pausaMicro`}
                    onChange={props.handleChange}
                    value={props.pausaMicro || ''}
                    sx={{ minWidth:{ xs:'100%', md:'10%'}}}
                />
                <TextField 
                    {...textFieldProps}
                    label="Pausa Macro"
                    id={`${props.namePrefix}.pausaMacro`}
                    name={`${props.namePrefix}.pausaMacro`}
                    onChange={props.handleChange}
                    value={props.pausaMacro || ''}
                    sx={{ minWidth:{ xs:'100%', md:'10%'}}}
                />
                <TextField 
                    {...textFieldProps}
                    label="Tiempo"
                    id={`${props.namePrefix}.tiempo`}
                    name={`${props.namePrefix}.tiempo`}
                    onChange={props.handleChange}
                    value={props.tiempo || ''}
                    sx={{ minWidth:{ xs:'100%', md:'10%'}}}
                />
                <TextField 
                    {...textFieldProps}
                    label="Carga"
                    id={`${props.namePrefix}.carga`}
                    name={`${props.namePrefix}.carga`}
                    onChange={props.handleChange}
                    value={props.carga || ''}
                    sx={{ minWidth:{ xs:'100%', md:'10%'}}}
                />
            </Stack>
        </Box>
    )
}