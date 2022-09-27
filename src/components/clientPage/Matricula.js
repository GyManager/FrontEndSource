import {
    Card,
    CardContent,
    CardHeader,
    Collapse,
    Typography,
} from "@mui/material";
import { useState } from "react";

/**
 *
 * @param {title, fechaPago, fechaInicio, fechaVencimiento, collapsable} props
 */
export default function Matricula(props) {
    const [collapsed, setCollapsed] = useState(false);

    const cardContent = (
        <CardContent sx={{ pt: 0 }}>
            <Typography variant="body2">
                Fecha de pago: {new Date(props.fechaPago).toLocaleDateString()}
            </Typography>
            <Typography variant="body2">
                Fecha de inicio: {new Date(props.fechaInicio).toLocaleDateString()}
            </Typography>
            <Typography variant="body2">
                Fecha de vencimiento: {new Date(props.fechaVencimiento).toLocaleDateString()}
            </Typography>
        </CardContent>
    );

    return (
        <Card 
            sx={{mt:1}}
            onMouseEnter={() => setCollapsed(true)}
            onMouseLeave={() => setCollapsed(false)}
        >
            <CardHeader
                sx={{ pb: 1 }}
                title={props.title}
                titleTypographyProps={{ variant: "h6" }}
            />
            {props.collapsable ? (
                <Collapse in={collapsed} timeout={{enter:300,exit:1000}}>{cardContent}</Collapse>
            ) : (
                cardContent
            )}
        </Card>
    );
}
