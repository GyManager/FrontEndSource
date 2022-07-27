import React from 'react'

import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';
import InstagramIcon from '@mui/icons-material/Instagram';

function footer() {
    const handleClick = () => {
        console.info('You clicked the Chip.');
    };
    return (
        <Stack
            direction="row"
            alignItems="center"
            spacing={2}
            sx={{
                width: "100%",
                height: 50,
                display: { xs: 'none', md: 'flex' },
                position: 'absolute',
                bottom: '0',
                backgroundColor: 'primary.main',
            }}
        >
            <Chip icon={<InstagramIcon />} color="primary" onClick={handleClick} />
        </Stack>
    );
}

export default footer