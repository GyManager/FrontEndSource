import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { FormHelperText } from '@mui/material';

export default function GenericComboBox(props) {

    return (
        <div>
            <FormControl sx={{ minWidth: props.minWidth }} >

                <InputLabel id={props.label}>{props.label}</InputLabel>

                <Select
                    id={props.id}
                    name={props.id}
                    labelId={props.label}
                    value={props.value}
                    onChange={props.handleChange}
                    autoWidth
                    // multiple
                    label={props.label}
                    readOnly={props.editable ? false : true}
                    autoFocus={props.autoFocusProp ? true : false}
                >
                    <MenuItem name={props.id} value={props.valueForNone}>{props.labelForNone}</MenuItem>
                    {props.values.map(value => (<MenuItem name={props.id} value={value} key={value}>{value}</MenuItem>))}
                </Select>
                <FormHelperText error={props.errorProp}>{props.helperTextProp}</FormHelperText>
            </FormControl>
        </div>
    );
}

/*
// Salvo los estados de las variables, no hay estados que subir al padre

<GenericComboBox
    label="Sexo"
    id="sexo"
    value={formik.values.sexo}
    handleChange={formik.handleChange}
    editable={editable}
    valueForNone=""
    labelForNone="Seleccionar sexo"
    values={["Masculino", "Femenino", "No especifica"]}
    minWidth={250}
/>

*/