import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@mui/material'
import AddIcon from '@mui/icons-material/Add';
// import { useMediaQuery } from '@mui/material';

export default function ButtonAddClientDesktop(props) {
  // const isMediumDevice = useMediaQuery('(max-width:900px');

  return (
      <Link to='/clientes/new'>
      <Button
        variant='contained'
        startIcon={<AddIcon />}
        size='medium'
        color="secondary"
      >Crear Cliente
      </Button>
    </Link>
  )
}

