import { useEffect, useState } from "react";
import { Box, Button, Skeleton, Typography } from '@mui/material'
import { AxiosError } from "axios";
import planesService from "../../services/planes.service";
import PlanListMember from "./PlanListMember";
import { Add } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

/**
 * 
 * @param {idCliente} props 
 * @returns 
 */
export default function Planes(props){

    const navigate = useNavigate()
    const [loading, setLoading] = useState(false);
    const [planes, setPlanes] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            const respuesta = await planesService.getPlanesByIdCliente(props.idCliente);
            setLoading(false)
            if (respuesta instanceof AxiosError) {
                console.log(respuesta)
            } else {
                setPlanes(respuesta)
            }
        }
        fetchData();
    }, [props.idCliente])

    return (
        <Box>
            <Typography sx={{fontSize: { xs: 20, md: 24}}}>Planes</Typography>
            {
                loading ? <Skeleton/> :
                    planes.map(plan => (
                        <PlanListMember key={plan.idPlan} {...plan} idCliente={props.idCliente}/>
                    ))
            }
            <Button
                size='medium'
                variant='contained'  color="secondary"
                sx={{ maxWidth:{ xs:'100%', md:'30%'}, mt: 2}}
                startIcon={<Add />}
                onClick={() => navigate(`/clientes/${props.idCliente}/planes/new`)}
            >
                Nuevo plan
            </Button>
        </Box>
    )    
}