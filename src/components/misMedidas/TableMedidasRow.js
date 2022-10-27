import { Button, TableCell, TableRow, TextField, Typography } from "@mui/material";
import TimelineIcon from "@mui/icons-material/Timeline";

export default function TableMedidasRow(props) {
    const unidadMedida =
        props.nombreDeMedida === "Altura" ? "m" : props.nombreDeMedida === "Peso" ? "kg" : "cm";
    return (
        <TableRow
            hover
            tabIndex={-1}
            // onClick={() => props.handleRowClick(props.idEjercicio)}
            // sx={{cursor: 'pointer'}}
        >
            {props.nombreDeMedida === "Peso" ? (
                <>
                    <TableCell>
                        <Button variant="outlined" endIcon={<TimelineIcon />}>
                            {" "}
                            Peso
                        </Button>
                    </TableCell>
                    <TableCell>
                        <TextField value={props.valorDeMedida + ' ' + unidadMedida}></TextField>
                    </TableCell>
                </>
            ) : (
                <>
                    <TableCell>{props.nombreDeMedida}</TableCell>
                    <TableCell>
                        <TextField value={props.valorDeMedida + " " + unidadMedida}></TextField>
                    </TableCell>
                </>
            )}
        </TableRow>
    );
}
