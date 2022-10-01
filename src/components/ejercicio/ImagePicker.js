import React, { useState, useContext, useEffect } from 'react'

import { EjercicioContext } from '../../context/EjercicioContext';

import { Button, IconButton, Typography } from '@mui/material';
import { AddAPhoto, HighlightOff } from '@mui/icons-material/';

import { useFilePicker } from 'use-file-picker';
import ModalCardPaso from './ModalCardPaso'

import { Box } from '@mui/system';
import shadows from '@mui/material/styles/shadows';

export default function ImagePicker(props) {

    const { editable, formik } = useContext(EjercicioContext)
    const [openModalCardPaso, setOpenModalCardPaso] = useState(false);
    const handleOpenModalCardPaso = () => setOpenModalCardPaso(true);
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


    return (
        <div>
            {

                (editable && (!formik.values.pasos[props.index].imagen)) &&
                <Button
                    id={'ButtonAddPhotoTest' + props.index}
                    onClick={handleChargeFile}
                    variant='contained'
                    size='small'
                ><AddAPhoto /> </Button>
            }
            {
                (editable && formik.values.pasos[props.index].imagen) &&
                <>
                    <Box sx={{ position: 'relative', maxHeight:'30vh' }}>
                        <Button
                        size="small"
                        id={'ButtonShowPhotoTest'+props.index}>
                            <img
                                sx={{
                                    position: 'absolute',
                                    maxHeigth: '50px'
                                    }}
                                alt={'imagen'}
                                src={formik.values.pasos[props.index].imagen}
                                width='95%'
                                height='100'
                                onClick={handleOpenModalCardPaso}
                            />
                            <IconButton aria-label="delete" size="small" color='error'
                                id={'ButtonDeletePhotoTest'+props.index}
                                sx={{
                                    position: 'absolute',
                                    top: '0%',
                                    right: '0',
                                    zIndex: '0',
                                    backgroundColor: 'white'
                                }}
                                onClick={handleDeleteImage}>
                                <HighlightOff fontSize="small" />
                            </IconButton>
                        </Button>
                    </Box>
                </>
            }
            {
                (!editable && formik.values.pasos[props.index].imagen) &&
                <>

                    <Button key={props.index}>
                        <img
                        id={'ButtonShowPhoto'+props.index}
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
        </div >
    );
}