import { Button, TableCell, TableRow, TextField, Typography } from "@mui/material";
import TimelineIcon from "@mui/icons-material/Timeline";

export default function TableMedidasRow(props) {
    return (
        <TableRow
            hover
            tabIndex={-1}
            // onClick={() => props.handleRowClick(props.idEjercicio)}
            // sx={{cursor: 'pointer'}}
        >
            {props.medida === "Peso" ? (
                <>
                    <TableCell>
                        <Button variant='outlined' endIcon={<TimelineIcon />}> Peso</Button>
                    </TableCell>
                    <TableCell>
                        <TextField value={82}></TextField>
                    </TableCell>
                </>
            ) : (
                <>
                    <TableCell>{props.medida}</TableCell>
                    <TableCell>
                        <TextField value={props.valor}></TextField>
                    </TableCell>
                </>
            )}
        </TableRow>
    );
}
