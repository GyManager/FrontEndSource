import React, { useState, useContext, useEffect } from 'react'

import { EjercicioContext } from '../../context/EjercicioContext';

import { Button, IconButton, Typography } from '@mui/material';
import { AddAPhoto, HighlightOff } from '@mui/icons-material/';

import { useFilePicker } from 'use-file-picker';
import ModalCardPaso from './ModalCardPaso'

import { Box } from '@mui/system';

export default function ImagePicker(props) {

    const { editable, formik } = useContext(EjercicioContext)
    let [openFileSelector, { filesContent, loading, clear }] = useFilePicker({
        readAs: 'DataURL',
        accept: 'images*',
        multiple: false,
    });

    useEffect(() => {
        const string2 = { ...filesContent[0] }.content
        formik.setFieldValue(`pasos[${props.index}].imagen`, string2)
    }, [filesContent, loading])

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

    const [openModalCardPaso, setOpenModalCardPaso] = useState(false);
    const handleOpenModalCardPaso = () => setOpenModalCardPaso(true);

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
                            onClick={handleOpenModalCardPaso}
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

                    <Button key={props.index}>
                        <img
                            alt={'imagen'}
                            src={formik.values.pasos[props.index].imagen}
                            width='110'
                            height='110'
                            onClick={handleOpenModalCardPaso}
                        ></img>
                    </Button>

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
            <ModalCardPaso
                open={openModalCardPaso}
                setOpen={setOpenModalCardPaso}
                handleOpen={handleOpenModalCardPaso}
                paso={formik.values.pasos[props.index]}
            />
        </div>
    );
}