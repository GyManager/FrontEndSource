import * as React from 'react';
import { useContext } from 'react';
import { EjercicioContext } from '../../context/EjercicioContext'

import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import { MultipleSelectChip } from '../reusable';
import { Grid, Typography } from '@mui/material';

export default function SeccionEquipamento() {
  const { formik, editable } = useContext(EjercicioContext)
  const equipamentoDeEjercicio = formik.values.equipamentoDeEjercicio

  const handleDelete = () => {
    console.info('You clicked the delete icon.');
  };

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
