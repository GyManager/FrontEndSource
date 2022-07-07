import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import {Avatar} from '@mui/material'

import { useMediaQuery, Grid } from '@mui/material';
import { Container } from '@mui/system';

const columns = [
  {
    id: 'avatar',
    label: 'Avatar',
    minWidth: 0,
    align: 'left',
  },
  {
    id: 'name',
    label: 'Nombre',
    minWidth: 30,
    align: 'left',
  },
  {
    id: 'lastName',
    label: 'Apellido',
    minWidth: 30,
    align: 'left',
  },
  {
    id: 'numDocument',
    label: 'Nro. de Documento',
    minWidth: 30,
    align: 'left',
  },
  {
    id: 'email',
    label: 'Email',
    minWidth: 0,
    align: 'left',
  },
  {
    id: 'state',
    label: 'Estado',
    minWidth: 0,
    align: 'left',
  },
];

// function createData(name, code, population, size) {
function createData(avatar, name, lastName, numDocument, email, state) {
  return { avatar, name, lastName, numDocument, email, state };
}

function columnasReducidas(col) {
  return col.id !== 'avatar' && col.id !== 'email' && col.id !== 'state'
}
function columnasTodas(col) {
  return col
}

export default function TablesClient(props) {

  console.log(props.clientes)

  const rows = props.clientes.map((cliente) => ( 
    createData(cliente.image, cliente.name.split(' ')[0], cliente.name.split(' ')[1], cliente.id, cliente.created, cliente.status)))

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const isSmallDevice = useMediaQuery('(max-width:600px');

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };



  // const rows = props.clientes.map((cliente) => ({
  //   cliente.

  // })



  return (
    <Paper sx={{ width: '100%', overflow: 'hidden', backgroundColor: 'yellow' }}>
      <TableContainer sx={{ maxHeight: { xs: '55vh', md: '50vh' } }} >
        <Table stickyHeader aria-label="sticky table"   >
          <TableHead>
            <TableRow>
              {/* {columns.map((column) => ( */}
              {columns.filter(isSmallDevice ? columnasReducidas : columnasTodas).map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    {columns.filter(isSmallDevice ? columnasReducidas : columnasTodas)
                      .map((column) => {
                        const value = row[column.id];
                        console.log(row.avatar)
                        return (
                          column.id === 'avatar' ?
                          <TableCell  key={column.id} align={column.align}>
                          <Avatar alt="Remy Sharp" src={row.avatar} />
                          </TableCell>
:
                          <TableCell key={column.id} align={column.align}>
                            {column.format && typeof value === 'number'
                              ? column.format(value)
                              : value}
                          </TableCell>
                        );
                      })}



                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>

      {/*       

      {
        isSmallDevice ?
          null
          :

 */}
      {/* <Grid Container justifyContent={isSmallDevice?'Left':'Right'}> */}
      <Grid Container  >
        <Grid item xs={12} >
          <TablePagination
            rowsPerPageOptions={isSmallDevice ? [] : [10, 25, 100]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Grid>
      </Grid>
    </Paper>
  );
}

