import * as React from "react";
import { useState } from "react";

import { useNavigate } from "react-router-dom";

import {
    Paper,
    TableBody,
    TableCell,
    Table,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
    Skeleton,
    Grid,
} from "@mui/material";

import TableMedidasRow from "./TableMedidasRow";
import { useMediaQuery } from "@mui/material";

const medidas = [
    { medida: "Peso", valor: "85" },
    { medida: "Altura", valor: "85" },
    { medida: "Cervical", valor: "85" },
    { medida: "Dorsal", valor: "85" },
    { medida: "Lumbar", valor: "85" },
    { medida: "Coxal Pelvica", valor: "52" },
    { medida: "Cadera", valor: "52" },
    { medida: "Muslo Izquierdo", valor: "52" },
    { medida: "Muslo Derecho", valor: "52" },
    { medida: "Rodilla Izquierda", valor: "52" },
    { medida: "Rodilla Derecha", valor: "52" },
    { medida: "Gemelo Izquierdo", valor: "52" },
    { medida: "Gemelo Derecho", valor: "52" },
];

export default function StickyHeadTable(props) {
    const navigate = useNavigate();
    const isMediumDevice = useMediaQuery("(max-width:900px");

    const handleRowClick = (id) => {
        navigate("/ejercicios/" + id);
    };

    return (
        <Paper sx={{ width: "100%", overflow: "hidden" }}>
            <TableContainer sx={{ height: { xs: "69vh", md: "62vh", lg: "48vh", xl: "52vh" } }}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="left" style={{ minWidth: 80 }}>
                                Ejercicio
                            </TableCell>
                            <TableCell align="left" style={{ minWidth: 80 }}>
                                Tipo de Ejercicio
                            </TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody id="tbMedidas">
                        {medidas.map((row) => (
                            <TableMedidasRow key={row.idEjercicio}
                                {...row}
                                handleRowClick={handleRowClick}
                            />
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Grid container></Grid>
        </Paper>
    );
}
