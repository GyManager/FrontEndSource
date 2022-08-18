import * as React from 'react';
import { useContext } from 'react';
import { EjercicioContext } from '../../context/EjercicioContext'

import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';

export default function DeletableChips() {
    const {equipamento, setEquipamento} = useContext(EjercicioContext)
    console.log('equipamento')
    console.log(equipamento)
  const handleDelete = () => {
    console.info('You clicked the delete icon.');
  };

  return (
    <Stack direction="row" spacing={1}>
{equipamento.map(unEquipo=>{
    return(
      <Chip label={unEquipo.nombre} onDelete={handleDelete} />
    )})}
    </Stack>
  );
}
