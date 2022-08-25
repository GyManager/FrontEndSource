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
                        borderStyle:'solid', 
                        borderWidth:'2px', 
                        borderImageSlice:'1',
                        borderImageSource:'linear-gradient(90deg, rgba(249,227,111,1) 0%, rgba(213,116,85,1) 30%, rgba(124,60,105,1) 70%, rgba(190,54,124,1) 99%)',
                        backgroundColor:'#151923',
                        justifyContent: 'left',
                        alignItems: 'center',
                        display: { xs: 'none', md: 'flex' },
                    }}>
                    <Chip icon={<InstagramIcon />}  onClick={handleClick} />
                </BottomNavigation>
            </Paper>
        </Box>
    );
}

export default footer