import { Check, ElectricBolt, Lock } from "@mui/icons-material";
import { Card, CardActionArea, CardContent, Chip, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useNavigate } from "react-router-dom";

export default function MicroPlanCard(props) {
    const navigate = useNavigate();

    const esFuturo = !props.esCompletado && props.semanaInicio > props.semanaActual;
    const esVigente = !props.esCompletado &&
        props.semanaInicio <= props.semanaActual && props.semanaFin >= props.semanaActual;

    const color = esFuturo ? "#e2dbdb" : esVigente ? "#FFFFFF" : "#cce2cd";

    const badge = esFuturo ? (
        <Chip label="Pendiente" color="secondary" variant="contained" icon={<Lock />} />
    ) : esVigente ? (
        <Chip label="En curso" color="primary" variant="contained" icon={<ElectricBolt />} />
    ) : (
        <Chip label="Completado" color="success" variant="contained" icon={<Check />} />
    );

    return (
        <Card sx={{ mx: 1, p: 0, mt: 2, borderRadius: 4}}>
            <CardActionArea onClick={() => navigate(props.route)} sx={{ backgroundColor: color }}>
                <CardContent sx={{ pb: 0 }}>
                    <Typography variant="h6" align="center">
                        {props.nombre}
                    </Typography>

                    <Typography variant="body2" align="center">
                        {`Semana ${props.semanaInicio}${
                            props.semanaInicio !== props.semanaFin ? " a " + props.semanaFin : ""
                        }`}
                    </Typography>
                    <Box
                        sx={{
                            display: "flex",
                            direction: "row",
                            justifyContent: "flex-end",
                            mb: 1,
                        }}
                    >
                        {badge}
                    </Box>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}
