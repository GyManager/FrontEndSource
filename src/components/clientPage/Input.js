import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Typography } from '@mui/material';
import { Container } from '@mui/system';

export default function Input(props) {

    return (
        <Box
            component="form"
            sx={{
                '& > :not(style)': { m: 1, width: '25ch' },
                my: '1vh'
            }}
            noValidate
            autoComplete="off"
        >
            {props.editable ?

                <TextField
                    id="standard-basic"
                    label={props.label}
                    variant="standard"
                    value={props.value}
                    onChange={props.handleChange}
                    // Forma original
                    // inputProps={{ readOnly: true, }}
                    // Metiendo js en el objeto
                    // {!props.editable?readOnly: null}
                    // TODO 007 Solved
                    inputProps={{ readOnly: Boolean(!props.editable) }}
                    sx={{ width: { xs: '65vw', md: '15vw', lg: '10vw' } }}
                    fullwidth
                />


                // Esta es una opcion alternativa que no se ve muy bien
                // disabled={props.editable? false : true }
                :
                <Typography
                    sx={{ width: '100%' }}
                >
                    {props.label} : {props.value}
                </Typography>
            }
        </Box>
    );
}