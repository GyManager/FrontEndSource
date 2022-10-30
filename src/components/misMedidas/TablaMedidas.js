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
    TableRow,
    Skeleton,
    Grid,
} from "@mui/material";

import TableMedidasRow from "./TableMedidasRow";
export default function TablaMedidas(props) {
    const navigate = useNavigate();

    const nombresVisualesDeMedida = [
        "Peso",
        "Altura",
        "Cervical",
        "Dorsal",
        "Lumbar",
        "Coxal Pelvica",
        "Cadera",
        "Muslo Izquierdo",
        "Muslo Derecho",
        "Rodillas Izquierda",
        "Rodillas Derecha",
        "Gemelo Izquierdo",
        "Gemelo Derecho",
        "Brazo Izquierdo",
        "Brazo Derecho",
    ];
    const medidasKeys = Object.keys(props.formik.values.medidas)

    const filteredMedidasKeys = medidasKeys.filter(
        (unaKey) => unaKey !== "idMedidas" && unaKey !== "fecha" && unaKey !== "foto"
    );

    const nombresDatosDeMedida = filteredMedidasKeys


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
                                Medida
                            </TableCell>
                            <TableCell align="left" style={{ minWidth: 80 }}>
                                Valor
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody id="tbMedidas">
                        {nombresVisualesDeMedida.map((unNombreVisualDeMedida, index) => (
                            <TableMedidasRow
                                editable={props.editable}
                                key={unNombreVisualDeMedida}
                                nombreVisualDeMedida={unNombreVisualDeMedida}
                                nombreDatoDeMedida={nombresDatosDeMedida[index]}
                                handleRowClick={handleRowClick}
                                formik={props.formik}
                            />
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Grid container></Grid>
        </Paper>
    );
}
