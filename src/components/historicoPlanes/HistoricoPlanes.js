import { Paper, Skeleton, Typography } from "@mui/material";
import { Container } from "@mui/system";
import { AxiosError } from "axios";
import { useContext, useEffect, useState } from "react";
import { ErrorContext } from "../../context/ErrorContext";
import { UserContext } from "../../context/UserContext";
import planesService from "../../services/planes.service";
import DatePicker from "../reusable/DatePicker";
import PlanCard from "./PlanCard";

export default function HistoricoPlanes() {
    const [loading, setLoading] = useState(false);
    const [planes, setPlanes] = useState([]);
    const [fechaBusqueda, setFechaBusqueda] = useState(() => "");
    const { getUserInfo } = useContext(UserContext);
    const { processErrorMessage } = useContext(ErrorContext);

    async function getPlanesByIdCliente() {
        setLoading(true);

        let usuario = await getUserInfo();
        const respuesta = await planesService.getPlanesByIdCliente(
            usuario.cliente.idCliente,
            "TODOS"
        );

        if (respuesta instanceof AxiosError) {
            processErrorMessage(respuesta.response.data);
        } else {
            setPlanes(respuesta);
        }
        setLoading(false);
    }

    useEffect(() => {
        getPlanesByIdCliente();
    }, []);

    const planesShow = loading ? (
        <Skeleton variant="rectangular" height={108} sx={{ m: 1 }} />
    ) : (
        planes
            .sort((a, b) => (Date.parse(a.fechaDesde) < Date.parse(b.fechaDesde) ? -1 : 1))
            .map((plan) => (
                <PlanCard {...plan} key={plan.idPlan} route={`/mis-planes/${plan.idPlan}`} />
            ))
    );

    return (
        <Container maxWidth="md" disableGutters>
            <Paper sx={{ mx: 1, p: 1, my: 2 }} elevation={2}>
                <Typography variant="h4" align="center">
                    Historico planes
                </Typography>

                <Container sx={{ mt: 2 }}>
                    <DatePicker
                        value={fechaBusqueda}
                        id="fechaBusqueda"
                        name="fechaBusqueda"
                        label="Ver planes desde"
                        editable={true}
                        onChange={(id, value) => setFechaBusqueda(value)}
                    />
                </Container>
            </Paper>
            {planesShow}
        </Container>
    );
}
