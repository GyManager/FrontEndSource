import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@mui/material'
import AddIcon from '@mui/icons-material/Add';

export default function ButtonAddClientDesktop(props) {

  return (
      <Link to='/clientes/new'>
      <Button
        variant='contained'
        startIcon={<AddIcon />}
        size='medium'
      >Crear Cliente
      </Button>
    </Link>
  )
}

