import * as React from 'react';
import {  useNavigate } from 'react-router-dom';

import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';

import { useMediaQuery, Grid } from '@mui/material';
import TablesClientRow from './TablesClientRow';

export default function TablesClient(props) {

  const navigate = useNavigate()

  const isMediumDevice = useMediaQuery('(max-width:900px');

  const handleClickRow = (id) => {
    navigate('/clientes/' + id)
  }

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>

      <TableContainer sx={{ height: { xs: '55vh', md: '46vh'} }} >
        <Table stickyHeader aria-label="sticky table" size={isMediumDevice ? "small" : "medium"}  >
          
          <TableHead>
            <TableRow>
                { !isMediumDevice && <TableCell align='left' style={{ minWidth: 20}}> Avatar </TableCell> }
                <TableCell align='left' style={{ minWidth: 20}}> Nombre </TableCell>
                <TableCell align='left' style={{ minWidth: 20}}> Apellido </TableCell>
                <TableCell align='left' style={{ minWidth: 8}}> Nro. de Documento </TableCell>
                { !isMediumDevice && <TableCell align='left' style={{ minWidth: 30}}> Email </TableCell> }
                { !isMediumDevice && <TableCell align='left' style={{ minWidth: 30}}> Estado </TableCell> }
            </TableRow>
          </TableHead>

          <TableBody id='tbClient'>
            {props.clientes.map((row) => (
              <TablesClientRow key={row.idCliente} 
              {...row} 
              handleClickRow={handleClickRow}
              isMediumDevice={isMediumDevice}
              />
            ))}
          </TableBody>

        </Table>
      </TableContainer>

      <Grid container  >
        <Grid item xs={8} >
          <TablePagination
            rowsPerPageOptions={isMediumDevice ? [] : [10, 25, 100]}
            component="div"
            count={props.clientesTotal}
            rowsPerPage={props.rowsPerPage}
            page={props.page} 
            onPageChange={props.handleChangePage}
            onRowsPerPageChange={props.handleChangeRowsPerPage}
          />
        </Grid>
      </Grid>

    </Paper>
  );
}