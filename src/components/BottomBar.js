import React from 'react'
import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';

function bottomBar() {
    return (
            <Stack 
                direction="row"
                alignItems="center"
                spacing={2}
                sx={{
                width: "100%",
                height: 50,
                display: {xs:'none', md:'flex'},
                position: 'absolute',
                bottom: '0',
                backgroundColor: 'primary.dark',

                }}
            >
                <Chip icon={<FacebookIcon />} label="Facebook" />
                <Chip icon={<TwitterIcon />} label="Twitter" variant="outlined" />
                <Chip icon={<InstagramIcon />} label="Instagram" variant="outlined" />
            </Stack>
    );
}

export default bottomBar