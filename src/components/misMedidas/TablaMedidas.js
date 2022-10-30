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
    TableRow,
    Skeleton,
    Grid,
} from "@mui/material";

import TableMedidasRow from "./TableMedidasRow";
import { useMediaQuery } from "@mui/material";

export default function TablaMedidas(props) {
    // Paso el objeto medida a un array de pares de medidas o sea:
    // {altura: 179,...} to [[altura,179],...]
    const pairs = _.toPairs(props.ultimasMedidas);
    // Elimino los valores que no necesito
    const filteredPairs = pairs.filter(
        (unPar) => unPar[0] !== "idMedidas" && unPar[0] !== "fecha" && unPar[0] !== "foto"
    );
    // console.log('filteredPairs', filteredPairs)

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
    // const nombresDatosDeMedida= props.formik.values.keys
    console.log('formik.values', props.formik.values.medidas)
    // console.log('nombresDatosDeMedida',props.nombresDatosDeMedida)
    const nombresKeys = props.formik.values.keys
    console.log('nombresKeys',nombresKeys)

    const nombresDatosDeMedida= [
	"peso",
	"altura",
	"cervical",
	"dorsal",
	"lumbar",
	"coxalPelvica",
	"cadera",
	"muslosIzq",
	"muslosDer",
	"rodillasIzq",
	"rodillasDer",
	"gemelosIzq",
	"gemelosDer",
	"brazoIzq",
	"brazoDer"
    ]

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
                                Medida
                            </TableCell>
                            <TableCell align="left" style={{ minWidth: 80 }}>
                                Valor
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody id="tbMedidas">
                        {filteredPairs.map((par, index) => (
                            <TableMedidasRow
                                editable={props.editable}
                                key={par[0]}
                                nombreVisualDeMedida={nombresVisualesDeMedida[index]}
                                nombreDatoDeMedida={nombresDatosDeMedida[index]}
                                // valueTextField={props.formik.values}
                                // valorDeMedida={par[1]}
                                // valorDeMedida={par[1]}
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
