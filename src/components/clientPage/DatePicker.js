import * as React from 'react';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';

import { useMediaQuery } from '@mui/material';

export default function DatePicker() {
    const isMediumDevice = useMediaQuery('(max-width:900px');
    const [calendarValue, setCalendarValue] = React.useState(new Date('2014-08-18T21:11:54'));

    const handleChange = (newValue) => {
        setCalendarValue(newValue);
    };

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

