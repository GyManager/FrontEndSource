import * as React from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';

export default function CustomizedInputBase() {
  return (
    <Paper
      component="form"
      sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400, mb: '1vh' }}
    >
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Ingrese su busqueda"
        inputProps={{ 'aria-label': 'Ingrese su busqueda' }}
      />
      <IconButton type="submit" sx={{ p: '10px' }} aria-label="Search">
        <SearchIcon />
      </IconButton>
    </Paper>
  );
}
