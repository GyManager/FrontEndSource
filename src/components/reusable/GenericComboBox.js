import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

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
                    readOnly={props.editable? false: true }
                >
                    <MenuItem name={props.id} value={props.valueForNone}>{props.labelForNone}</MenuItem>
                    { props.values.map(value => (<MenuItem name={props.id} value={value} key={value}>{value}</MenuItem>)) }
                </Select>

            </FormControl>
        </div>
    );
}
