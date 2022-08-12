import * as React from 'react';
import { useNavigate } from 'react-router-dom';

import {
    Paper, TableBody, TableCell, Table, TableContainer, TableHead,
    TablePagination, TableRow, Skeleton, Grid
}
    from '@mui/material';

import { useMediaQuery } from '@mui/material'

const columns = [
    {
        id: 'nombre',
        label: 'Ejercicio',
        minWidth: 170,
        align: 'left',
    },
    {
        id: 'tipoEjercicio',
        label: 'Tipo de Ejercicio',
        minWidth: 170,
        align: 'left',
    }
];


export default function StickyHeadTable(props) {

    const SinResultados = () => {
        return (
            <TableRow>
                <TableCell colSpan={2} align='center'>
                    No  se encontraron resultados
                </TableCell>
            </TableRow>
        )
    }
    const ConResultados = () => {
        return (
            <TableRow>
                <TableCell colSpan={2} align='center'>
                    Si se encontraron resultados
                </TableCell>
            </TableRow>
        )
    }

    const EskeletonEspera = () => {

        skeletonArray.map(() => {
            return (
                <Skeleton variant='rectangular' animation="wave" />
            )
        })

    }


    const navigate = useNavigate()
    const isMediumDevice = useMediaQuery('(max-width:900px');
    const rows = props.ejercicios
    const skeletonArray = new Array(25)
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const handleRowClick = (id) => {
        navigate('/ejercicios/' + id)
    }
    console.log(rows.content)
    return (
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            {/* <TableContainer sx={{ minHeight:'40vh', maxHeight: '90vh', backgroundColor:'yellow' }}> */}
            <TableContainer
                sx={{ height: { xs: '69vh', md: '62vh', lg: '48vh', xl: '52vh' } }}
            >
                <Table stickyHeader aria-label="sticky table">
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

                        {
                            (rows.empty) ?
                                <SinResultados />
                                :
                                rows.content
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map((row) => {
                                        return (
                                            <TableRow hover role="checkbox" tabIndex={-1} key={row.idEjercicio}
                                                sx={{ cursor: 'pointer' }}
                                                onClick={() => handleRowClick(row.idEjercicio)}
                                            >
                                                {columns.map((column) => {
                                                    const value = row[column.id];
                                                    return (
                                                        // TODO Sprint 4.1 Hacer que funcione el skeleton
                                                        <TableCell key={column.id} align={column.align}>
                                                            {props.isLoading ?
                                                                <Skeleton></Skeleton>
                                                                :
                                                                column.format && typeof value === 'number'
                                                                    ? column.format(value)
                                                                    : value
                                                            }
                                                        </TableCell>
                                                    );
                                                })}
                                            </TableRow>
                                        );
                                    })
                        }
                    </TableBody>
                </Table>
            </TableContainer>
            <Grid container>
                <Grid item xs='8'>
                    <TablePagination
                        rowsPerPageOptions={isMediumDevice ? [] : [15, 30, 100]}
                        component="div"
                        count={rows.length}
                        rowsPerPage={isMediumDevice ? '' : rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </Grid>
            </Grid>
        </Paper>
    );
}


