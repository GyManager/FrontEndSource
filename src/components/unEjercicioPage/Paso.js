// Librerias
import React from 'react'
import { useContext } from 'react'

// Datos
import { EjercicioContext } from '../../context/EjercicioContext'

// Vista
import { Button, Divider, Grid, TextField, Typography } from '@mui/material'
import { AddAPhoto, ArrowUpward, ArrowDownward, Delete } from '@mui/icons-material/';

function Paso(props) {
    const { editable, formik } = useContext(EjercicioContext)

    const TextFieldStyle = {
        disabled: !editable,
        inputProps: { readOnly: Boolean(!editable) },
        variant: "standard",
        onChange: formik.handleChange
    }

    const ButtonStyle = {
        size: "small",
        sx: {
            p: 0,
            m: 0
        }
    }

    const ImgButtonStyle = {
        size: "small",
        variant: 'contained',
        fullWidth: true
    }
    const editableDisplay =
    {
        sx:{ display: editable? '': 'none'}
    }



    return (
        <>
            <Grid container alignItems='center'>
                <Grid item xs={1} {...editableDisplay}>
                    <Grid container justifyContent='center'>
                        <Button {...ButtonStyle} onClick={() => props.handleSubirPaso(props.nroPaso)} ><ArrowUpward fontSize='small'/></Button>
                        <Typography {...ButtonStyle}
                            sx={{ fontSize: { xs: 10, md: 12, lg: 14, xl: 18 }, p: 1 }}

                        >{props.nroPaso}</Typography>
                        <Button {...ButtonStyle} onClick={() => props.handleBajarPaso(props.nroPaso)}><ArrowDownward fontSize='small' /></Button>
                    </Grid>
                </Grid>
                <Grid item xs={7} md={8} sx={{ mr: 5 }}>
                    <Grid container justifyContent='center' >

                        <TextField fullWidth
                            {...TextFieldStyle}
                            label="Descripcion"
                            id={props.id}
                            name={`pasos[${props.index}].contenido`}
                            value={props.descripcion}
                            error={formik.touched.descripcion && Boolean(formik.errors.descripcion)}
                            helperText={formik.touched.descripcion && formik.errors.descripcion}
                            multiline={true}
                        />
                    </Grid>
                </Grid>
                <Grid item xs={1} sx={{ mr: 2 }}{...editableDisplay}>
                    <Typography sx={{ fontSize: { xs: 8, md: 10, lg: 12, xl: 16 }, p: 1 }}>Imagen</Typography>
                    <Button  {...ImgButtonStyle} ><AddAPhoto fontSize='small' /></Button>
                </Grid>
                <Grid item xs={1} {...editableDisplay}>
                    <Grid container direction='column' justifyContent='flex-start'>
                        <Button  {...ImgButtonStyle} onClick={()=>props.handleDelete(props.nroPaso)} ><Delete fontSize='small'/></Button>
                    </Grid>
                </Grid>
            </Grid>
            <Divider />

        </>
    )
}

export default Paso