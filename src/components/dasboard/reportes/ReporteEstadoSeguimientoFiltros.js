import { Checkbox, FormControlLabel, FormGroup, Paper, Skeleton, Typography } from "@mui/material";
import { AxiosError } from "axios";
import { useContext, useEffect, useState } from "react";
import { ErrorContext } from "../../../context/ErrorContext";
import parametersService from "../../../services/parameter.service";

export default function ReporteEstadoSeguimientoFiltros({
    estadoSeguimientoSeleccionado,
    setEstadoSeguimientoSeleccionado,
}) {
    const [loading, setLoading] = useState(() => true);
    const [estadoSeguimiento, setEstadoSeguimiento] = useState(() => []);
    const { processErrorMessage } = useContext(ErrorContext);

    useEffect(() => {
        async function fetchData() {
            setLoading(true);
            const response = await parametersService.getEstadosSeguimiento();
            if (response instanceof AxiosError) {
                processErrorMessage(response.response.data);
            } else {
                setEstadoSeguimiento(response);
                setEstadoSeguimientoSeleccionado(
                    response.map((estadoSeguimiento) => estadoSeguimiento.idEstadoSeguimiento)
                );
                setLoading(false);
            }
        }
        fetchData();
    }, []);

    function handleCheck(e) {
        const { checked, value } = e.target;
        if (checked) {
            if (!estadoSeguimientoSeleccionado.includes(value)) {
                setEstadoSeguimientoSeleccionado((prev) => [...prev, parseInt(value)]);
            }
        } else {
            setEstadoSeguimientoSeleccionado((prev) => [
                ...prev.filter((item) => item !== parseInt(value)),
            ]);
        }
    }

    return (
        <Paper sx={{ p: 2 }}>
            <Typography variant="h5" align="center">
                Filtros
            </Typography>
            <FormGroup>
                {loading ? (
                    <Skeleton></Skeleton>
                ) : (
                    estadoSeguimiento.map((estadoSeguimiento) => (
                        <FormControlLabel
                            key={estadoSeguimiento.idEstadoSeguimiento}
                            control={
                                <Checkbox
                                    onChange={(e) => handleCheck(e)}
                                    value={estadoSeguimiento.idEstadoSeguimiento}
                                    checked={estadoSeguimientoSeleccionado.includes(
                                        estadoSeguimiento.idEstadoSeguimiento
                                    )}
                                />
                            }
                            label={estadoSeguimiento.descripcion}
                        />
                    ))
                )}
            </FormGroup>
        </Paper>
    );
}
