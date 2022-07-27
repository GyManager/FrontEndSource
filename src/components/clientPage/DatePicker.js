import * as React from 'react';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';

import { Typography, useMediaQuery } from '@mui/material';

export default function DatePicker(props) {

    const isMediumDevice = useMediaQuery('(max-width:900px');

    const datePickerCommonProperties = {
        label: "Fecha de nacimiento",
        inputFormat: "MM/dd/yyyy",
        readOnly: !props.editable,
        id: "fechaNacimiento",
    }

    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Stack spacing={3}>
                {isMediumDevice ?
                    <MobileDatePicker
                        {...datePickerCommonProperties}
                        value={props.calendarValue}
                        onChange={value => props.setFieldValue("fechaNacimiento", value)}
                        renderInput={(params) => <TextField {...params} />}
                    />
                    :
                    <div>
                        <DesktopDatePicker
                            {...datePickerCommonProperties}
                            value={props.calendarValue}
                            onChange={value => props.setFieldValue("fechaNacimiento", value)}
                            renderInput={(params) =>
                                <TextField {...params}
                                // Version de las variables que vienen por parametro
                                    error={props.errorProp}
                                    helperText={props.helperTextProp} />}
                                    // Version harcodeada
                                    // error={true}
                                    // helperText={'Hola Mundo'} />}
                        

                        />
                        <Typography> Hola undo  {props.helperText} </Typography>
                    </div>
                }
            </Stack>
        </LocalizationProvider>
    );
}

