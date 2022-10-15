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
    const fechas = props.fechaHasta ? 
        `${new Date(props.fechaDesde).toLocaleDateString()} - ${new Date(props.fechaHasta).toLocaleDateString()}` 
        : new Date(props.fechaDesde).toLocaleDateString();

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
                <Collapse in={collapsed} timeout={{enter:300,exit:1000}}>
                    <CardContent sx={{pt: 0}}>
                        <Typography variant="body2" color="text.secondary">{props.descripcion}</Typography>
                    </CardContent>
                </Collapse>
            </CardActionArea>
        </Card>
    )    
}