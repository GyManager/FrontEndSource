import React from 'react'
import { Button } from '@mui/material'
import AddIcon from '@mui/icons-material/Add';

export default function ButtonAddClientDesktop(props) {
  return (
    <div>
      <Button
        variant='contained'
        startIcon={<AddIcon />}
        size={props.size}
      >Crear Cliente
      </Button>
    </div>
  )
}

