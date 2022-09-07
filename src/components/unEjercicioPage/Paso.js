// Librerias
import React from 'react'
import { useContext } from 'react'

// Datos
import { EjercicioContext } from '../../context/EjercicioContext'

// Vista
import { Button, Divider, Grid, TextField, Typography } from '@mui/material'
import { ArrowUpward, ArrowDownward, Delete } from '@mui/icons-material/';
import ImagePicker from './ImagePicker'

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
        // sx: { display: editable ? '' : 'none' }
        sx: { visibility: editable ? '' : 'hidden' }
    }

    return (
        <>
            <Grid container 
            alignItems='center' justifyContent='space-around'
             sx={{ minHeight: '20vh' }}>
                <Grid item  xs={1} >
                    <ImagePicker
                        index={props.index}
                        imagen={props.imagen}
                    />
                </Grid>
                <Grid item xs={1} {...editableDisplay}  >
                    <Grid container direction="column" justifyContent='center'  alignItems='center'>
                        <Grid item>
                            <Button {...ButtonStyle} 
                                onClick={() => props.handleSubirPaso(props.nroPaso)}>
                                <ArrowUpward fontSize='small' />
                            </Button>
                        </Grid>
                        <Grid item>
                            <Typography 
                                sx={{ fontSize: { xs: 10, md: 12, lg: 14, xl: 18 }, p: 1 }}
                            >{props.nroPaso}</Typography>

                        </Grid>
                        <Grid item>
                            <Button {...ButtonStyle}
                                onClick={() => props.handleBajarPaso(props.nroPaso)}>
                                <ArrowDownward fontSize='small' />
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>

                <Grid item xs={8}>
                    <Grid container justifyContent='center' >
                        <TextField
                            fullWidth
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

                <Grid item xs={1} {...editableDisplay}>
                    <Grid container direction='column' justifyContent='flex-start'>
                        <Button
                            {...ImgButtonStyle}
                            variant='outlined'
                            size='medium'
                            color='error'
                            onClick={() => props.handleDelete(props.nroPaso)} >
                            <Delete fontSize='small' />
                        </Button>
                    </Grid>
                </Grid>

            </Grid>
            <Divider />
        </>
    )
}

export default Paso