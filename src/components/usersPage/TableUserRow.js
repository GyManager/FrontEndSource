import { Avatar, TableCell, TableRow } from "@mui/material";


export default function TableUserRow(props) {
    return (
        <TableRow hover
            tabIndex={-1} 
            onClick={() => props.handleClickRow(props.idUsuario)} 
            sx={{ cursor: 'pointer' }}
        >
            { !props.isMediumDevice && <TableCell align='left' key={"avatar"}> <Avatar alt="Remy Sharp" src={props.avatar} /> </TableCell> }
            <TableCell align='left' key={"nombre"}> {props.nombre}</TableCell>
            <TableCell align='left' key={"apellido"}> {props.apellido}</TableCell>
            <TableCell align='left' key={"numdoc"}> {props.numeroDocumento}</TableCell>
            { !props.isMediumDevice && <TableCell align='left' key={"mail"}> {props.mail}</TableCell> }
            { !props.isMediumDevice && <TableCell align='left' key={"F. Alta"}> {props.fechaAlta}</TableCell> }
            { !props.isMediumDevice && <TableCell align='left' key={"F. Baja"}> {props.fechaBaja}</TableCell> }
        </TableRow>
    )
}