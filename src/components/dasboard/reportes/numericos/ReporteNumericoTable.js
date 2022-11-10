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
import { useNavigate } from "react-router-dom";
import { ErrorContext } from "../../../../context/ErrorContext";
import AvatarProfilePic from "../../../reusable/AvatarProfilePic";

export default function ReporteNumericoTable(props) {
    const isMediumDevice = useMediaQuery("(max-width:900px");
    const navigate = useNavigate();
    const [clientes, setClientes] = useState(() => []);
    const [loading, setLoading] = useState(() => true);

    const [clientesTotal, setClientesTotal] = useState(() => 0);
    const [page, setPage] = useState(() => 0);
    const [pageSize, setPageSize] = useState(() => 10);
    const { processErrorMessage } = useContext(ErrorContext);

    useEffect(() => {
        async function fetchData() {
            setLoading(true);
            const response = await props.fetchClientes(null, pageSize, page, null, null, null);
            if (response instanceof AxiosError) {
                processErrorMessage(response.response.data);
            } else {
                setClientes(response.content);
                setClientesTotal(response.totalElements);
                setLoading(false);
            }
        }
        fetchData();
    }, [page, pageSize]);

    const tableRows = clientes.map((cliente) => (
        <TableRow
            hover
            key={cliente.idCliente}
            sx={{ cursor: "pointer" }}
            onClick={() => navigate(`/clientes/${cliente.idCliente}`)}
        >
            {!isMediumDevice && (
                <TableCell>
                    <AvatarProfilePic idUsuario={cliente.usuario.idUsuario} />
                </TableCell>
            )}
            <TableCell>{cliente.usuario.nombre}</TableCell>
            <TableCell>{cliente.usuario.apellido}</TableCell>
            <TableCell>{cliente.usuario.mail}</TableCell>
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
            <TableContainer sx={{ height: { xs: "64vh", md: "70vh" } }}>
                <Table size="small">
                    <TableHead>
                        <TableRow>
                            {!isMediumDevice && <TableCell> Avatar </TableCell>}
                            <TableCell> Nombre </TableCell>
                            <TableCell> Apellido </TableCell>
                            <TableCell> Email </TableCell>
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
