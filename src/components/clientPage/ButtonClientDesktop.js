import React from 'react'
import { Button } from '@mui/material'
import { Edit, Delete, Save, Cancel } from '@mui/icons-material/';

export default function ButtonClientDesktop(props) {

    const buttonCommonProperties = {
        size: 'large',
        variant: 'contained',
        sx: {
            display: { xs: 'none', sm: 'none', md: 'inline' },
            mr: { md: '4vw', lg: '1vw' }
        }
    }

    return (
        <div>
            {props.editable &&
                <Button
                    id='crearGuardarCliente'
                    {...buttonCommonProperties}
                    startIcon={<Save />}
                    type='submit'
                    color="success"
                    //variant='outlined'
                >
                    {props.clienteId === 'new' ? 'Crear ' : 'Guardar '}
                </Button>
            }

            {props.editable &&
                <Button
                    id='cancelarCliente'
                    {...buttonCommonProperties}
                    startIcon={<Cancel />}
                    onClick={props.handleCancelEdit}
                    color="error"
                    //variant='outlined'
                >
                    Cancelar
                </Button>
            }

            {props.clienteId !== 'new' && !props.editable &&
                <Button
                    id='editarCliente'
                    {...buttonCommonProperties}
                    onClick={props.handleEditClick}
                    startIcon={<Edit />}
                    color="secondary"
                    //variant='outlined'
                >
                    Editar
                </Button>
            }

            {props.clienteId !== 'new' && !props.editable &&
                <Button
                id='borrarCliente'
                    {...buttonCommonProperties}
                    onClick={props.handleDeleteClick}
                    startIcon={<Delete  />}
                    color="error"
                    //variant='outlined'
                >
                    Borrar
                </Button>
            }
        </div>
    )
}
