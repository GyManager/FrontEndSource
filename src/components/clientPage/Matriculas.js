import {
    Box,
    Card,
    CardContent,
    CardHeader,
    Skeleton,
    Typography,
} from "@mui/material";
import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import matriculasService from "../../services/matriculas.service";

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
            <Typography sx={{ fontSize: { xs: 20, md: 24 } }}>Matricula del cliente</Typography>
            <Typography sx={{ fontSize: { xs: 16, md: 20 } }}>Estado: {props.clienteEstado}</Typography>
            {loading && <Skeleton />}
            {!loading &&
                matriculaVigente !== null &&
                matriculaVigente !== undefined && (
                    <Card>
                        <CardHeader
                            title={"Matricula Vigente"}
                            titleTypographyProps={{ variant: "h6" }}
                        />
                        <CardContent sx={{ pt: 0 }}>
                            <Typography variant="p">
                                Fecha de pago: {matriculaVigente.fechaPago}
                                <br />
                                Fecha de inicio: {matriculaVigente.fechaInicio}
                                <br />
                                Fecha de vencimiento:{" "}
                                {matriculaVigente.fechaVencimiento}
                            </Typography>
                        </CardContent>
                    </Card>
                )}
        </Box>
    );
}
