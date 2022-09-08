import { TableCell, TableRow } from "@mui/material";


export default function TableEjerciciosRow(props) {
    return (
        <TableRow hover
        tabIndex={-1}
        onClick={() => props.handleRowClick(props.idEjercicio)}
        sx={{cursor: 'pointer'}}
        >
            <TableCell>{props.nombre}</TableCell>
            <TableCell>{props.tipoEjercicio}</TableCell>
        </TableRow>

    )
}