import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { TextField, FormHelperText } from '@mui/material';

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
                    label={props.label}
                    readOnly={props.editable ? false : true}
                    autoFocus={props.autoFocusProp? true : false}
                >
                    <MenuItem name={props.id} value={props.valueForNone}>{props.labelForNone}</MenuItem>
                    {props.values.map(value => (<MenuItem name={props.id} value={value} key={value}>{value}</MenuItem>))}
                </Select>
                <FormHelperText error={props.errorProp}>{props.helperTextProp}</FormHelperText>
            </FormControl>
        </div>
    );
}
