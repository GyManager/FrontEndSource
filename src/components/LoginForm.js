import React, { useState } from 'react'

import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import Button from '@mui/material/Button'
import Link from '@mui/material/Link';

function LoginForm() {
    const [email, setEmail] = useState(() => '');
    const [password, setPassword] = useState(() => '')
    return (
        <div>
            <Paper
                sx={{ borderRadius: 3 }}
                elevation={3}
            >
                <Container component="form" sx={{ gap: 4 }}>
                    <Typography
                        sx={{ pt: 3, pb: 1 }}
                        variant="h6"
                        align="center"
                        component="div"
                        gutterBottom>
                        Iniciar Sesión
                    </Typography>
                    <TextField
                        fullWidth
                        size="small"
                        sx={{ my: 1 }}
                        id="email"
                        label="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <TextField
                        fullWidth
                        size="small"
                        sx={{ my: 1 }}
                        type="password"
                        id="password"
                        label="Contraseña"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <FormControlLabel
                        label="Recordar mi usuario"
                        size="small"
                        control={
                            <Checkbox
                                sx={{ '& .MuiSvgIcon-root': { fontSize: 14 } }}
                                value="checkBox"
                                //   onChange={()=}
                                color="primary"
                            />
                        }
                    />
                    <Button
                        fullWidth
                        sx={{ mt: 2 }}
                        variant="contained"
                        type="submit"
                        color="primary"
                    >
                        Iniciar sesión
                    </Button>
                    <Typography
                        sx={{ pt: 1, pb: 3 }}
                        variant="caption"
                        align="right"
                        component="div"
                    >
                        <Link href="">Olvido su contraseña?</Link>
                    </Typography>
                </Container>
            </Paper>
        </div>
    )
}

export default LoginForm