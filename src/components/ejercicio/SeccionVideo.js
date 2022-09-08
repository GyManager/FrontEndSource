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

    const arraySplitedURL = formik.values.linkVideo.split(/[ =]+/)
    const ultimoElemento = arraySplitedURL.length - 1
    const routeNameURL = arraySplitedURL[ultimoElemento]
    const stringURLVideo = "https://www.youtube.com/embed/" + routeNameURL

    return (
        <Grid container>
            <Grid item xs={12}>
                <Typography sx={{ fontSize: { xs: 14, md: 16, lg: 20, xl: 22 } }}>Video</Typography>
                {editable ?
                    <Grid container>
                        <Grid item xs={12} md={6}>
                            <TextField fullWidth
                                {...TextFieldStyle}
                                label="Ingrese link del video de Youtube"
                                id="linkVideo"
                                name="linkVideo"
                                value={formik.values.linkVideo}
                                error={formik.touched.linkVideo && Boolean(formik.errors.linkVideo)}
                                helperText={formik.touched.linkVideo && formik.errors.linkVideo}
                            />
                        </Grid>
                    </Grid>
                    :
                    <div className='contenedor-iframe'>
                        <iframe title='Video' className="responsive-iframe" src={stringURLVideo}>
                        </iframe>
                    </div>
                }
            </Grid></Grid>
    )
}


export default Video