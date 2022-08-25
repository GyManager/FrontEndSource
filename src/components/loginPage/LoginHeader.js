import React from 'react'
import Typography from '@mui/material/Typography';

function LoginHeader() {
    return (
        <div>
            <Typography
                variant="h2"
                align="center"
                component="h2"
                color="white"
            >
                CorE
            </Typography>
            <Typography
                sx={{
                    my: 4
                }}
                variant="h5"
                align="center"
                component="h5"                
                color="white"

            >
                Bienvenidos a CorE! Hoy es un buen dia para entrenar.
            </Typography></div>
    )
}

export default LoginHeader