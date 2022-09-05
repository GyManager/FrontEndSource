import React, { useContext } from 'react'

import { Box, Button, Grid } from '@mui/material'
import { Edit, Delete, Save, Cancel } from '@mui/icons-material/';

import { EjercicioContext } from "../../context/EjercicioContext";
import { useNavigate } from 'react-router-dom';

function ButtonsUnEjercicioDesktop(props) {
    const navigate = useNavigate()

    const {
        idEjercicio, formik, handleDelete, editable, setEditable,
    } = useContext(EjercicioContext)

    const ButtonStyle = {
        sx: { mx: 1, justifyContent: 'space-around' },
        variant: 'contained',
        size: 'large',
        fullWidth: true,

    }

    const handleEditClick = (e) => {
        e.preventDefault();
        setEditable(true)
    }

    const handleDeleteClick = (e) => {
        e.preventDefault();
        setEditable(false)
        
    }

    const handleCancelClick = (e) => {
        setEditable(false)
        navigate('/ejercicios')
    }

    return (
        <>
            <Grid item xs={4} sx={{ display: { xs: 'none', md: 'flex' } }}  >

                {editable ?
                    <>
                        <Button {...ButtonStyle} type='submit'><Save />Guardar</Button>
                        <Button {...ButtonStyle} onClick={handleCancelClick}><Cancel />Cancelar</Button>
                        {/* <Button {...ButtonStyle} onClick={()=>setEditable(false)}><Edit />Probando</Button> */}
                    </>

                    :
                    <>
                        <Button {...ButtonStyle} onClick={handleEditClick}><Edit />Editar</Button>
                        <Button {...ButtonStyle} onClick={handleDelete}><Delete />Eliminar</Button>
                        {/* <Button {...ButtonStyle} onClick={()=>setEditable(true)}><Edit />Probando</Button> */}
                    </>
                }
            </Grid>
        </>

    )

}







export default ButtonsUnEjercicioDesktop