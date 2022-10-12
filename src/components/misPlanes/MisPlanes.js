import { Paper, Typography } from "@mui/material";
import { AxiosError } from "axios";
import { Fragment, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import planesService from "../../services/planes.service";

export default function MisPlanes() {
    const [loading, setLoading] = useState(false);
    const [ningunPlanVigente, setNingunPlanVigente] = useState(false);
    const [planes, setPlanes] = useState([]);

    const { getUserInfo } = useContext(UserContext);

    const navigate = useNavigate();

    async function getPlanesByIdCliente(){
        setLoading(true);

        let usuario = await getUserInfo();
        const respuesta = await planesService.getPlanesByIdCliente(
            usuario.cliente.idCliente,
            "ACTIVOS"
        );

        setLoading(false);

        if (respuesta instanceof AxiosError) {
            console.log(respuesta); // TODO improve
        } else {
            if (respuesta.length === 0) {
                setNingunPlanVigente(true);
            } else if (respuesta.length === 1) {
                navigate(`/mis-planes/${respuesta[0].idPlan}`);
            } else {
                setPlanes(respuesta);
            }
        }
    };

    useEffect(() => {
        getPlanesByIdCliente();
    }, []);

    return (
        <Fragment>
            {loading && !ningunPlanVigente && planes.length !== 0 ? (
                <Fragment></Fragment>
            ) : (
                <Fragment>
                    <Paper>
                        {ningunPlanVigente && <Typography>No posee planes asignados</Typography>}
                    </Paper>
                </Fragment>
            )}
        </Fragment>
    );
}
