import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Box } from "@mui/system";
import { Typography, Paper, TableContainer, TableHead, TableRow, TableCell,Table, TableBody, TablePagination, Divider, Skeleton, Stack, Button } from "@mui/material";
import { AxiosError } from "axios";
import SearchBar from "../clientsPage/SearchBar";
import microPlanesService from "../../services/micro-planes.service";
import { GenericComboBox, GenericModal } from "../reusable";
import ButtonToFabCrear from "../reusable/ButtonToFabCrear";
import { Cancel, Edit } from "@mui/icons-material";

export default function MicroPlanes(props) {

    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [modalMsj, setModalMsj] = useState("");

    const [microPlanes, setMicroPlanes] = useState(() => [])
    const [microPlanesTotal, setMicroPlanesTotal] = useState(() => 0)
    const [page, setPage] = useState(() => 0);
    const [pageSize, setPageSize] = useState(() => 10);
    const [valueToSearch, setValueToSearch] = useState('');
    const [cantidadRutinas, setCantidadRutinas] = useState('');
    
    const searchMicroPlanes = (newValueToSearch) => {
        setValueToSearch(newValueToSearch)
        setPage(0)
    }

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            const respuesta = await microPlanesService.getMicroPlanes(valueToSearch, pageSize, page, null, cantidadRutinas);
            setLoading(false)
            if (respuesta instanceof AxiosError) {
                console.log(respuesta)
                setModalMsj(respuesta?.message)
            } else {
                setMicroPlanes(respuesta.content)
                setMicroPlanesTotal(respuesta.totalElements)
            }
        }
        fetchData();
    }, [valueToSearch, pageSize, page, cantidadRutinas])

    const onSelectedMicroPlan = props.onSelectedMicroPlan ? props.onSelectedMicroPlan : (idMicroPlan) => {
        navigate(`/micro-planes/${idMicroPlan}`)
    }

    const tableRows = microPlanes.map(microPlan => (
        <TableRow hover key={microPlan.nombre} 
            sx={{cursor:'pointer'}}
        >
            <TableCell onClick={() => onSelectedMicroPlan(microPlan.idMicroPlan)}>{microPlan.nombre}</TableCell>
            <TableCell onClick={() => onSelectedMicroPlan(microPlan.idMicroPlan)}>{microPlan.cantidadRutinas}</TableCell>
            {props.cellEditAction !== undefined && props.cellEditAction !== null && 
            <TableCell>
                <Button 
                    variant='contained' 
                    size='small' 
                    onClick={() => props.cellEditAction(microPlan.idMicroPlan)}
                > 
                    <Edit /> 
                </Button>
            </TableCell>}
        </TableRow>
    ));

    const skeleton = [...Array(pageSize)].map((currentValue, index, array) => 
        <TableRow key={index}>
            <TableCell sx={{width:'50%'}}><Skeleton animation='wave'/></TableCell>
        </TableRow>
    );

    return (
        <Paper sx={{p:2, gap:3, display:'flex', flexDirection:'column', minWidth:'80%'}}>
            
            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                <Typography sx={{ fontSize: { xs: 24, md: 30, lg: 36, xl: 40 } }}>
                    Micro Planes
                </Typography>
                <ButtonToFabCrear
                    label="Crear Micro Plan"
                    onClick={props.onNewMicroPlan ? props.onNewMicroPlan : (() => navigate("/micro-planes/new"))}
                />
            </Box>


            <Stack 
                direction={{xs:'column', md:'row'}}
                gap={3}
                alignItems="center"
            >
                <Box sx={{width:{xs:'100%', md:'40%'}}}>
                    <SearchBar searchClientes={searchMicroPlanes}/>
                </Box>
                <GenericComboBox
                    label="Cantidad de rutinas"
                    id={`cantidadRutinas`}
                    name={`cantidadRutinas`}
                    handleChange={(e) => setCantidadRutinas(e.target.value)}
                    value={cantidadRutinas}
                    valueForNone=""
                    labelForNone="Cualquier cantidad"
                    values={[1,2,3,4,5,6,7]}
                    minWidth={200}
                    editable={true}
                />
            </Stack>

            <Paper>
                <TableContainer sx={{ height: { xs: '64vh', md:'55vh' }}}>
                    <Table >
                        <TableHead>
                            <TableRow>
                                <TableCell > Nombre </TableCell>
                                <TableCell > Cantidad de rutinas </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {loading ? skeleton : tableRows}
                        </TableBody>
                    </Table>
                </TableContainer>
                <Divider/>
                <TablePagination
                    sx={{justifyContent:'center', display:'flex'}}
                    labelRowsPerPage='Filas'
                    rowsPerPageOptions={[10, 25, 100]}
                    component="div"
                    count={microPlanesTotal}
                    rowsPerPage={pageSize}
                    page={page}
                    onPageChange={(event, newPage) => {setPage(newPage)}}
                    onRowsPerPageChange={(event) => {setPageSize(event.target.value)} }
                />
            </Paper>

            {props.onCancelSearch && 
                <Box sx={{display:'flex', justifyContent:'end', mt:2, gap:2}}>
                    <Button
                        variant='outlined'
                        size='medium' 
                        color='secondary'
                        startIcon={<Cancel/>}
                        onClick={props.onCancelSearch}
                    >
                        Cancelar
                    </Button>
                </Box>
            }

            { modalMsj &&
                <GenericModal
                    show={modalMsj !== ""}
                    hide={() => setModalMsj("")}
                    serverMsj={modalMsj} 
                />
            }
        </Paper>
    )
}