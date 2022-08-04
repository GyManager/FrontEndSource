// Imports Librerias
import React, { useContext } from 'react'
import { useState, useEffect } from 'react'
import { AxiosError } from 'axios'

// Imports Data
import { DataContext } from "../../context/DataContext";
import clientsService from '../../services/clients.service'

// Imports Vista
import { useMediaQuery } from '@mui/material';
import { Grid, Box, Paper, Typography } from '@mui/material/'
import { Backdrop, GenericModal, Snackbar } from '../reusable/'

import ButtonAddClientMobile from './ButtonAddClientMobile'
import ButtonAddClientDesktop from './ButtonAddClientDesktop'
import SearchBar from './SearchBar'
import TablesClient from './TablesClient'

export default function Clients() {

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
    const { dataSnackbar, setDataSnackbar } = useContext(DataContext)
    const [openSnackbar, setOpenSnackbar] = useState();

    // Importo el value data que se define en el contextProvider, podria ser
    // otro estado o metodo

    const [clientes, setClientes] = useState([{}]);
    const [clientesTotal, setClientesTotal] = useState(() => 0)

    const [page, setPage] = useState(() => 0);
    const [rowsPerPage, setRowsPerPage] = useState(() => isMediumDevice ? 10 : 15);
    const [valueToSearch, setValueToSearch] = useState('');

    const searchClientes = (newValueToSearch) => {
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
            const respuesta = await clientsService.getClients(valueToSearch, rowsPerPage, page);
            setOpenBackdrop(false)
            if (respuesta instanceof AxiosError) {
                setModalMsj(respuesta?.message)
                setOpenModal(true)
            } else {
                setClientes(respuesta.content)
                setClientesTotal(respuesta.totalElements)
            }
        }
        fetchData();
        setOpenSnackbar(dataSnackbar !== '' ? true : false)
        setTimeout(() => setDataSnackbar(''), 6100)

    }, [valueToSearch, rowsPerPage, page, dataSnackbar, setDataSnackbar])

    return (

        <Box sx={{
            display: 'flex', flexwrap: 'wrap',
            // backgroundColor: 'green'
        }}
            justifyContent='center'>
            <Paper
                elevation={12}
                // TODO  006
                sx={{
                    // backgroundColor: 'yellow',
                    height: '87vh',
                }}
            >
                <Grid container width='90vw'
                    sx={{
                        mt: 1, mb: 1, mx: 2,
                        //  backgroundColor: 'red' ,
                    }}
                    alignItems='center'  >
                    <Grid container item justifyContent='space-between' alignItems='center'>
                        <Grid item xs={12} md={3}

                            sx={{
                                display:'flex',
                                // backgroundColor: 'blue', 
                                height: '7vh',
                                // justifyContent:'center',
                                alignItems:'center'
                            }}
                        >
                            {/* TODO HACER UN COMPONENTE TIPOGRAPHY CON LOS TAMAÑOS DE LAS LETRAS PARA REDUCIR MANTENIMINETO Y MEJORAR CONSISTENCIA   */}
                            <Typography sx={{ fontSize: { xs: 24, md: 30, lg: 36, xl: 42 } }} >
                                Clientes
                            </Typography>
                        </Grid>
                        <Grid item xs={12} md={2}
                            sx={{
                                // backgroundColor: 'yellow',
                                display: { xs: 'none', sm: 'none', md: 'block' }
                            }}
                            justifyContent='end'>
                            <ButtonAddClientDesktop size={isMediumDevice ? "small" : "medium"} />
                        </Grid>
                    </Grid>
                    <Grid container justifyContent='start' alignItems='center'>
                        <Grid item xs={10.5} md={5}
                            sx={{
                                // backgroundColor: 'lightBlue',
                                height: '7vh',
                                mb: 2
                            }}
                        >
                            <SearchBar
                                searchClientes={searchClientes}
                            />
                        </Grid>
                    </Grid>
                    <Grid container justifyContent='start' sx={{ backgroundColor: 'green' }} >
                        <Grid item xs={12}
                            sx={{
                                backgroundColor: 'lightGreen',
                                // height: { xs: '77vh', md: '30vh', lg: '68vh' }
                                height: '100%',

                            }}
                        >
                            <TablesClient
                                clientes={clientes}
                                clientesTotal={clientesTotal}
                                page={page}
                                handleChangePage={handleChangePage}
                                rowsPerPage={rowsPerPage}
                                handleChangeRowsPerPage={handleChangeRowsPerPage}
                            />

                            {/* <StickyHeadTable /> */}


                        </Grid>
                    </Grid>
                    {/* Boton solo para vista mobile */}
                    <Grid container>
                        <Grid item xs={12} md={12}
                            sx={{
                                // backgroundColor: 'yellow',
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

