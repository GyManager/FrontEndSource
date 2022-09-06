import React from 'react'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { Button, Grid, Paper, Typography } from '@mui/material'
import { Add } from '@mui/icons-material';
import { Container } from '@mui/system'
import { AxiosError } from 'axios'

import Modal from '../reusable/GenericModal'

import Search from './Search'
import TableEjercicios from './TableEjercicios'
import ButtonAddEjercicioMobile from './ButtonAddEjercicioMobile'

import ejerciciosService from '../../services/ejercicios.service'

function EjerciciosPage() {
    const Navigate = useNavigate()

    const [ejercicios, setEjercicios] = useState(() => []);
    const [ejerciciosTotal, setEjerciciosTotal] = useState(() => 0)

    //Estados de LoginModal -> Para levantar estado
    const [modalMsj, setModalMsj] = useState("");
    const [openModal, setOpenModal] = useState(false);
    const handleCloseModal = () => { setOpenModal(false) }

    const [isLoading, setIsLoading] = useState(true)
    //Estados de TableEjercicios
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const [valueToSearch, setValueToSearch] = useState('');

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(event.target.value)
        setPage(0)
    }

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true)
            const res = await ejerciciosService.getEjercicios(valueToSearch, rowsPerPage, page)
            setIsLoading(false)
            if (res instanceof AxiosError) {
                setModalMsj(res?.message)
                setOpenModal(true)
                console.log(res)
            } else {
                setEjercicios(res.content)
                setEjerciciosTotal(res.totalElements)
            }
        }
        fetchData()
        console.log(ejercicios)
    }, [valueToSearch, rowsPerPage, page])

    return (
        <Container
            sx={{
                display: 'flex',
                justifyContent: 'center',
            }}>
            <Paper
                sx={{
                    width: { xs: '90vw', lg: '70vw' },
                    p: '1vw',
                    mt: '2vh',
                }}
            >
                <Grid container>
                    <Grid item sx={{ display: 'flex' }} xs={10} md={9}>
                        <Typography sx={{ fontSize: { xs: 24, md: 30, lg: 36, xl: 40 } }}>Ejercicios</Typography>
                    </Grid>
                    <Grid item sx={{ display: { xs: 'none', md: 'flex' } }} xs={2} md={3} >
                        <div>
                            <Button
                                variant='contained'
                                size='medium'
                                startIcon={<Add />}
                                fullWidth
                                onClick={() => { Navigate('./new') }}
                                color="primary"
                            >Crear ejercicio</Button>
                        </div>
                    </Grid>
                    <Grid item sx={{ display: 'flex' }} xs={12}>
                        <Search
                            setValueToSearch={setValueToSearch} />
                    </Grid>
                    <Grid item sx={{ display: 'flex' }} xs={12}>

                        <TableEjercicios
                            isLoading={isLoading}
                            ejercicios={ejercicios}
                            ejerciciosTotal={ejerciciosTotal}
                            page={page}
                            handleChangePage={handleChangePage}
                            rowsPerPage={rowsPerPage}
                            handleChangeRowsPerPage={handleChangeRowsPerPage}
                        />

                    </Grid>
                    <Grid item xs={12}
                        sx={{
                            display: { xs: 'block', md: 'none' },
                            position: 'fixed',
                            right: '4vw',
                            bottom: '4vh'
                        }} >
                        <ButtonAddEjercicioMobile />
                    </Grid>
                </Grid>
            </Paper>
            <Modal
                show={openModal}
                hide={handleCloseModal}
                serverMsj={modalMsj} />
        </Container>
    )
}

export default EjerciciosPage