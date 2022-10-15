import React, { useContext } from 'react'

import { Button, Grid } from '@mui/material'
import { Edit, Delete, Save, Cancel } from '@mui/icons-material/';

import { EjercicioContext } from "../../context/EjercicioContext";
import { useNavigate } from 'react-router-dom';

function ButtonsUnEjercicioDesktop(props) {
    const navigate = useNavigate()

    const {
        handleDelete, editable, setEditable,
    } = useContext(EjercicioContext)

    const ButtonStyle = {
        sx: { mx: 1, justifyContent: 'space-around' },
        variant: 'contained',
        size: 'medium',
      

    }

    const handleEditClick = (e) => {
        e.preventDefault();
        setEditable(true)
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
                        <div><Button {...ButtonStyle} id='ButtonSaveTest' type='submit' color='primary'><Save />Guardar</Button></div>
                        <div><Button {...ButtonStyle} id='ButtonCancelTest' color='secondary' onClick={handleCancelClick}><Cancel />Cancelar</Button></div>
                    </>

                    :
                    <>
                        <div><Button {...ButtonStyle} id='ButtonEditTest' color='primary' onClick={handleEditClick}><Edit />Editar</Button></div>
                        <div><Button {...ButtonStyle} id='ButtonDeleteTest' color='secondary' onClick={props.openAlertDialog}><Delete />Eliminar</Button></div>
                    </>
                }
            </Grid>
        </>

    )

}







export default ButtonsUnEjercicioDesktop