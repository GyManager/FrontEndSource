import { InfoOutlined } from "@mui/icons-material";
import { Card, CardContent, CardHeader, Collapse, IconButton, Typography } from "@mui/material";
import { useState } from "react";

export default function EjercicioAplicadoCard(props) {
    const [collapsed, setCollapsed] = useState(false);

    function clickCard(e) {
        setCollapsed(!collapsed);
    }
    return (
        <Card sx={{ my: 0.5, borderRadius: 1}} elevation={2}>
            <CardHeader
                onClick={clickCard}
                title={props.nombreEjercicio}
                titleTypographyProps={{ variant: "h6" }}
                sx={{ pb: 2 }}
                action={
                    <IconButton aria-label="info" onClick={(e) => props.setEjercicioSeleccionado(props.idEjercicioAplicado)}>
                        <InfoOutlined />
                    </IconButton>
                }
            />
            <Collapse in={collapsed} timeout={{ enter: 300, exit: 500 }}>
                <CardContent sx={{ pt: 0 }}>
                    <Typography variant="body2">
                        {props.series !== null && `Series: ${props.series} `}
                    </Typography>
                    <Typography variant="body2">
                        {props.repeticiones !== null && `Repeticiones: ${props.repeticiones}`}
                    </Typography>
                    <Typography variant="body2">
                        {props.pausaMicro !== null && `Pausa Micro: ${props.pausaMicro} `}
                    </Typography>
                    <Typography variant="body2">
                        {props.pausaMacro !== null && `Pausa Macro: ${props.pausaMacro}`}
                    </Typography>
                    <Typography variant="body2">
                        {props.tiempo !== null && `Tiempo: ${props.tiempo} `}
                    </Typography>
                    <Typography variant="body2">
                        {props.carga !== null && `Carga: ${props.carga}`}
                    </Typography>
                </CardContent>
            </Collapse>
        </Card>
    );
}
