import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@mui/material'
import AddIcon from '@mui/icons-material/Add';

export default function ButtonAddClientDesktop(props) {
  return (
    <div>
      <Link to='/clientes/new'>
      <Button
        variant='contained'
        startIcon={<AddIcon />}
        size={props.size}
      >Crear Cliente
      </Button>
    </Link>
    </div >
  )
}

