import React from 'react'
import Typography from '@mui/material/Typography';

function LoginHeader() {
    return (
        <div>
            <Typography
                sx={{
                    mt: { xs: 1, lg: 3, xl: 12 }
                }}
                variant="h4"
                align="center"
                component="div"
            >
                CorE
            </Typography>
            <Typography
                sx={{
                    mt: { xs: 2, sm: 4, md: 3, lg: 3, xl: 4 },
                    mb: { xs: 4, sm: 4, md: 6, lg: 3, xl: 10 }
                }}
                variant="body2"
                align="center"
                component="div"
            >
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Minima aspernatur non ex  ea?
            </Typography></div>
    )
}

export default LoginHeader