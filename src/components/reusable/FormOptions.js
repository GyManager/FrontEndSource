import React from 'react'
import { Button } from '@mui/material'
import { Edit, Save, Cancel } from '@mui/icons-material/';
import DeleteButtonWithAlert from './buttons/DeleteButtonWithAlert';

/**
 * 
 * @param {id, editable, handleCancelEdit, handleEditClick, handleDeleteClick, enableDeleteAlways, viewModeOnly} props 
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

            {(props.editable || props.viewModeOnly) &&
                <Button
                    id='cancelarOption'
                    {...buttonCommonProperties}
                    startIcon={<Cancel />}
                    onClick={props.handleCancelEdit}
                    color="secondary"
                >
                    Cancelar
                </Button>
            }

            {props.id !== 'new' && !props.editable && !props.viewModeOnly &&
                <Button
                    id='editarOption'
                    {...buttonCommonProperties}
                    onClick={props.handleEditClick}
                    startIcon={<Edit />}
                >
                    Editar
                </Button>
            }

            {(props.enableDeleteAlways || (props.id !== 'new' && !props.editable)) && !props.viewModeOnly &&
                <DeleteButtonWithAlert
                    handleAccept={props.handleDeleteClick}
                    buttonProps={{id:"borrarOption", ...buttonCommonProperties, color:'secondary'}}
                    alertTitle={props.deleteAlertTitle}
                />
            }
        </div>
    )
}
