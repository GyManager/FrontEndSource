import * as React from 'react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

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
    createData('AvatarUrl', cliente.nombre, cliente.apellido, cliente.numeroDocumento, cliente.mail, cliente.objetivo, cliente.idCliente))
  )

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const isMediumDevice = useMediaQuery('(max-width:900px');


  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleClickRow = (id) => {
    navigate('/clientes/' + id)

  }

  return (
    <Paper sx={{
      width: '100%', overflow: 'hidden',
      //  backgroundColor: 'yellow'
    }}>
      <TableContainer sx={{ height: { xs: '55vh', md: '35vh', lg: '40vh', xl: '52vh' } }} >
        {/* <TableContainer sx={{height :'90%'}} > */}
        <Table stickyHeader aria-label="sticky table" size={isMediumDevice ? "small" : "medium"}  >
          <TableHead>
            <TableRow>
              {columns.filter(isMediumDevice ? columnasReducidas : columnasTodas)
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
                  // Para el caso de que devuelva un 404, retorna mensaje de que no se encontraron clientes
                 /*
                  
                   props.clientes[0].status === 404
                    ?
                    <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                      <TableCell colSpan={6} variant='body' key={props.clientes[0].message}>
                        <Typography variant='subtitle1' align='center'>
                          {props.clientes[0].message}
                        </Typography>
                      </TableCell>
                    </TableRow>

                    : 
                    
                    */


                    <TableRow hover role="checkbox" tabIndex={-1} key={row.idPersona}
                      onClick={() => handleClickRow(row.idPersona)} sx={{ cursor: 'pointer' }}>
                      {columns.filter(isMediumDevice ? columnasReducidas : columnasTodas)
                        .map((column) => {
                          const value = row[column.id];
                          return (
                            column.id === 'avatar'
                              ?
                              <TableCell key={column.id} align={column.align}>
                                <Avatar alt="Remy Sharp" src={row.avatar} />
                              </TableCell>
                              :
                              //TODO:003 preguntar a nico: Porque se rompe el la tabla si envuelvo el table cell y en el link. 
                              // O sea arriba me lo toma, (para el primer parametro del condicional elvis), pero para el segundo, (el de abajo) no
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
      <Grid Container  >
        <Grid item xs={8} >
          <TablePagination
            rowsPerPageOptions={isMediumDevice ? [] : [10, 25, 100]}
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