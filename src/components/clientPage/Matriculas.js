import {
    Box,
    Skeleton,
    Typography,
} from "@mui/material";
import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import matriculasService from "../../services/matriculas.service";
import Matricula from "./Matricula";

/**
 *
 * @param {idCliente, clienteEstado} props
 * @returns
 */
export default function Matriculas(props) {
    const [loading, setLoading] = useState(false);
    const [matriculas, setMatriculas] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const respuesta = await matriculasService.getMatriculasByIdCliente(
                props.idCliente,
                "NO_VENCIDAS"
            );
            setLoading(false);
            if (respuesta instanceof AxiosError) {
                console.log(respuesta);
            } else {
                setMatriculas(respuesta);
            }
        };
        fetchData();
    }, [props.idCliente]);

    const matriculaVigente = matriculas.filter(
        (matricula) =>
            matricula.matriculaEstado !== "VENCIDA" &&
            matricula.matriculaEstado !== "NO_INICIADA"
    )[0];
    const matriculasFuturas = matriculas.filter(
        (matricula) => matricula.matriculaEstado === "NO_INICIADA"
    );

    return (
        <Box>
            <Typography sx={{ fontSize: { xs: 20, md: 24 } }}>
                Matricula del cliente
            </Typography>
            <Typography sx={{ fontSize: { xs: 16, md: 20 } }}>
                Estado: {props.clienteEstado}
            </Typography>
            {loading && <Skeleton />}
            {!loading &&
                matriculaVigente !== null &&
                matriculaVigente !== undefined && (
                    <Matricula
                        title="Matricula Vigente"
                        {...matriculaVigente}
                    />
                )}
            {!loading &&
                matriculasFuturas !== null &&
                matriculasFuturas !== undefined && 
                matriculasFuturas.length > 0 && 
                matriculasFuturas.map( matricula => 
                    <Matricula
                        title="Matricula Siguiente"
                        collapsable
                        {...matricula}
                    />
                )}
        </Box>
    );
}
