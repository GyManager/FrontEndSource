import { InfoOutlined, DataSaverOnOutlined } from "@mui/icons-material";
import {
    Button,
    Card,
    CardActions,
    CardContent,
    CardHeader,
    Collapse,
    IconButton,
    Typography,
} from "@mui/material";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";

export default function EjercicioAplicadoCard(props) {
    const [collapsed, setCollapsed] = useState(false);
    let [searchParams, setSearchParams] = useSearchParams();

    function clickCard(e) {
        e.preventDefault();
        setCollapsed(!collapsed);
    }

    function clickInfo(e) {
        e?.stopPropagation();
        setSearchParams({ idEjercicioAplicado: props.idEjercicioAplicado });
    }

    function clickSaveResults(e) {
        e?.stopPropagation();
        props.cargarSeguimiento(props.idEjercicioAplicado);
    }

    return (
        <Card sx={{ my: 0.5, borderRadius: 1 }} elevation={2}>
            <CardHeader
                onClick={clickCard}
                title={props.nombreEjercicio}
                titleTypographyProps={{ variant: "h6" }}
                sx={{ pb: 2 }}
                action={
                    <IconButton aria-label="info" onClick={clickInfo}>
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

                <Collapse direction={"horizontal"} in={true} unmountOnExit>
                    <CardActions>
                        <Button
                            size="small"
                            onClick={clickSaveResults}
                            color={props.tieneSeguimiento ? "secondary" : "primary"}
                            endIcon={<DataSaverOnOutlined />}
                        >
                            {props.tieneSeguimiento ? "Editar resultados" : "Anotar resultados"}
                        </Button>
                    </CardActions>
                </Collapse>
            </Collapse>
        </Card>
    );
}
