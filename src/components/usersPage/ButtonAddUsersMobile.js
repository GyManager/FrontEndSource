import React from 'react'
import { Link } from 'react-router-dom'

import { Fab } from '@mui/material/'
import AddIcon from '@mui/icons-material/Add'

function ButtonAddUsersMobile() {
    return (
        <div>
            <Link to='/usuarios/new'>
                <Fab color='primary' aria-label='add' >
                    <AddIcon />
                </Fab>
            </Link>
        </div>
    )
}

export default ButtonAddUsersMobile