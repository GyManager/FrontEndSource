import * as React from 'react';
import { useState, useContext, useEffect } from 'react';
import { useTheme } from '@mui/material/styles';

import { EjercicioContext } from '../../context/EjercicioContext';

import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';

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


function getStyles(unChip, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(unChip) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export default function MultipleSelectChip(props) {
  const { formik, equipamentos } = useContext(EjercicioContext)
  const equipamentoDeEjercicio = formik.values.equipamentoDeEjercicio

  const setEquipamentoDeEjercicio = (array) => {
    formik.setFieldValue('equipamentoDeEjercicio', array, false)
  }

  const chips = equipamentos
  const selectedChips = equipamentoDeEjercicio
  const theme = useTheme();
  const [personName, setPersonName] = useState([...selectedChips]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  useEffect(() => {
    setEquipamentoDeEjercicio(personName)
  }, [personName])

  return (
    <div>
      <FormControl sx={{ m: 1, width: '60vw' }}>
        <InputLabel id="demo-multiple-chip-label" htmlFor="demo-multiple-chip">
          Seleccione el equipamento
        </InputLabel>
        <Select
          labelId="demo-multiple-chip-label"
          id="demo-multiple-chip"
          multiple
          value={personName}
          onChange={handleChange}
          input={<OutlinedInput id="demo-multiple-chip" label="Seleccione el equipamento" />}
          renderValue={(selected) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {selected.map((value) => (
                <Chip key={value} label={value} />
              ))}
            </Box>
          )}
          MenuProps={MenuProps}
        >
          {chips.map((unChip) => (
            <MenuItem
              key={unChip}
              value={unChip}
              style={getStyles(unChip, personName, theme)}
            >
              {unChip}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}


// Levantar estado lo siguiente
// const [personName, setPersonName] = React.useState([]);
// Este es un array que contiene los valores ya seleccionado