import React, { useContext } from 'react'

import { Box, Button } from '@mui/material'
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
    const handleSaveClick = (e) => {
        e.preventDefault();
        setEditable(false);
        formik.handleSubmit()
        
    }

    const handleEditClick = (e) => {
        setEditable(true)
    }
    
    const handleDeleteClick = (e) => {
        // setEditable(true)
    }
    
    const handleCancelClick = (e) => {
        // setEditable(true)
    }

    return (
        <div>
            {editable ?
                <Box sx={{display: 'in-line'}}>
                    <Button {...ButtonStyle} type='submit' onClick={handleSaveClick}> <Save/></Button>
                    <Button {...ButtonStyle} onClick={handleCancelClick}><Cancel/></Button>
                </Box>
                :
                <>
                    <Button {...ButtonStyle} onClick={handleEditClick}><Edit/></Button>
                    <Button {...ButtonStyle} onClick={handleDeleteClick}><Delete /></Button>
                </>

            }
        </div >

    )

}







export default ButtonsUnEjercicioDesktop