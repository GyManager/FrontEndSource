import { Chip, TableCell, TableRow } from "@mui/material";
import AvatarProfilePic from "../reusable/AvatarProfilePic";


export default function TablesClientRow(props) {
    return (
        <TableRow hover
            tabIndex={-1} 
            onClick={() => props.handleClickRow(props.idCliente)} 
            sx={{ cursor: 'pointer' }}
        >
            { !props.isMediumDevice && <TableCell align='left' key={"avatar"}> <AvatarProfilePic idUsuario={props.idUsuario}/> </TableCell> }
            <TableCell align='left' key={"nombre"}> {props.nombre}</TableCell>
            <TableCell align='left' key={"apellido"}> {props.apellido}</TableCell>
            <TableCell align='left' key={"numdoc"}> {props.numeroDocumento}</TableCell>
            { !props.isMediumDevice && <TableCell align='left' key={"mail"}> {props.mail}</TableCell> }
            { !props.isMediumDevice && <TableCell align='left' key={"estado"}> <Chip label={props.clienteEstado}/></TableCell> }
        </TableRow>
    )
}