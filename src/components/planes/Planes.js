import { useEffect, useState } from "react";
import { Box, Skeleton, Typography } from '@mui/material'
import { AxiosError } from "axios";
import planesService from "../../services/planes.service";
import PlanListMember from "./PlanListMember";

/**
 * 
 * @param {idCliente} props 
 * @returns 
 */
export default function Planes(props){

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
        </Box>
    )    
}