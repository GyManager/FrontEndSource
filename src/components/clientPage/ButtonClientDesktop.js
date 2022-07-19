import React from 'react'

import { Button } from '@mui/material'
import { Edit, Delete, Save } from '@mui/icons-material/';
import clientsService from '../../services/clients.service';

function ButtonClientDesktop(props) {
/*
    const handleClickButton = async () => {
        props.setEditable(!props.editable)
        if (props.clienteId === 'new') {
            // const postClient = async () => {
            try {
                await clientsService.postClient().then(
                    () => {
                        console.log('Correcto');
                    },
                    // (error) => {
                    //     console.log('recibi el error nuevo')
                    //     console.log(error)
                    // }

                );
                // TODO 008
            } catch (error) {
                console.log('Error en componente client')
                console.log(error)
            } finally {
                // esto deberia estar en la rama true
            }
        }

        // navigate al id del cliente

        //Si estaba en modo de edicion, quiero hacer un post con los nuevos datos. pero arriba cambie el modo de edicion asi que:
        // me voy por la rama del false
        // if (props.editable) {
        // } else {
        //     // putClient()
        //     // TODO 005
        // }
        // editable ? null : putClient
    }

*/

    return (
        <div>
            <Button
                sx={{ display: { xs: 'none', sm: 'none', md: 'inline-block' } }}
                variant='contained'
                startIcon={props.editable ? <Save /> : <Edit />}
                size='medium'
                type='submit'
            >
                {props.clienteId === 'new' ? "Crear Cliente" :
                    props.editable ? "Guardar Cliente" : "Editar Cliente"}
            </Button>
            {
                props.clienteId === 'new'
                    ?
                    null
                    :
                    <Button
                        sx={{ display: { xs: 'none', sm: 'none', md: 'inline-block' } }}
                        variant='contained'
                        startIcon={<Delete />}
                        size='medium'
                        type='submit'
                    >Borrar Cliente
                    </Button>
            }</div>
    )
}

export default ButtonClientDesktop