import { Button, TableCell, TableRow, TextField, Typography } from "@mui/material";
import TimelineIcon from "@mui/icons-material/Timeline";
import { Box } from "@mui/system";

export default function TableMedidasRow(props) {
    const unidadMedida =
        props.nombreVisualDeMedida === "Altura" ? "m" : props.nombreVisualDeMedida === "Peso" ? "kg" : "cm";
    const handleClick = () => {};
    return (
        <TableRow
            hover
            tabIndex={-1}
            // onClick={() => props.handleRowClick(props.idEjercicio)}
            // sx={{cursor: 'pointer'}}
        >
            <>
                <TableCell>
                    {props.nombreVisualDeMedida === "Peso" ? (
                        <Button
                            variant="outlined"
                            endIcon={<TimelineIcon />}
                            onClick={() => handleClick(props.nombreVisualDeMedida)}
                        >
                            Peso
                        </Button>
                    ) : (
                        <Typography variant="body1">{props.nombreVisualDeMedida}</Typography>
                    )}
                </TableCell>
                <TableCell>
                    {props.editable ? (
                        <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                            <TextField
                                sx={{ minWidth: "100px", maxWidth: "250px" }}
                                variant="standard"
                                id={`medidas.$(props.nombreDatoDeMedida)`}
                                name={`medidas.${props.nombreDatoDeMedida}`}
                                // Paso un propiedad pero definida atraves de una variable [props.nombreDatoDeMedida]
                                value={props.formik.values.medidas[props.nombreDatoDeMedida]}
                                onChange={props.formik.handleChange}
                                inputProps={{ readOnly: Boolean(!props.editable) }}
                                error={
                                    props.formik.touched[props.nombreDatoDeMedida] &&
                                    Boolean(props.formik.errors[props.nombreDatoDeMedida])
                                }
                                helperText={
                                    props.formik.touched[props.nombreDatoDeMedida] && props.formik.errors[props.nombreDatoDeMedida]
                                }
                            />
                            <Typography variant="body1" sx={{ ml: 1 }}>
                                {unidadMedida}
                            </Typography>
                        </Box>
                    ) : (
                        <Typography variant="body1">
                            {" "}
                            {props.formik.values.medidas[props.nombreDatoDeMedida] + " " + unidadMedida}
                        </Typography>
                    )}
                </TableCell>
            </>
        </TableRow>
    );
}
