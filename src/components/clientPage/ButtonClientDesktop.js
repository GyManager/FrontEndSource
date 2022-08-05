import React from 'react'
import { Button } from '@mui/material'
import { Edit, Delete, Save, Cancel } from '@mui/icons-material/';

export default function ButtonClientDesktop(props) {

    const buttonCommonProperties = {
        size:'large',
        variant: 'contained',
        sx: { display: { xs: 'none', sm: 'none', md: 'inline' },
        mr:{md:'4vw', lg:'1vw'}
    }}

    return (
        <div>
            { props.editable &&
            <Button
                {...buttonCommonProperties}
                startIcon={<Save />}
                type='submit'
            >
                {props.clienteId === 'new' ? 'Crear ' : 'Guardar '}
            </Button>
            }

            { props.editable &&
            <Button
                {...buttonCommonProperties}
                startIcon={<Cancel />}
                onClick={props.handleCancelEdit}
            >
                Cancelar
            </Button>
            }

            { props.clienteId !== 'new' && !props.editable &&
            <Button
                {...buttonCommonProperties}
                onClick={props.handleEditClick}
                startIcon={<Edit/>}
            >
                Editar
            </Button>
            }

            { props.clienteId !== 'new' && !props.editable &&
            <Button
                {...buttonCommonProperties}
                onClick={props.handleDeleteClick}
                startIcon={<Delete />}
            >
                Borrar
            </Button>
            }
        </div>
    )
}
