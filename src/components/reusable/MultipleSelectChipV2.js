import * as React from 'react';
import { useState, useEffect } from 'react';
import { useTheme } from '@mui/material/styles';

import {
  Box, OutlinedInput, InputLabel, MenuItem, FormControl, Select, Chip
} from '@mui/material';
import zIndex from '@mui/material/styles/zIndex';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(unaOpcion, opcionesSeleccionadas, theme) {
  return {
    fontWeight:
      opcionesSeleccionadas.indexOf(unaOpcion) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export default function MultipleSelectChip(props) {
  const opcionesTodas = props.opcionesTodas
  const [opcionesSeleccionadas, setOpcionesSeleccionadas] = useState([...props.opcionesSeleccionadas]);
  const theme = useTheme();

  useEffect(() => {
    props.formik.setFieldValue('roles', opcionesSeleccionadas || '', false)
  }, [opcionesSeleccionadas])

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;

    setOpcionesSeleccionadas(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  return (
    <div>
      <FormControl sx={{ m: 1, width: '100%' }}>
        <InputLabel id="demo-multiple-chip-label">{props.label}</InputLabel>
        <Select
          labelId="demo-multiple-chip-label"
          id="demo-multiple-chip"
          multiple
          value={opcionesSeleccionadas}
          onChange={handleChange}
          input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
          renderValue={(selected) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {selected.map((value) => (
                <Chip 
                key={value}
                  label={value}
                   />
              ))}
            </Box>
          )}
          MenuProps={MenuProps}
        >
          {opcionesTodas.map((unaOpcion) => (
            <MenuItem
              key={unaOpcion}
              value={unaOpcion}
              style={getStyles(unaOpcion, opcionesSeleccionadas, theme)}
            >
              {unaOpcion}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}


// En el padre
// Se necesita el estado de las opciones que ya estan seleccionadas
// [opcionesSeleccionadas, setOpcionesSeleccionadas] = useState([])
// Se necesita consultar a la base todas las opciones disponibles

// <MultipleSelectChipV2
// Las siguientes son los tipos de las props que debe recibir
//               label:"Titulo"
//               opcionesSeleccionadas:[""] // normalmente viene de un getOptionById
//               formik:{objetoFormik} funcion set del estado // Pasar el elemento formik
//               opcionesTodas: [""]  //normalmente viene de un getallOptions
//             />

/*
//Ejemplo:
<MultipleSelectChipV2
  label="Seleccione el permisos"
  opcionesSeleccionadas={props.formikRoles}
  formik={props.formik}
  opcionesTodas={todosLosRoles}
/>
*/
