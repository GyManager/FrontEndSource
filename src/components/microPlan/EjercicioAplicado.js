import { useContext } from "react";
import { Paper, Stack, TextField } from "@mui/material";
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
    }

    return(
        <Paper {...props.paperStyle}>
            <Stack {...stackStyle}>
                <GenericComboBox
                    label="Tipo de Ejercicio"
                    id="tipoEjercicio"
                    value={props.tipoEjercicio}
                    valueForNone=""
                    labelForNone=""
                    values={tipoEjercicios}
                    editable={props.editable}
                    minWidth={250}
                />
                <GenericComboBox
                    label="Ejercicio"
                    id="ejercicio"
                    value={props.nombreEjercicio}
                    valueForNone=""
                    labelForNone=""
                    values={["", props.nombreEjercicio]}
                    editable={props.editable}
                    minWidth={250}
                />
                <GenericComboBox
                    label="Bloque"
                    id="bloque"
                    value={props.bloque}
                    valueForNone=""
                    labelForNone=""
                    values={bloques}
                    editable={props.editable}
                    minWidth={250}
                />
            </Stack>

            <Stack {...stackStyle}>
                <TextField 
                    {...textFieldProps}
                    label="Series"
                    value={props.series || ''}
                    sx={{ minWidth:{ xs:'100%', md:'10%'}}}
                />
                <TextField 
                    {...textFieldProps}
                    label="Repeticiones"
                    value={props.repeticiones || ''}
                    sx={{ minWidth:{ xs:'100%', md:'10%'}}}
                />
                <TextField 
                    {...textFieldProps}
                    label="Pausa Micro"
                    value={props.pausaMicro || ''}
                    sx={{ minWidth:{ xs:'100%', md:'10%'}}}
                />
                <TextField 
                    {...textFieldProps}
                    label="Pausa Macro"
                    value={props.pausaMacro || ''}
                    sx={{ minWidth:{ xs:'100%', md:'10%'}}}
                />
                <TextField 
                    {...textFieldProps}
                    label="Tiempo"
                    value={props.tiempo || ''}
                    sx={{ minWidth:{ xs:'100%', md:'10%'}}}
                />
                <TextField 
                    {...textFieldProps}
                    label="Carga"
                    value={props.carga || ''}
                    sx={{ minWidth:{ xs:'100%', md:'10%'}}}
                />
            </Stack>
        </Paper>
    )
}