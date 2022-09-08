import * as React from 'react';
import { useState } from 'react';

import { useNavigate } from 'react-router-dom';

import {
    Paper, TableBody, TableCell, Table, TableContainer, TableHead,
    TablePagination, TableRow, Skeleton, Grid
}
    from '@mui/material';

import TableEjerciciosRow from './TableEjerciciosRow'
import { useMediaQuery } from '@mui/material'

export default function StickyHeadTable(props) {

    const navigate = useNavigate()
    const isMediumDevice = useMediaQuery('(max-width:900px');

    const handleRowClick = (id) => {
        navigate('/ejercicios/' + id)
    }

    return (
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            {/* <TableContainer sx={{ minHeight:'40vh', maxHeight: '90vh', backgroundColor:'yellow' }}> */}
            <TableContainer
                sx={{ height: { xs: '69vh', md: '62vh', lg: '48vh', xl: '52vh' } }}
            >
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            <TableCell align='left' style={{ minWidth: 80 }}>Ejercicio</TableCell>
                            <TableCell align='left' style={{ minWidth: 80 }}>Tipo de Ejercicio</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody id='tbEjercicios'>
                        {props.ejercicios.map((row) => (
                            <TableEjerciciosRow key={row.idEjercicio}
                                {...row}
                                handleRowClick={handleRowClick}
                            />
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Grid container>
                <Grid item xs={8}>
                    <TablePagination
                        id='paginacionEjercicios'
                        rowsPerPageOptions={isMediumDevice ? [] : [10, 25, 100]}
                        component="div"
                        count={props.ejerciciosTotal}
                        rowsPerPage={props.rowsPerPage}
                        page={props.page}
                        onPageChange={props.handleChangePage}
                        onRowsPerPageChange={props.handleChangeRowsPerPage}
                        backIconButtonProps={{ id: 'backPageButtonEjercicios' }}
                        nextIconButtonProps={{ id: 'nextPageButtonEjercicios' }}
                        SelectProps={{ id: 'selectRowsPropsEjercicios' }}
                    />
                </Grid>
            </Grid>
        </Paper>
    );
}


