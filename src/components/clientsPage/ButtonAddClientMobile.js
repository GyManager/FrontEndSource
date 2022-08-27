import React from 'react'
import { Link } from 'react-router-dom'

import { Fab } from '@mui/material/'
import AddIcon from '@mui/icons-material/Add'

function ButtonAddClientMobile() {
    return (
        <div>
            <Link to='/clientes/new'>
                <Fab color='secondary' aria-label='add' >
                    <AddIcon />
                </Fab>
            </Link>
        </div>
    )
}

export default ButtonAddClientMobile