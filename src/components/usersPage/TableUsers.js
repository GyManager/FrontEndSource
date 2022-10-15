import * as React from 'react';
import { useNavigate } from 'react-router-dom';

import {
  Paper, Table, TableBody, TableCell, TableContainer, TableHead,
  TablePagination, TableRow, Grid, useMediaQuery
} from '@mui/material';

import TableUserRow from './TableUserRow';

// export default function TablesClient(props) {
export default function TableUsers(props) {

  const navigate = useNavigate()

  const isMediumDevice = useMediaQuery('(max-width:900px');

  const handleClickRow = (id) => {
    navigate('/usuarios/' + id)
  }

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ height: { xs: '62vh', md: '48vh' } }} >
        <Table stickyHeader aria-label="sticky table" size={isMediumDevice ? "medium" : "small"}  >

          <TableHead>
            <TableRow>
              {!isMediumDevice && <TableCell align='left' style={{ minWidth: 20 }}> Avatar </TableCell>}
              <TableCell align='left' style={{ minWidth: 20 }}> Nombre </TableCell>
              <TableCell align='left' style={{ minWidth: 20 }}> Apellido </TableCell>
              <TableCell align='left' style={{ minWidth: 8 }}> Nro. de Documento </TableCell>
              {!isMediumDevice && <TableCell align='left' style={{ minWidth: 30 }}> Email </TableCell>}
              {!isMediumDevice && <TableCell align='left' style={{ minWidth: 30 }}> F. Alta </TableCell>}
              {!isMediumDevice && <TableCell align='left' style={{ minWidth: 30 }}> F. Baja </TableCell>}
            </TableRow>
          </TableHead>

          <TableBody id='tbUser'>
            {props.usuarios.map((row) => (
              <TableUserRow key={row.idUsuario}
                {...row}
                handleClickRow={handleClickRow}
                isMediumDevice={isMediumDevice}
              />
            ))}
          </TableBody>

        </Table>
      </TableContainer>

      <Grid container>
        <Grid item xs={8} >
          <TablePagination
            id='paginacionUsuarios'
            rowsPerPageOptions={isMediumDevice ? [] : [15, 25, 100]}
            component="div"
            count={props.usuariosTotal}
            rowsPerPage={props.rowsPerPage}
            page={props.page}
            onPageChange={props.handleChangePage}
            onRowsPerPageChange={props.handleChangeRowsPerPage}
            backIconButtonProps={{ id: 'backPageButtonUsers' }}
            nextIconButtonProps={{ id: 'nextPageButtonUsers' }}
            SelectProps={{ id: 'selectRowsPropsUsers' }}
          />
        </Grid>
      </Grid>

    </Paper>
  );
}
