import { Grid, Paper, TextField } from "@mui/material";
import React, { useContext } from "react";
import { GenericComboBox } from "../reusable";
import { EjercicioContext } from "../../context/EjercicioContext";

function SeccionNombreYTipo(props) {
  const { formik, editable, allTipoEjercicios } = useContext(EjercicioContext);
  return (
    <Paper {...props.paperStyle}>
      <Grid container>
        <Grid item xs={12} md={5}>
          <TextField
            fullWidth
            {...props.TextFieldStyle}
            label="Nombre"
            id="nombre"
            value={formik.values.nombre}
            error={formik.touched.nombre && Boolean(formik.errors.nombre)}
            helperText={formik.touched.nombre && formik.errors.nombre}
            autoFocus
            sx={{ mb: 2 }}
          />
        </Grid>
        <Grid item xs={12} md={7} sx={{ textAlign: "center" }}>
          <GenericComboBox
            label="Tipo de ejercicio"
            id="tipoDeEjercicio"
            value={formik.values.tipoDeEjercicio}
            handleChange={formik.handleChange}
            editable={editable}
            valueForNone=""
            labelForNone="Seleccionar tipo de ejercicio"
            values={allTipoEjercicios}
            // values={['Opcion1', 'opcion2', 'opcion3']}
            minWidth={250}
            errorProp={
              formik.touched.tipoDeEjercicio &&
              Boolean(formik.errors.tipoDeEjercicio)
            }
            helperTextProp={
              formik.touched.tipoDeEjercicio && formik.errors.tipoDeEjercicio
            }
          />
        </Grid>
      </Grid>
    </Paper>
  );
}

export default SeccionNombreYTipo;
