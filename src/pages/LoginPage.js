import React, { useState } from 'react'

import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField'
import Checkbox from '@mui/material/Checkbox'
import FormControlLabel from '@mui/material/FormControlLabel'
import Button from '@mui/material/Button'


export default function LoginPage() {
    const [email, setEmail] = useState(() => '');
    const [password, setPassword] = useState(() => '')
    return (
        <div>
            <Box sx={{ width: '100%' }}
                    
            >
                <Container maxWidth="xs">
                    <Typography variant="h4" align="center" component="div" gutterBottom>
                        CorE
                    </Typography>
                    <Typography sx={{ mb: 4 }} variant="body2" align="center" component="div" gutterBottom>
                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Minima aspernatur non ex  ea?
                    </Typography>
                    <Paper
                        sx={{ borderRadius: 3 }}
                        elevation={3}
                    >
                        <Container component="form" sx={{ gap: 4 }}>
                            <Typography
                                sx={{ pt: 5, pb: 1 }}
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
                                color="secondary"
                            >
                                Iniciar sesión
                            </Button>

                            <Typography
                                sx={{ pt: 1, pb: 3 }}
                                variant="caption"
                                align="right"
                                component="div"
                                gutterBottom>
                                Olvido su contraseña?
                            </Typography>

                        </Container>
                    </Paper>
                </Container>
            </Box>
        </div>
    )
}
