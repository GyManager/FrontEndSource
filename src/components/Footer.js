import React from 'react'

import { Box, BottomNavigation, Chip, Paper, } from '@mui/material';
import InstagramIcon from '@mui/icons-material/Instagram';

function footer() {
    return (
        <Box sx={{ pb: 7 }}>
            <Paper 
            sx={{
                position: 'fixed',
                bottom: 0, 
                left: 0, 
                right: 0,
            }}
                elevation={3}>
                <BottomNavigation
                    sx={{
                        backgroundColor: 'navbar.main',
                        justifyContent: 'left',
                        alignItems: 'center',
                        display: { xs: 'none', md: 'flex' },
                    }}>
                    <Chip 
                    clickable
                        icon={<InstagramIcon />} 
                        color="primary" 
                        sx={{backgroundColor: 'navbar.main'}}
                        component="a"
                        href="https://www.instagram.com/core.gimnasio/"
                    />
                </BottomNavigation>
            </Paper>
        </Box>
    );
}

export default footer