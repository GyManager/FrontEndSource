import * as React from 'react';
import { useState, useContext, useEffect } from 'react';
import { EjercicioContext } from '../../context/EjercicioContext'

import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import { GenericComboBox, MultipleSelectChip } from '../reusable';
import { Grid, Typography } from '@mui/material';

export default function SeccionEquipamento() {
  const { equipamentoDeEjercicio, setEquipamentoDeEjercicio,
    equipamentos, formik, editable } = useContext(EjercicioContext)
  // console.log('equipamentos')
  // console.log(equipamentos)

/*
  const nombreEquipamentos = equipamentos.map(equip => {
    return (equip.nombre)
  })

  const nombreEquipamentoDeEjercicio = equipamentoDeEjercicio.map(equip => {
    return (equip.nombre)
  })

*/
// console.log('equipamentoDeEjercicio')
// console.log(equipamentoDeEjercicio)

  useEffect(() => {
    // const estaEnLaSeleccion = (unEquipamento) => {
    //   if (equipamentoDeEjercicio.includes(unEquipamento)) {
    //     return unEquipamento
    //   }
    // }

    // const actualizarEquipamentoDeEjercicio = equipamentos.filter(estaEnLaSeleccion)

    // console.log('actualizarEquipamentoDeEjercicio')
    // console.log(actualizarEquipamentoDeEjercicio)
    // setEquipamentoDeEjercicio(actualizarEquipamentoDeEjercicio)
  }, [])


  // console.log('equipamento')
  // console.log(equipamentos)
  // console.log(equipamentoDeEjercicio)


  const handleDelete = () => {
    console.info('You clicked the delete icon.');
  };

  const editableDisplay = editable ? '' : { inputProps: { readOnly: true } }
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
          {editable
            ?
            <MultipleSelectChip
              // selectedValues={equipamentoDeEjercicio}
              // setSelectedValues={setEquipamentoDeEjercicio}
              // allValues={equipamentos}
            />
            :
            <Stack direction="row" spacing={1}>
              {equipamentoDeEjercicio.map(unEquipo => {
                return (
                  <Chip label={unEquipo} onDelete={handleDelete} />
                )
              })}
            </Stack>}
        </Grid>
      </Grid>
    </>
  );
}
