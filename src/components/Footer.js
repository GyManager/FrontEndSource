import React from 'react'

import { Box, BottomNavigation, Chip, Paper, } from '@mui/material';
import InstagramIcon from '@mui/icons-material/Instagram';

function footer() {
    const handleClick = () => {
        console.info('You clicked the Chip.');
    };
    return (
        <Box sx={{ pb: 7 }}>
            <Paper sx={{
                position: 'fixed',
                bottom: 0, left: 0, right: 0,
            }}
                elevation={3}>
                <BottomNavigation
                    sx={{
                        backgroundColor: 'primary.main',
                        justifyContent: 'left',
                        alignItems: 'center'
                    }}>
                    <Chip icon={<InstagramIcon />} color="primary" onClick={handleClick} />
                </BottomNavigation>
            </Paper>
        </Box>
    );
}

export default footer