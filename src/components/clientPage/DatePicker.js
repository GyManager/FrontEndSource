import * as React from 'react';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';

import { useMediaQuery } from '@mui/material';

export default function DatePicker() {
    const isMediumDevice = useMediaQuery('(max-width:900px');
    const [calendarValue, setCalendarValue] = React.useState(new Date('2014-08-18T21:11:54'));

    const handleChange = (newValue) => {
        setCalendarValue(newValue);
    };
// TODO NICO 001 DatePicker no esta cambiando el dia, se queda en el dia actual.
// hay que sacar los parametros al padre, en el codigo del padre lo hice y lo deje comentado: TODO NICO 001a y 00b
    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Stack spacing={3}>
            {isMediumDevice?
                <MobileDatePicker
                    label="Date mobile"
                    inputFormat="MM/dd/yyyy"
                    calendarValue={calendarValue}
                    onChange={handleChange}
                    renderInput={(params) => <TextField {...params} />}
                /> 
                :<DesktopDatePicker
                    label="Date desktop"
                    inputFormat="MM/dd/yyyy"
                    calendarValue={calendarValue}
                    onChange={handleChange}
                    renderInput={(params) => <TextField {...params} />}
                />
            }
            </Stack>
        </LocalizationProvider>
    );
}

