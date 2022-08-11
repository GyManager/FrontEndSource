import React from 'react'
import { Link } from 'react-router-dom'

import { Fab } from '@mui/material/'
import AddIcon from '@mui/icons-material/Add'

function ButtonAddEjercicioMobile() {
    return (
        <div>
            <Link to='/ejercicios/new'>
                <Fab color='primary' aria-label='add' >
                    <AddIcon />
                </Fab>
            </Link>
        </div>
    )
}

export default ButtonAddEjercicioMobile