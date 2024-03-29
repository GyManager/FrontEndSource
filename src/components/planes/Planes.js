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
            let filter = props.tipo === 'vigentes' ? 'ACTIVOS' :
                props.tipo === 'futuros' ? 'FUTUROS' :
                props.tipo === 'vencidos' ? 'VENCIDOS' :
                'TODOS'
            const respuesta = await planesService.getPlanesByIdCliente(props.idCliente, filter);
            setLoading(false)
            if (respuesta instanceof AxiosError) {
                console.log(respuesta)
            } else {
                setPlanes(respuesta.sort((a,b) => Date.parse(a.fechaDesde) < Date.parse(b.fechaDesde) ? -1 : 1))
            }
        }
        fetchData();
    }, [props.idCliente])

    return (
        <Box>
            <Typography sx={{fontSize: { xs: 20, md: 24}}}>Planes {props.tipo}</Typography>
            {
                loading ? <Skeleton/> :
                    planes.map(plan => (
                        <PlanListMember key={plan.idPlan} {...plan} idCliente={props.idCliente}/>
                    ))
            }
            { !loading && planes.length === 0 &&
                <Button
                    size='medium'
                    variant='contained'
                    sx={{ maxWidth:{ xs:'100%', md:'40%'}, mt: 2}}
                    startIcon={<Add />}
                    onClick={() => navigate(`/clientes/${props.idCliente}/planes/new`)}
                >
                    Nuevo plan
                </Button>
            }
        </Box>
    )    
}