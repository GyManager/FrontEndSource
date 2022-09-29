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
        inputFormat: "dd/MM/yyyy",
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
                        renderInput={(params) =>
                            <TextField {...params}
                                error={props.errorProp}
                                helperText={props.helperTextProp} />}
                    />
                    :
                    <div>
                        <DesktopDatePicker
                            {...datePickerCommonProperties}
                            value={props.calendarValue}
                            onChange={value => props.setFieldValue("fechaNacimiento", value)}
                            renderInput={(params) =>
                                <TextField {...params}
                                    error={props.errorProp}
                                    helperText={props.helperTextProp} />}
                        />
                    </div>
                }
            </Stack>
        </LocalizationProvider>
    );
}

