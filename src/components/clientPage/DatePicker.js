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

    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Stack spacing={3}>
            {isMediumDevice ?
                <MobileDatePicker
                    readOnly={!props.editable}
                    label="Date mobile"
                    inputFormat="MM/dd/yyyy"
                    value={props.calendarValue}
                    onChange={props.handleChange}
                    renderInput={(params) => <TextField {...params} />}
                /> 
                :
                <DesktopDatePicker
                    readOnly={!props.editable}
                    label="Date desktop"
                    inputFormat="MM/dd/yyyy"
                    value={props.calendarValue}
                    onChange={props.handleChange}
                    renderInput={(params) => <TextField {...params} />}
                />
            }
            </Stack>
        </LocalizationProvider>
    );
}

