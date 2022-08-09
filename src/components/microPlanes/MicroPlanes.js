import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Box } from "@mui/system";
import { Typography, Paper, Link, Button, TableContainer, TableHead, TableRow, TableCell,Table, TableBody, TablePagination, Divider, Skeleton } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';

import { AxiosError } from "axios";

import SearchBar from "../clientsPage/SearchBar";
import microPlanesService from "../../services/micro-planes.service";
import { GenericModal } from "../reusable";

export default function MicroPlanes() {

    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [modalMsj, setModalMsj] = useState("");

    const [microPlanes, setMicroPlanes] = useState(() => [])
    const [microPlanesTotal, setMicroPlanesTotal] = useState(() => 0)
    const [page, setPage] = useState(() => 0);
    const [pageSize, setPageSize] = useState(() => 10);
    const [valueToSearch, setValueToSearch] = useState('');
    
    const searchMicroPlanes = (newValueToSearch) => {
        setValueToSearch(newValueToSearch)
        setPage(0)
    }

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            const respuesta = await microPlanesService.getMicroPlanes(valueToSearch, pageSize, page);
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

    }, [valueToSearch, pageSize, page])

    const tableRows = microPlanes.map(microPlan => (
        <TableRow hover key={microPlan.nombre} 
            onClick={() => navigate(`/micro-planes/${microPlan.idMicroPlan}`)}
            sx={{cursor:'pointer'}}
        >
            <TableCell>{microPlan.nombre}</TableCell>
            <TableCell>{microPlan.nombre}</TableCell>
        </TableRow>
    ));

    const skeleton = [...Array(pageSize)].map((currentValue, index, array) => 
        <TableRow key={index}>
            <TableCell sx={{width:'50%'}}><Skeleton animation='wave'/></TableCell>
            <TableCell sx={{width:'50%'}}><Skeleton animation='wave'/></TableCell>
        </TableRow>
    );

    return (
        <Paper sx={{p:2, gap:3, display:'flex', flexDirection:'column'}}>
            
            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                <Typography sx={{ fontSize: { xs: 24, md: 30, lg: 36, xl: 40 } }}>
                    Micro Planes
                </Typography>
                <Link to='/clientes/new' sx={{display: { xs: 'none', sm: 'none', md: 'inline-flex' }}}>
                    <Button
                        variant='contained'
                        startIcon={<AddIcon />}
                        size='medium'
                    >
                        Crear Micro Plan
                    </Button>
                </Link>
            </Box>

            <Box sx={{width:{xs:'100%', md:'40%'}}}>
                <SearchBar searchClientes={searchMicroPlanes}/>
            </Box>

            <Paper>
                <TableContainer sx={{ height: { xs: '64vh', md:'55vh' }}}>
                    <Table >
                        <TableHead>
                            <TableRow>
                                <TableCell > Nombre </TableCell>
                                <TableCell > Descripcion Micro Plan </TableCell>
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

            <GenericModal
                show={modalMsj !== ""}
                hide={() => setModalMsj("")}
                serverMsj={modalMsj} 
            />
        </Paper>
    )
}