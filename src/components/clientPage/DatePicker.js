import * as React from 'react';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';

import { useMediaQuery } from '@mui/material';

export default function DatePicker(props) {

    const isMediumDevice = useMediaQuery('(max-width:900px');

    const datePickerCommonProperties = {
        label: "Fecha de nacimiento",
        inputFormat: "MM/dd/yyyy",
        readOnly: !props.editable,
        value: props.calendarValue,
        onChange: props.handleChange,
        id: "fechaNacimiento",
        renderInput: (params) => <TextField {...params} />,
    }

    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Stack spacing={3}>
            {isMediumDevice ?
                <MobileDatePicker
                    {...datePickerCommonProperties}
                /> 
                :
                <DesktopDatePicker
                    {...datePickerCommonProperties}
                />
            }
            </Stack>
        </LocalizationProvider>
    );
}

