import React, { useContext, useEffect } from 'react'

import { EjercicioContext } from '../../context/EjercicioContext';

import { Button, IconButton, Stack, Typography } from '@mui/material';
import { AddAPhoto, HighlightOff } from '@mui/icons-material/';

import { useFilePicker } from 'use-file-picker';

import { Box } from '@mui/system';

export default function ImagePicker(props) {

    const { editable, formik } = useContext(EjercicioContext)
    let [openFileSelector, { filesContent, loading, clear }] = useFilePicker({
        readAs: 'DataURL',
        accept: 'images*',
        multiple: false,
    });
    console.log(filesContent)
    // formik.setFieldValue('pasos[1].imagen', filesContent )
    // if (loading) {
    //     return <div>Loading...</div>;
    // } else {
    // }

    useEffect(() => {
        const string2 = { ...filesContent[0] }.content
        formik.setFieldValue(`pasos[${props.index}].imagen`, string2)
    }, [filesContent, loading])
    // }, [])

    const handleChargeFile = () => {
        openFileSelector()
        if (loading) {
            return <div>Loading...</div>;
        }
    }

    const handleDeleteImage = () => {
        clear()
        formik.setFieldValue(`pasos[${props.index}].imagen`, '')
    }

    const imagen = () => {
        <img
            sx={{
                position: 'absolute',
            }}
            alt={'imagen'}
            src={formik.values.pasos[props.index].imagen}
            width='80'
            height='80'
        />
    }
console.log(filesContent )
    return (
        <div>
            {
                
                (editable && (!formik.values.pasos[props.index].imagen)) &&
                <Button
                    onClick={handleChargeFile}
                    variant='contained'
                ><AddAPhoto /> </Button>
            }
            {
                (editable && formik.values.pasos[props.index].imagen) &&
                <>
                    <Box sx={{ position: 'relative' }}>
                        <img
                            sx={{
                                position: 'absolute',
                            }}
                            alt={'imagen'}
                            src={formik.values.pasos[props.index].imagen}
                            width='80'
                            height='80'
                        />
                        <IconButton aria-label="delete" size="small" color='primary'
                            sx={{
                                position: 'absolute',
                                top: '0%',
                                right: '0',
                                zIndex: '255',
                                backgroundColor: 'lightGrey'
                            }}
                            onClick={handleDeleteImage}>
                            <HighlightOff fontSize="small" />
                        </IconButton>
                    </Box>
                </>
            }
            {
                (!editable && formik.values.pasos[props.index].imagen) &&
                <>

                    <div key={props.index}>
                        <img
                            alt={'imagen'}
                            src={formik.values.pasos[props.index].imagen}
                            width='110'
                            height='110'
                        ></img>
                    </div>

                </>
            }
            {
                (!editable && !formik.values.pasos[props.index].imagen) &&
                <>
                    <Typography variant="body1"
                        color="initial"
                        textAlign='center'
                    >Sin imagen disponible
                    </Typography>
                </>
            }
        </div>
    );
}