import React, { useContext } from 'react'

import { EjercicioContext } from '../../context/EjercicioContext';

import { Button, IconButton, Stack, Typography } from '@mui/material';
import { AddAPhoto, HighlightOff } from '@mui/icons-material/';

import { useFilePicker } from 'use-file-picker';

import ComplexButton from './ComplexButton'
import { Box } from '@mui/system';



export default function App() {
    const { editable } = useContext(EjercicioContext)
    let [openFileSelector, { filesContent, loading, clear }] = useFilePicker({
        readAs: 'DataURL',
        accept: 'image/*',
        multiple: false,
        // readFilesContent: false
    });
    console.log(filesContent)
    if (loading) {
        return <div>Loading...</div>;
    }
    // const hayImagenes = filesContent.length !== 0

    const handleDeleteImage = () => {
        clear()
    }



    return (
        <div>
            {
                (editable && filesContent.length === 0) &&
                <Button
                    onClick={() => openFileSelector()}
                    variant='contained'
                ><AddAPhoto /> </Button>
            }
            {
                (editable && filesContent.length !== 0) &&
                <>
                    {/* <div key={index} sx={{display:'block', width:'1%'}}> */}
                    {filesContent.map((file, index) => (
                        <Stack sx={{
                            width: '10%',
                            height: '20vh',
                            position: 'relative',
                            right:'2vw',
                            borderColor: 'black',
                            borderWidth: '5px'
                        }}>
                            {/* <Typography
                                zIndex={255}
                                    variant='caption'
                                    noWrap
                                    sx={{ display: 'inline-block', width: '10vw' }}>
                                    {file.name}
                                </Typography> */}
                            <Stack direction='row'>
                                <img
                                    alt={file.name}
                                    src={file.content}
                                    width='100vw'
                                />

                                <IconButton aria-label="delete" size="medium" sx={{ position: 'relative', top: '55%' }}
                                    onClick={handleDeleteImage}>
                                    <HighlightOff fontSize="inherit" />
                                </IconButton>
                            </Stack>
                        </Stack>
                    ))}
                </>
            }
            {
                (!editable) &&
                <>
                    {filesContent.map((file, index) => (
                        <div key={index}>
                            <img
                                alt={file.name}
                                src={file.content}
                                width='100vw'
                            ></img>
                        </div>
                    ))}
                </>
            }
        </div>
    );
}