import React from 'react'
import { Button } from '@mui/material'
import { Edit, Delete, Save } from '@mui/icons-material/';

export default function ButtonClientDesktop(props) {

    const buttonCommonProperties = {
        size:'medium',
        variant: 'contained',
        sx: { display: { xs: 'none', sm: 'none', md: 'inline-block' } }
    }

    return (
        <div>
            { props.editable &&
            <Button
                {...buttonCommonProperties}
                startIcon={<Save />}
                type='submit'
            >
                Guardar {props.clienteId === 'new' && "Nuevo "}Cliente
            </Button>
            }

            { props.clienteId != 'new' && !props.editable &&
            <Button
                {...buttonCommonProperties}
                onClick={props.handleEditClick}
                startIcon={<Edit />}
            >
                Editar Cliente
            </Button>
            }

            { props.clienteId != 'new' && !props.editable &&
            <Button
                {...buttonCommonProperties}
                onClick={props.handleDeleteClick}
                startIcon={<Delete />}
            >
                Borrar Cliente
            </Button>
            }
        </div>
    )
}
