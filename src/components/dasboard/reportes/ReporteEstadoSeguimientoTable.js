import {
    Divider,
    Paper,
    Skeleton,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
    useMediaQuery,
} from "@mui/material";
import { AxiosError } from "axios";
import { useContext, useEffect, useState } from "react";
import { ErrorContext } from "../../../context/ErrorContext";
import clientsService from "../../../services/clients.service";
import AvatarProfilePic from "../../reusable/AvatarProfilePic";

export default function ReporteEstadoSeguimientoTable(props) {
    const isMediumDevice = useMediaQuery("(max-width:900px");
    const [clientes, setClientes] = useState(() => []);
    const [loading, setLoading] = useState(() => true);

    const [clientesTotal, setClientesTotal] = useState(() => 0);
    const [page, setPage] = useState(() => 0);
    const [pageSize, setPageSize] = useState(() => 10);
    const { processErrorMessage } = useContext(ErrorContext);

    useEffect(() => {
        async function fetchData() {
            setLoading(true);
            const response = await clientsService.getClientsConSeguimientos(
                "",
                pageSize,
                page,
                7,
                props.estadoSeguimientoSeleccionado.join(",")
            );
            if (response instanceof AxiosError) {
                processErrorMessage(response.response.data);
            } else {
                setClientes(response.content);
                setClientesTotal(response.totalElements);
                setLoading(false);
            }
        }
        fetchData();
    }, [props.estadoSeguimientoSeleccionado]);

    const tableRows = clientes.map((cliente) => (
        <TableRow hover key={cliente.idCliente} sx={{ cursor: "pointer" }}>
            {!isMediumDevice && (
                <TableCell>
                    <AvatarProfilePic idUsuario={cliente.usuario.idUsuario} />
                </TableCell>
            )}
            <TableCell>{cliente.usuario.nombre}</TableCell>
            <TableCell>{cliente.usuario.apellido}</TableCell>
            {!isMediumDevice && <TableCell>{cliente.usuario.mail}</TableCell>}
            <TableCell>{cliente.seguimientosEstado.join(", ")}</TableCell>
        </TableRow>
    ));

    const skeleton = [...Array(pageSize)].map((currentValue, index, array) => (
        <TableRow key={index}>
            <TableCell sx={{ width: "20%" }}>
                <Skeleton animation="wave" />
            </TableCell>
            <TableCell sx={{ width: "20%" }}>
                <Skeleton animation="wave" />
            </TableCell>
            <TableCell sx={{ width: "20%" }}>
                <Skeleton animation="wave" />
            </TableCell>
            <TableCell sx={{ width: "20%" }}>
                <Skeleton animation="wave" />
            </TableCell>
            <TableCell sx={{ width: "20%" }}>
                <Skeleton animation="wave" />
            </TableCell>
        </TableRow>
    ));

    return (
        <Paper>
            <TableContainer sx={{ height: { xs: "64vh", md: "40vh" } }}>
                <Table size="small">
                    <TableHead>
                        <TableRow>
                            {!isMediumDevice && <TableCell> Avatar </TableCell>}
                            <TableCell> Nombre </TableCell>
                            <TableCell> Apellido </TableCell>
                            {!isMediumDevice && <TableCell> Email </TableCell>}
                            <TableCell> Estados </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>{loading ? skeleton : tableRows}</TableBody>
                </Table>
            </TableContainer>
            <Divider />
            <TablePagination
                sx={{ justifyContent: "center", display: "flex" }}
                labelRowsPerPage="Filas"
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={clientesTotal}
                rowsPerPage={pageSize}
                page={page}
                onPageChange={(event, newPage) => {
                    setPage(newPage);
                }}
                onRowsPerPageChange={(event) => {
                    setPageSize(event.target.value);
                }}
            />
        </Paper>
    );
}
