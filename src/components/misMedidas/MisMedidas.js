import { Box, Paper, Typography } from "@mui/material";
import { Container } from "@mui/system";
import React from "react";
import DatePicker from "../reusable/DatePicker";
import TablaMedidas from "./TablaMedidas"

function MisMedidas() {
    return (
        <Container maxWidth="md" disableGutters>
            <Paper sx={{ mx: 1, p: 1, my: 2 }} elevation={2}>
                <Box sx={{ display: "flex", flexDirection: "row", justifyContent:'space-between', alignItems:'center', mb:3 }}>
                    <Typography variant="h5" align="center">
                        Mis Medidas
                    </Typography>

                    <Box sx={{ width:'40vw',mt: 2}}>
                        <DatePicker
                            // value={fechaBusqueda}
                            id="fechaBusqueda"
                            name="fechaBusqueda"
                            label="Ver medidas desde"
                            editable={true}
                            // onChange={(id, value) => setFechaBusqueda(value)}
                        />
                    </Box>
                </Box>
            <TablaMedidas/>
            </Paper>

        </Container>
    );
}

export default MisMedidas;
