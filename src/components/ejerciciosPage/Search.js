import * as React from 'react';
import { useState } from 'react';

import {
  Paper, InputBase, IconButton,
} from '@mui/material';

import SearchIcon from '@mui/icons-material/Search';
import { AxiosError } from 'axios';

import ejerciciosService from '../../services/ejercicios.service';
import { boolean } from 'yup';

export default function CustomizedInputBase(props) {
  const [search, setSearch] = useState();

  const handleChange = (e) => {
    setSearch(e.target.value)
    console.log(search)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const res = await ejerciciosService.getEjercicios(search)
    if (res instanceof AxiosError) {
      console.log('error')
    }
    else {
      props.setEjercicios(res)
    }
    console.log(res)
  }

  return (
    <Paper
      component="form"
      onSubmit={handleSubmit}
      sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400, mb: '1vh' }}
    >
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Ingrese su busqueda"
        inputProps={{ 'aria-label': 'Ingrese su busqueda' }}
        autoFocus
        onChange={handleChange}
      />
      <IconButton type="submit" sx={{ p: '10px' }} aria-label="Search">
        <SearchIcon />
      </IconButton>
    </Paper>
  );
}
