import { Add } from "@mui/icons-material";
import { Button, Skeleton, Typography } from "@mui/material";
import { AxiosError } from "axios";
import { Fragment, useEffect, useState } from "react";
import matriculasService from "../../services/matriculas.service";
import Matricula from "./Matricula";
import MatriculaModal from "./MatriculaModal";

/**
 *
 * @param {idCliente, clienteEstado} props
 * @returns
 */
export default function Matriculas(props) {
    const [loading, setLoading] = useState(false);
    const [matriculas, setMatriculas] = useState([]);
    const [openAddModal, setOpenAddModal] = useState(() => false);

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
        <Fragment>
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
                matriculasFuturas.map((matricula) => (
                    <Matricula
                        title="Matricula Siguiente"
                        collapsable
                        {...matricula}
                    />
                ))}

            {!loading &&
                (matriculaVigente === null ||
                    matriculaVigente === undefined ||
                    matriculasFuturas === null ||
                    matriculasFuturas === undefined ||
                    matriculasFuturas.length === 0) && (
                    <Button
                        size="medium"
                        variant="contained"
                        sx={{ maxWidth: { xs: "100%", md: "55%" }, mt: 2 }}
                        startIcon={<Add />}
                        onClick={() => setOpenAddModal(true)}
                    >
                        Agregar matricula
                    </Button>
                )}
            {openAddModal && (
                <MatriculaModal
                    open={openAddModal}
                    setOpen={setOpenAddModal}
                    idCliente={props.idCliente}
                />
            )}
        </Fragment>
    );
}
