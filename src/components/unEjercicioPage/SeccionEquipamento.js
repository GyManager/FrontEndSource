import * as React from 'react';
import { useState, useContext } from 'react';
import { EjercicioContext } from '../../context/EjercicioContext'

import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import { GenericComboBox, MultipleSelectChip } from '../reusable';
import { Grid, Typography } from '@mui/material';

export default function SeccionEquipamento() {
  const { equipamento, equipamentos, setEquipamento, formik, editable } = useContext(EjercicioContext)


  const nombreEquipamentos = equipamentos.map(equip => {
    return (equip.nombre)
  })

  const nombreEquipamento = equipamento.map(equip => {
    return (equip.nombre)
  })

  console.log('equipamento')
  console.log(nombreEquipamentos)
  console.log(nombreEquipamento)


  const handleDelete = () => {
    console.info('You clicked the delete icon.');
  };

  const editableDisplay = editable? '': {inputProps:{ readOnly: true }}
  return (
    <>
    <Grid item xs={12} container>
      <Grid item xs={12}>
        <Typography component='span'
          sx={{ fontSize: { xs: 14, md: 16, lg: 20, xl: 22 } }}
        >Equipamento
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <MultipleSelectChip
          selectedValues={nombreEquipamento}
          allValues={nombreEquipamentos}
        />
      </Grid>
    </Grid>
    </>
  );
}
