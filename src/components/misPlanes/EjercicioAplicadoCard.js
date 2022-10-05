import { InfoOutlined } from "@mui/icons-material";
import { Card, CardContent, CardHeader, Collapse, IconButton, Typography } from "@mui/material";
import { useState } from "react";

export default function EjercicioAplicadoCard(props) {
    const [collapsed, setCollapsed] = useState(false);

    function clickCard(e) {
        setCollapsed(!collapsed);
    }
    return (
        <Card>
            <CardHeader
                onClick={clickCard}
                title="Ejercicio nombre"
                titleTypographyProps={{ variant: "h6" }}
                sx={{ pb: 2 }}
                action={
                    <IconButton aria-label="info" onClick={(e) => alert("hola")}>
                        <InfoOutlined />
                    </IconButton>
                }
            />
            <Collapse in={collapsed} timeout={{ enter: 300, exit: 1000 }}>
                <CardContent sx={{ pt: 0 }}>
                    <Typography variant="body2">Series: 2 - Repeticiones: 15</Typography>
                    <Typography variant="body2">Pausa Micro: 2s - Pausa Macro: 15s</Typography>
                    <Typography variant="body2">Tiempo: 20s - Carga: 30kg</Typography>
                </CardContent>
            </Collapse>
        </Card>
    );
}
