import { useState } from "react";
import { Avatar, Card, CardActionArea, CardContent, CardHeader, Collapse, Typography } from '@mui/material'
import { useNavigate } from "react-router-dom";

/**
 * 
 * @param {idCliente, idPlan, objetivo, descripcion, fechaDesde, fechaHasta} props 
 * @returns 
 */
export default function PlanListMember(props){

    const navigate = useNavigate()
    const [collapsed, setCollapsed] = useState(false);
    const avatar = (
        <Avatar sx={{ bgcolor: 'primary.main' }}>
            {props.objetivo.charAt(0)}
        </Avatar>
    )
    const fechas = props.fechaHasta ? `${props.fechaDesde} - ${props.fechaHasta}` : props.fechaDesde;

    return (
        <Card 
            onMouseEnter={() => setCollapsed(true)} 
            onMouseLeave={() => setCollapsed(false)}
        >
            <CardActionArea onClick={() => navigate(`/clientes/${props.idCliente}/planes/${props.idPlan}`)}>
                <CardHeader
                    avatar={avatar}
                    title={props.objetivo}
                    subheader={fechas}
                />
                <Collapse in={collapsed}>
                    <CardContent sx={{pt: 0}}>
                        <Typography variant="body2" color="text.secondary">{props.descripcion}</Typography>
                    </CardContent>
                </Collapse>
            </CardActionArea>
        </Card>
    )    
}