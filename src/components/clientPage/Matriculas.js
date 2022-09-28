import { Add } from "@mui/icons-material";
import { Button, Skeleton, Typography } from "@mui/material";
import { AxiosError } from "axios";
import { Fragment, useContext, useEffect, useState } from "react";
import { ErrorContext } from "../../context/ErrorContext";
import { SnackbarContext } from "../../context/SnackbarContext";
import matriculasService from "../../services/matriculas.service";
import Matricula from "./Matricula";
import MatriculaModal from "./MatriculaModal";

/**
 *
 * @param {idCliente, clienteEstado} props
 * @returns
 */
export default function Matriculas(props) {
    const { addSnackbar } = useContext(SnackbarContext);
    const { processErrorMessage } = useContext(ErrorContext);

    const [loading, setLoading] = useState(false);
    const [matriculas, setMatriculas] = useState([]);
    const [openAddModal, setOpenAddModal] = useState(() => false);

    useEffect(() => {
        getMatriculasByIdCliente();
    }, [props.idCliente]);

    async function getMatriculasByIdCliente() {
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

    async function postMatricula(matricula, idCliente) {
        const respuesta = await matriculasService.postMatricula(
            matricula,
            idCliente
        );
        handleRespuesta(respuesta, "La matricula se ha cargado con exito");
    }

    async function deleteMatricula(idCliente, idMatricula) {
        const respuesta = await matriculasService.deleteMatriculaById(
            idCliente,
            idMatricula
        );
        handleRespuesta(respuesta, "La matricula se ha eliminado con exito");
    }

    const handleRespuesta = (respuesta, mensaje) => {
        if (respuesta instanceof AxiosError) {
            processErrorMessage(respuesta.response.data);
        } else {
            addSnackbar({ message: mensaje, severity: "success" });
            getMatriculasByIdCliente();
            setOpenAddModal(false);
        }
    };

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
                        deleteMatricula={deleteMatricula}
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
                        deleteMatricula={deleteMatricula}
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
                    postMatricula={postMatricula}
                    open={openAddModal}
                    setOpen={setOpenAddModal}
                    idCliente={props.idCliente}
                />
            )}
        </Fragment>
    );
}
