import React from 'react'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { Button, Grid, Paper, Typography } from '@mui/material'
import { Container } from '@mui/system'
import { AxiosError } from 'axios'

import Modal from '../reusable/GenericModal'

import Search from './Search'
import TableEjercicios from './TableEjercicios'
import ButtonAddEjercicioMobile from './ButtonAddEjercicioMobile'

import ejerciciosService from '../../services/ejercicios.service'

function EjerciciosPage() {
    const Navigate = useNavigate()

    const [ejercicios, setEjercicios] = useState([{}]);
    
    //Estados de LoginModal -> Para levantar estado
    const [modalMsj, setModalMsj] = useState("");
    const [openModal, setOpenModal] = useState(false);
    const handleCloseModal = () => { setOpenModal(false) }

    const [isLoading, setIsLoading] = useState(true)


    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true)
            const res = await ejerciciosService.getEjercicios()
            setIsLoading(false)
            if (res instanceof AxiosError) {
                setModalMsj(res.message)
                setOpenModal('true')
                console.log(res)
            } else {
                setEjercicios(res)
            }
        }
        fetchData()
        console.log(ejercicios)
    }, [])

    return (
        <Container
            sx={{
                display: 'flex',
                justifyContent: 'center',
            }}>
            <Paper
                sx={{
                    width: { xs: '90vw', lg: '70vw' },
                    // height: { xs: '140vh', sm: '90vh', md: '80vh', lg: '77vh', xl: '80vh' },
                    p: '1vw',
                    mt: '2vh',


                }}
            >
                <Grid container>
                    <Grid item sx={{ display: 'flex' }} xs='10' >
                        <Typography sx={{ fontSize: { xs: 24, md: 30, lg: 36, xl: 40 } }}>Ejercicios</Typography>
                    </Grid>
                    <Grid item sx={{ display: { xs: 'none', md: 'flex' } }} xs='2' >
                        <Button variant='contained' size='large' fullWidth
                            onClick={() => { Navigate('./new') }}
                        >Crear</Button>
                    </Grid>
                    <Grid item sx={{ display: 'flex' }} xs='12'>
                        <Search /></Grid>
                    <Grid item sx={{ display: 'flex' }} xs='12'>
                        <TableEjercicios isLoading={isLoading} ejercicios={ejercicios} />
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