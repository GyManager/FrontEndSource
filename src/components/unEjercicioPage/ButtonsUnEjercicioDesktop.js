import React, { useContext } from 'react'

import { Box, Button, Grid } from '@mui/material'
import { Edit, Delete, Save, Cancel } from '@mui/icons-material/';

import { EjercicioContext } from "../../context/EjercicioContext";
import { useNavigate } from 'react-router-dom';

function ButtonsUnEjercicioDesktop(props) {
    const navigate = useNavigate()

    const {
        idEjercicio, formik, handleSubmit, editable, setEditable,
    } = useContext(EjercicioContext)

    const ButtonStyle = {
        sx: { mx: 1, justifyContent: 'space-around' },
        variant: 'contained',
        size: 'large',
        fullWidth: true,

    }

    const handleCancel = (e) => {
        e.preventDefault();
        setEditable(false);
        // navigate('/ejercicios')
    }

    const handleEditClick = (e) => {
        e.preventDefault();
        setEditable(true)
    }

    const handleDeleteClick = (e) => {
        // setEditable(true)
    }

    const handleCancelClick = (e) => {
        setEditable(false)
    }

    return (
        <>
            <Grid item xs={6} sx={{ display: { xs: 'none', md: 'flex' } }}  >

                {editable ?
                    <>
                        <Button {...ButtonStyle} type='submit'><Save/>Guardar</Button>
                        <Button {...ButtonStyle} onClick={handleCancelClick}><Cancel />Cancelar</Button>
                    </>

                    :
                    <>
                        <Button {...ButtonStyle} onClick={handleEditClick}><Edit />Editar</Button>
                        <Button {...ButtonStyle} onClick={handleDeleteClick}><Delete />Eliminar</Button>
                    </>
                }
            </Grid>
        </>

    )

}







export default ButtonsUnEjercicioDesktop