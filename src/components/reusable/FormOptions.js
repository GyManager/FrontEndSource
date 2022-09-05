import React from 'react'
import { Button } from '@mui/material'
import { Edit, Save, Cancel } from '@mui/icons-material/';
import DeleteButtonWithAlert from './buttons/DeleteButtonWithAlert';

/**
 * 
 * @param {id, editable, handleCancelEdit, handleEditClick, handleDeleteClick, enableDeleteAlways} props 
 * @returns 
 */
export default function FormOptions(props) {

    const buttonCommonProperties = {
        size: 'large',
        variant: 'contained',
        sx: {
            display: { xs: 'none', sm: 'none', md: 'inline' },
            mr:'1vw'
        }
    }

    return (
        <div>
            {props.editable &&
                <Button
                    id={props.id === 'new' ? 'crearOption' : 'guardarOption'}
                    {...buttonCommonProperties}
                    startIcon={<Save />}
                    type='submit'
                >
                    {
                        props.submitMessage ? props.submitMessage :
                            props.id === 'new' ? 'Crear' : 'Guardar '
                    }
                </Button>
            }

            {props.editable &&
                <Button
                    id='cancelarOption'
                    {...buttonCommonProperties}
                    startIcon={<Cancel />}
                    onClick={props.handleCancelEdit}
                >
                    Cancelar
                </Button>
            }

            {props.id !== 'new' && !props.editable &&
                <Button
                    id='editarOption'
                    {...buttonCommonProperties}
                    onClick={props.handleEditClick}
                    startIcon={<Edit />}
                >
                    Editar
                </Button>
            }

            {(props.enableDeleteAlways || (props.id !== 'new' && !props.editable)) &&
                <DeleteButtonWithAlert
                    handleAccept={props.handleDeleteClick}
                    buttonProps={{id:"borrarOption", ...buttonCommonProperties}}
                    alertTitle={props.deleteAlertTitle}
                />
            }
        </div>
    )
}
