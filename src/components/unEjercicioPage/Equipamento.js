import * as React from 'react';
import { useContext } from 'react';
import { EjercicioContext } from '../../context/EjercicioContext'

import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import { GenericComboBox } from '../reusable';
import { Grid } from '@mui/material';

export default function DeletableChips() {
  const { equipamento, equipamentos, setEquipamento, formik, editable  } = useContext(EjercicioContext)
  console.log('equipamento')
  console.log(equipamento)
  console.log(equipamentos)

const nombreEquipamentos = equipamentos.map(equip=>{
  return (equip.nombre)
})

console.log(nombreEquipamentos)
  const handleDelete = () => {
    console.info('You clicked the delete icon.');
  };

  const editableDisplay =
  {
    display: editable ? '' : 'none'
  }
  return (
    <>
      <Grid container direction='row'>
        <Grid item xs={5} {...editableDisplay}>
          <GenericComboBox
            display='none'
            label="Seleccion de equipamento"
            id="equipamentoSeleccion"
            value={'un equipo'}
            handleChange={formik.handleChange}
            editable={editable}
            valueForNone=""
            labelForNone="Seleccionar sexo"
            // values={["Masculino", "Femenino", "No especifica"]}
            values={nombreEquipamentos}
            minWidth={250}
          />
        </Grid>
        <Grid item xs={5}>
          <Stack direction="row" spacing={1}>
            {equipamento.map(unEquipo => {
              return (
                <Chip label={unEquipo.nombre} onDelete={handleDelete} />
              )
            })}
          </Stack>
        </Grid>
      </Grid>
    </>
  );
}
