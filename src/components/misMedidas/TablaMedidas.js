import * as React from "react";
import { useState } from "react";

import { useNavigate } from "react-router-dom";
import _ from "lodash";
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


export default function TablaMedidas(props) {
    const pairs = _.toPairs(props.ultimasMedidas);
    console.log(_.keys(props.ultimasMedidas))
    console.log('pairs',pairs)
// elimino los valores que no necesito
    const filteredPairs = pairs.filter(
        (unPar) => unPar[0] !== "idMedidas" && unPar[0] !== "fecha" && unPar[0] !== "foto"
    );
    // console.log('filteredPairs', filteredPairs)

    const nombresDeMedida = [
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
        "Brazo Derecho"
    ];

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
                        {filteredPairs.map((par, index) => (
                            <TableMedidasRow
                                key={par[0]}
                                nombreDeMedida={nombresDeMedida[index]}
                                valorDeMedida={par[1]}
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
