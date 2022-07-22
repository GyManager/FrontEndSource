import { React, useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';

import { Typography, Box, Paper, Stack } from '@mui/material'

import DatePicker from './DatePicker'

import ButtonClientMobile from './ButtonClientMobile';
import ButtonClientDesktop from './ButtonClientDesktop';
import TipoDoc from './TipoDoc';
import Input from './Input';

import clientsService from '../../services/clients.service';
import GenericComboBox from '../reusable/GenericComboBox';
// import EditIcon from '@mui/icons-material/Edit';

function Client() {
    
    const navigate = useNavigate()

    let { clienteId } = useParams();

    const [editable, setEditable] = useState(false)

    const [tipoDoc, setTipoDoc] = useState('');
    const handleChangeTipoDoc = (event) => {
        setTipoDoc(event.target.value);
    };

    const [nroDoc, setNroDoc] = useState('');
    const handleChangeNroDoc = (event) => {
        setNroDoc(event.target.value);
    }

    const [nombre, setNombre] = useState('');
    const handleChangeNombre = (e) => {
        setNombre(e.target.value)
    }

    const [apellido, setApellido] = useState('');
    const handleChangeApellido = (e) => {
        setApellido(e.target.value)
    }

    const [sexo, setSexo] = useState('');

    const [fechaNacimiento, setFechaNacimiento] = useState(null);

    const [email, setEmail] = useState('');
    const handleChangeEmail = (e) => {
        setEmail(e.target.value)
    }

    const [celular, setCelular] = useState('');
    const handleChangeCelular = (e) => {
        setCelular(e.target.value)
    }

    const [direccion, setDireccion] = useState('');
    const handleChangeDireccion = (e) => {
        setDireccion(e.target.value)
    }

    const [objetivo, setObjetivo] = useState('');
    const handleChangeObjetivo = (e) => {
        setObjetivo(e.target.value)
    }
    
    const [observaciones, setObservaciones] = useState('');

    const getClientById = async () => {
        try {
            await clientsService.getClientById(clienteId).then(
                (persona) => {
                    console.log(persona)
                    setTipoDoc(persona.tipoDocumento)
                    setNroDoc(persona.numeroDocumento)
                    setNombre(persona.nombre)
                    setApellido(persona.apellido)
                    setEmail(persona.mail)
                    setCelular(persona.celular)
                    setSexo(persona.sexo)

                    setDireccion(persona.direccion)
                    setObjetivo(persona.objetivo)
                    setFechaNacimiento(persona.fechaNacimiento)
                    setObservaciones(persona.observaciones)
                }
            )
        } catch (error) {
            console.log(error)
        }
    }
    
    const handleSubmit = async (e) => {
        e?.preventDefault();
        console.log("asd")
        const actualTime = new Date();
        let actualTimeString = actualTime.toUTCString();
        console.log(actualTimeString)
        const cliente = {
            "usuario": {
                "numeroDocumento": Number(nroDoc),
                "tipoDocumento": tipoDoc,
                "nombre": nombre,
                "apellido": apellido,
                "sexo": sexo,
                "mail": email,
                "celular": Number(celular)
            },
            "objetivo": objetivo,
            "direccion": direccion,
            "fechaNacimiento": fechaNacimiento,
            "observaciones": observaciones
        }
        console.log(cliente)
        console.log(clienteId)

        if (clienteId === 'new') {
            try {
                await clientsService.postClient(cliente).then(
                    () => {
                        console.log('El cliente se cargo con exito');
                    },
                );
                //TODO NICO 4 No entiendo porque se viene por la rama del error y no me lo renderiza...
                // Si bien no jode para terminar de cargar el cliente, si necesitase recuperar 
                // su id si me joderia.
            } catch (err) {
                console.log('Error en componente client')
                console.log(err)
            } finally {
                // esto deberia estar en la rama true (try/then)
                // console.log(response)
                navigate("/clientes")
            }
        } else {
            try {
                await clientsService.putClient(cliente, clienteId).then(
                    () => {
                        console.log('El cliente se actualizo con exito');
                    },
                );
            } catch (err) {
                console.log('Error en componente client')
                console.log(err)
            } finally {
                setEditable(false)
            }
        }
    }

    const deleteCliente = () => {
        clientsService.deleteClientById(clienteId);
        navigate("/clientes");
    }

    const handleCancelEdit = () => {
        if(clienteId === 'new'){
            navigate("/clientes");
        } else {
            setEditable(false)
            getClientById();
        }   
    }



    // TODO 004 ver el error y leer sobre los hooks useEffect, debe estar vacia?
    // debe tener un array
    useEffect(() => {
        if (clienteId === 'new') {
            setEditable(true)
        } else {
            getClientById()
        }
    }, [])


    return (
        <form
            method="post"
            onSubmit={handleSubmit}>
            {/* TODO 001 HACER UN COMPONENTE TIPOGRAPHY CON LOS TAMAÑOS DE LAS LETRAS PARA 
        REDUCIR MANTENIMINETO Y MEJORAR CONSISTENCIA   */}
            <Stack direction='row' justifyContent='space-between' alignItems='center'
                sx={{ width: { xs: '90vw', lg: '50vw' } }}
            >
                <Typography sx={{ fontSize: { xs: 24, md: 30, lg: 36, xl: 42 }, mb: '1vh' }} >
                    Cliente: {nombre} {apellido}
                </Typography>
                <div sx={{ display: { xs: 'none', sm: 'none', md: 'inline-block' } }}>
                    <ButtonClientDesktop
                        editable={editable}
                        handleEditClick={() => setEditable(true)}
                        handleDeleteClick={deleteCliente} 
                        handleCancelEdit={handleCancelEdit} 
                        clienteId={clienteId}
                        handleSubmit={handleSubmit}
                    />
                </div>
            </Stack>
            <Box
                display='flex'
                flexWrap='flexwrap'
                justifyContent='center'

            >
                <div>
                    <Paper
                        elevation='12'
                    >
                        <Stack direction={{ xs: 'column', sm: 'column', md: 'row', }}
                            justifyContent='space-around'

                            sx={{
                                // backgroundColor: 'red',
                                width: { xs: '80vw', lg: '40vw' },
                            }}>
                            <TipoDoc
                                tipoDoc={tipoDoc}
                                handleChange={handleChangeTipoDoc}
                                editable={editable}
                            />

                            <Input label="Numero de documento"
                                value={nroDoc}
                                handleChange={handleChangeNroDoc}
                                editable={editable}
                            />

                        </Stack>
                    </Paper>
                    <Paper
                        elevation='12'
                    >
                        <Stack direction={{ xs: 'column', sm: 'column', md: 'row' }}
                            sx={{
                                my: '1vh'
                            }} >
                            <Input label="Nombre"
                                value={nombre}
                                handleChange={handleChangeNombre}
                                editable={editable}
                            />
                            <Input label="Apellido"
                                value={apellido}
                                handleChange={handleChangeApellido}
                                editable={editable}
                            />
                            
                            <DatePicker
                                calendarValue={fechaNacimiento}
                                handleChange={setFechaNacimiento}
                                editable={editable}
                            />

                            <GenericComboBox
                                label="Sexo"
                                value={sexo}
                                handleChange={(event) => setSexo(event.target.value)}
                                editable={editable}
                                valueForNone=""
                                labelForNone="Seleccionar sexo"
                                values={["Masculino", "Femenino", "No especifica"]}
                            />

                        </Stack>
                    </Paper>
                    <Paper
                        elevation='12'
                    >
                        <Stack direction={{ xs: 'column', sm: 'column', md: 'row' }} >
                            <Input label="Email"
                                value={email}
                                handleChange={handleChangeEmail}
                                editable={editable}
                            />
                            <Input label="Celular"
                                value={celular}
                                handleChange={handleChangeCelular}
                                editable={editable}
                            />
                            <Input label="Direccion"
                                value={direccion}
                                handleChange={handleChangeDireccion}
                                editable={editable}
                            />
                        </Stack>
                    </Paper>
                    <Paper
                        elevation='12'
                    >
                        <Input label="Objetivo"
                            value={objetivo}
                            handleChange={handleChangeObjetivo}
                            editable={editable}
                        />
                    </Paper>
                    <Paper
                        elevation='12'
                    >
                        <Typography>Input - Medidas</Typography>
                    </Paper>
                    <Paper
                        elevation='12'
                        sx={{
                            backgroundColor: 'orange'
                        }}>
                        <Typography>Input - Planes</Typography>
                    </Paper>
                    <Paper
                        elevation='12'
                        sx={{
                            backgroundColor: 'lightblue'
                        }}>
                        <Typography>Input - Matriculas</Typography>
                    </Paper>
                </div>
            </Box>
            <ButtonClientMobile
                editable={editable}
                handleEditClick={() => setEditable(true)}
                handleDeleteClick={deleteCliente} 
                handleCancelEdit={handleCancelEdit} 
                clienteId={clienteId}
                handleSubmit={handleSubmit}
            />
        </form>
    )
}

export default Client