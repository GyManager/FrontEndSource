// Imports Librerias
import React, { useContext } from 'react'
import { useState, useEffect } from 'react'
import { AxiosError } from 'axios'

// Imports Data
import { UsersContext } from "../../context/UsersContext";
import usersService from '../../services/users.service'

// Imports Vista
import { useMediaQuery } from '@mui/material';
import { Grid, Box, Paper, Typography } from '@mui/material/'
import { Backdrop, GenericModal, Snackbar } from '../reusable/'

import ButtonAddClientMobile from './ButtonAddClientMobile'
import ButtonAddUsersDesktop from './ButtonAddUsersDesktop'
import SearchBar from './SearchBar'
import TableUsers from './TableUsers'

export default function Users() {

    const isMediumDevice = useMediaQuery('(max-width:900px');

    //Estados de LoginModal
    const [modalMsj, setModalMsj] = useState("");
    const [openModal, setOpenModal] = useState(false);
    const handleCloseModal = () => { setOpenModal(false) }

    //Estados de Backdrop
    const [openBackdrop, setOpenBackdrop] = useState(false);
    const handleCloseBackdrop = () => {
        setOpenBackdrop(false);
    };

    //Estados del Snackbar
    const { dataSnackbar, setDataSnackbar } = useContext(UsersContext)
    const [openSnackbar, setOpenSnackbar] = useState();

    // Importo el value data que se define en el contextProvider, podria ser
    // otro estado o metodo

    const [usuarios, setUsuarios] = useState([{}]);
    const [usuariosTotal, setUsuariosTotal] = useState(() => 0)

    const [page, setPage] = useState(() => 0);
    const [rowsPerPage, setRowsPerPage] = useState(() => isMediumDevice ? 10 : 15);
    const [valueToSearch, setValueToSearch] = useState('');

    const searchUsuarios = (newValueToSearch) => {
        console.log('searchUsuarios')
        setValueToSearch(newValueToSearch)
        setPage(0)
    }

    const handleChangePage = (event, newPage) => {
        setPage(newPage)
    }

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(event.target.value)
        setPage(0)
    }


    useEffect(() => {
        const fetchData = async () => {
            setOpenBackdrop(true)
            const respuesta = await usersService.getUsers(valueToSearch, rowsPerPage, page);
            setOpenBackdrop(false)
            if (respuesta instanceof AxiosError) {
                setModalMsj(respuesta?.message)
                setOpenModal(true)
            } else {
                setUsuarios(respuesta.content)
                setUsuariosTotal(respuesta.totalElements)
            }
        }
        fetchData();
        setOpenSnackbar(dataSnackbar !== '' ? true : false)
        setTimeout(() => setDataSnackbar(''), 6100)

    }, [valueToSearch, rowsPerPage, page, dataSnackbar, setDataSnackbar])

    return (

        <Box sx={{
            display: 'flex', flexwrap: 'wrap',
        }}
            justifyContent='center'>
            <Paper
                elevation={12}
                sx={{
                    height: {xs:'87vh', md: '75vh' },
                }}
            >
                <Grid container width='90vw'
                    sx={{
                        mt: 1, mb: 1, mx: 2,
                    }}
                    alignItems='center'  >
                    <Grid container item justifyContent='space-between' alignItems='center'>
                        <Grid item xs={12} md={3}

                            sx={{
                                display:'flex',
                                height: '7vh',
                                alignItems:'center'
                            }}
                        >
                            <Typography sx={{ fontSize: { xs: 24, md: 30, lg: 36, xl: 40 } }} >
                                Usuarios
                            </Typography>
                        </Grid>
                        <Grid item xs={12} md={3}
                            sx={{
                                display: { xs: 'none', sm: 'none', md: 'flex' }
                            }}
                            justifyContent='flex-end'>
                            <ButtonAddUsersDesktop />
                        </Grid>
                    </Grid>
                    <Grid container justifyContent='start' alignItems='center'>
                        <Grid item xs={10.5} md={5}
                            sx={{
                                height: '7vh',
                                mb: 2
                            }}
                        >
                            <SearchBar
                                searchUsuarios={searchUsuarios}
                                
                            />
                        </Grid>
                    </Grid>
                    <Grid container justifyContent='start'>
                        <Grid item xs={12}
                            sx={{
                                height: '100%',
                            }}
                        >
                            <TableUsers
                                usuarios={usuarios}
                                usuariosTotal={usuariosTotal}
                                page={page}
                                handleChangePage={handleChangePage}
                                rowsPerPage={rowsPerPage}
                                handleChangeRowsPerPage={handleChangeRowsPerPage}
                            />
                        </Grid>
                    </Grid>
                    {/* Boton solo para vista mobile */}
                    <Grid container>
                        <Grid item xs={12} md={12}
                            sx={{
                                display: { xs: 'block', md: 'none' },
                                position: 'fixed',
                                right: '4vw',
                                bottom: '4vh'
                            }} >
                            <ButtonAddClientMobile />
                        </Grid>
                    </Grid>
                </Grid>
                <GenericModal
                    show={openModal}
                    hide={handleCloseModal}
                    serverMsj={modalMsj} />
                <Backdrop
                    show={openBackdrop}
                    hide={handleCloseBackdrop} />
                <Snackbar
                    severity='success'
                    message={dataSnackbar}
                    open={openSnackbar}
                    setOpen={setOpenSnackbar}>
                </Snackbar>
            </Paper>
        </Box>
    )
}

