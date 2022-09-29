import * as React from 'react';
import { useState } from 'react';

import {
  Paper, InputBase, IconButton,
} from '@mui/material';

import SearchIcon from '@mui/icons-material/Search';

export default function CustomizedInputBase(props) {
  const [search, setSearch] = useState('');

  const handleChange = (e) => {
    setSearch(e.target.value)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    props.setValueToSearch(search)
  }

  return (
    <Paper
      component="form"
      onSubmit={handleSubmit}
      sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400, mb: '1vh' }}
    >
      <InputBase
      id='InputSearchTest'
        sx={{ ml: 1, flex: 1 }}
        placeholder="Ingrese su busqueda"
        inputProps={{ 'aria-label': 'Ingrese su busqueda' }}
        autoFocus
        onChange={handleChange}
      />
      <IconButton id='ButtonSearchTest' type="submit" sx={{ p: '10px' }} aria-label="Search">
        <SearchIcon />
      </IconButton>
    </Paper>
  );
}
