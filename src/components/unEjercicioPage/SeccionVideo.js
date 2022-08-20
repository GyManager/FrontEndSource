import { Grid, TextField, Typography } from '@mui/material'
import React, { useContext } from 'react'
import { EjercicioContext } from '../../context/EjercicioContext'

function Video() {
    const { editable, formik } = useContext(EjercicioContext)

    const TextFieldStyle = {
        disabled: !editable,
        inputProps: { readOnly: Boolean(!editable) },
        variant: "standard",
        onChange: formik.handleChange
    }
    return (
        <Grid container>
        <Grid item xs={12}>
          <Typography sx={{ fontSize: { xs: 14, md: 16, lg: 20, xl: 22 } }}>Video</Typography>
        {editable ?
            <Grid container>
                <Grid Item xs={12} md={6}>
                    <TextField fullWidth
                        {...TextFieldStyle}
                        label="Ingrese link del video de Youtube"
                        id="idVideo"
                        value={formik.video}
                        error={formik.touched.video && Boolean(formik.errors.video)}
                        helperText={formik.touched.video && formik.errors.video}
                    />
            
                </Grid>
            </Grid>
            :
    <div className='contenedor-iframe'>
        <iframe title='Video' className="responsive-iframe" src="https://www.youtube.com/embed/Q4UtjgF1PO4">
        </iframe>
    </div>
        }
        </Grid></Grid>

    )
}


export default Video