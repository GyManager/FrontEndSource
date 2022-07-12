import React from 'react'
import { Fab } from '@mui/material/'
import AddIcon from '@mui/icons-material/Add'

function ButtonAddClientMobile() {
    return (
        <div>
            <Fab color='primary' aria-label='add' >
                <AddIcon />
            </Fab>
        </div>
    )
}

export default ButtonAddClientMobile