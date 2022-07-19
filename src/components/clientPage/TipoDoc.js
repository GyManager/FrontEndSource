import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function TipoDoc(props) {

  
  return (
    <div>
      <FormControl sx={{ m: 1, minWidth: 200 }} >
        <InputLabel id="demo-simple-select-autowidth-label">Tipo de Documento</InputLabel>
        <Select
          labelId="demo-simple-select-autowidth-label"
          id="demo-simple-select-autowidth"
          value={props.tipoDoc}
          onChange={props.handleChange}
          autoWidth
          label="Tipo de documento"
          // readOnly={props.editable? false: true }
          disabled={props.editable? false: true }
        >
          <MenuItem value="">
            <em>Tipo de Documento</em>
          </MenuItem>
          <MenuItem value={1}>DNI</MenuItem>
          <MenuItem value={2}>Pasaporte</MenuItem>
          <MenuItem value={3}>Otro</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}
