import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

export default function Input(props) {

    return (
        <Box
            component="form"
            sx={{
                '& > :not(style)': { m: 1, width: '25ch' },
            }}
            noValidate
            autoComplete="off"
        >
            <TextField
                id="standard-basic"
                label={props.label}
                variant="standard"
                value={props.value}
                onChange={props.handleChange}
                // Forma original
                // inputProps={{ readOnly: true, }}
                // Metiendo js en el objeto
                // inputProps={{ readOnly: [!props.editable? 'true' : 'false'], }}

                // Esta es una opcion alternativa que no se ve muy bien
                disabled={props.editable? false : true }
            />
        </Box>
    );
}