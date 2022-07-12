import React from 'react'
import { Button } from '@mui/material'
import AddIcon from '@mui/icons-material/Add';

export default function ButtonAddClientDesktop() {
  return (
    <div>
      <Button
        variant='contained'
        startIcon={<AddIcon />}
        size='large'
      >Crear Cliente
      </Button>
    </div>
  )
}

