import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';

const columns = [
  {
    id: 'avatar',
    label: 'Avatar',
    minWidth: 50,
    align: 'left',
  },
  {
    id: 'name',
    label: 'Nombre',
    minWidth: 130,
    align: 'left',
  },
  {
    id: 'lastName',
    label: 'Apellido',
    minWidth: 130,
    align: 'left',
  },
  {
    id: 'numDocument',
    label: 'Nro. de Documento',
    minWidth: 60,
    align: 'left',
  },
  {
    id: 'email',
    label: 'Email',
    minWidth: 170,
    align: 'left',
  },
  {
    id: 'state',
    label: 'Estado',
    minWidth: 70,
    align: 'left',
  },
];

// function createData(name, code, population, size) {
function createData(avatar, name, lastName, numDocument, email, state) {
    return { avatar, name, lastName, numDocument, email, state};
}

const rows = [
   createData('avatar','Federico', 'Garip','29000000','garip.federico@gmail.com','Activo'),
   createData('avatar','Federico', 'Garip','29000000','garip.federico@gmail.com','Activo'),
   createData('avatar','Federico', 'Garip','29000000','garip.federico@gmail.com','Activo'),
   createData('avatar','Federico', 'Garip','29000000','garip.federico@gmail.com','Activo'),
   createData('avatar','Federico', 'Garip','29000000','garip.federico@gmail.com','Activo'),
   createData('avatar','Federico', 'Garip','29000000','garip.federico@gmail.com','Activo'),
   createData('avatar','Federico', 'Garip','29000000','garip.federico@gmail.com','Activo'),
   createData('avatar','Federico', 'Garip','29000000','garip.federico@gmail.com','Activo'),
   createData('avatar','Federico', 'Garip','29000000','garip.federico@gmail.com','Activo'),
   createData('avatar','Federico', 'Garip','29000000','garip.federico@gmail.com','Activo'),
   createData('avatar','Federico', 'Garip','29000000','garip.federico@gmail.com','Activo'),
   createData('avatar','Federico', 'Garip','29000000','garip.federico@gmail.com','Activo'),
   createData('avatar','Federico', 'Garip','29000000','garip.federico@gmail.com','Activo'),
   createData('avatar','Federico', 'Garip','29000000','garip.federico@gmail.com','Activo'),
   createData('avatar','Federico', 'Garip','29000000','garip.federico@gmail.com','Activo'),
   createData('avatar','Federico', 'Garip','29000000','garip.federico@gmail.com','Activo'),
   createData('avatar','Federico', 'Garip','29000000','garip.federico@gmail.com','Activo'),
   
];

export default function TablesClient() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: {xs:'55vh', md:'50vh'} }} >
        <Table stickyHeader aria-label="sticky table" size='small' >
          <TableHead>
            <TableRow>
              {columns.map((column) => (
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
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
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
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}

