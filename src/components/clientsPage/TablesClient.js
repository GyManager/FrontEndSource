import * as React from 'react';
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { Avatar, Typography } from '@mui/material'

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

function createData(avatar, name, lastName, numDocument, email, state, idPersona) {
  return { avatar, name, lastName, numDocument, email, state, idPersona };
}

function columnasReducidas(col) {
  return col.id !== 'avatar' && col.id !== 'email' && col.id !== 'state'
}
function columnasTodas(col) {
  return col
}

export default function TablesClient(props) {

  const navigate = useNavigate()

  const rows = props.clientes.map((cliente) => (
    createData('AvatarUrl', cliente.nombre, cliente.apellido, cliente.numeroDocumento, cliente.mail, cliente.objetivo, cliente.idPersona))
  )

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const isSmallDevice = useMediaQuery('(max-width:600px');


  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleClick = (idPerson) => {
    navigate('/clientes/' + idPerson)
  }

  //TODO ver que pasa, si es con el console.log o que, que me manda props.clientes[0].message = undefined
  // Me esta llegando un array vacio SOlucionado? Probarlo mas
  console.log('Aca van los clientes:', props.clientes)


  return (
    <Paper sx={{ width: '100%', overflow: 'hidden',
    //  backgroundColor: 'yellow'
      }}>
      <TableContainer sx={{ height: { xs: '55vh', md: '35vh', lg: '40vh', xl: '52vh' } }} >
        {/* <TableContainer sx={{height :'90%'}} > */}
        <Table stickyHeader aria-label="sticky table" size={isSmallDevice ? "small" : "medium"}  >
          <TableHead>
            <TableRow>
              {columns.filter(isSmallDevice ? columnasReducidas : columnasTodas)
                .map((column) => (
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
                  props.clientes[0].status === 404
                    ?
                    <TableCell colSpan={6} variant='body'>
                      <Typography variant='subtitle1' align='center'>
                        {props.clientes[0].message}
                      </Typography>
                    </TableCell>
                    :

                    <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                      {columns.filter(isSmallDevice ? columnasReducidas : columnasTodas)
                        .map((column) => {
                          const value = row[column.id];
                          return (
                            column.id === 'avatar'
                              ?
                              <Link to={'/clientes/' + row.idPersona}>
                                <TableCell key={column.id} align={column.align}>
                                  <Avatar alt="Remy Sharp" src={row.avatar} />
                                </TableCell>
                              </Link>
                              :
//TODO:003 preguntar a nico: Porque se rompe el la tabla si envuelvo el table cell y en el link. 
// O sea arriba me lo toma, (para el primer parametro del condicional elvis), pero para el segundo, (el de abajo) no
                              <TableCell key={column.id} align={column.align}>
                                <Link to={'/clientes/' + row.idPersona}>
                                  {column.format && typeof value === 'number'
                                    ? column.format(value)
                                    : value}
                                </Link>
                              </TableCell>


                          );
                        })}
                    </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <Grid Container  >
        <Grid item xs={8} >
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