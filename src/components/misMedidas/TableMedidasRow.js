import { Button, TableCell, TableRow, TextField, Typography } from "@mui/material";
import TimelineIcon from "@mui/icons-material/Timeline";
import { Box } from "@mui/system";

export default function TableMedidasRow(props) {
    const unidadMedida =
        props.nombreDeMedida === "Altura" ? "m" : props.nombreDeMedida === "Peso" ? "kg" : "cm";
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
                    {props.nombreDeMedida === "Peso" ? (
                        <Button
                            variant="outlined"
                            endIcon={<TimelineIcon />}
                            onClick={() => handleClick(props.nombreDeMedida)}
                        >
                            Peso
                        </Button>
                    ) : (
                        props.nombreDeMedida
                    )}
                </TableCell>
                <TableCell>
                    {props.editable ? (
                        <Box sx={{display:'flex', flexDirection:'row', alignItems:'center'}}>
                            <TextField value={props.valorDeMedida} />
                            <Typography variant='body2' sx={{ml:1}}>{unidadMedida}</Typography>
                        </Box>
                    ) : (
                        props.valorDeMedida + " " + unidadMedida
                    )}
                </TableCell>
            </>
        </TableRow>
    );
}
