import React, { useEffect, useState } from "react";

import usersService from "../../services/users.service";

import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import { MultipleSelectChipV2 } from "../reusable";
import { Grid, Typography } from "@mui/material";

import React, { useEffect, useState } from 'react';

import usersService from '../../services/users.service'

import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import { MultipleSelectChipV2 } from '../reusable';
import { Grid, Typography } from '@mui/material';

export default function SeccionRoles(props) {
  const [todosLosRoles, setTodosLosRoles] = useState([])

  useEffect(() => {
    const getAllRoles = async () => {
      const todosLosRoles = await usersService.getAllRoles()
      setTodosLosRoles(await todosLosRoles)
    }
    getAllRoles()
  }, [])

  return (
    <>
      <Grid item xs={12} container>
        <Grid item xs={12}>
          <Typography component='span'
            sx={{ fontSize: { xs: 14, md: 16, lg: 20, xl: 22 } }}
          >Roles
          </Typography>
        </Grid>
        <Grid item xs={12}>
          {props.editable
            ?
            <MultipleSelectChipV2
              label="Seleccione el permisos"
              opcionesSeleccionadas={props.formikRoles}
              setOpcionesSeleccionadas={props.formikSetRoles}
              opcionesTodas={todosLosRoles}
            />
            :
            <Stack direction="row" spacing={1}>

              {props.formikRoles.map(unRol => {
                return (
                  <Chip label={unRol} />
                )
              })}
            </Stack>}
        </Grid>
      </Grid>
    </>
  );
}
