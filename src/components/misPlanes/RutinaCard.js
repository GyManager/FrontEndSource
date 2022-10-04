import { Check, ElectricBolt } from "@mui/icons-material";
import { Card, CardActionArea, CardContent, Chip, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useNavigate } from "react-router-dom";

export default function RutinaCard(props) {
    const navigate = useNavigate();

    const color = props.completado ? "#cce2cd" : "#ffffff";

    const badge = props.completado ? (
        <Chip label="Completado esta semana" color="success" variant="contained" icon={<Check />} />
    ) : (
        <Chip label="Pendiente" color="primary" variant="contained" icon={<ElectricBolt />} />
    );

    return (
        <Card sx={{ mx: 1, p: 0, mt: 2, borderRadius: 4 }}>
            <CardActionArea onClick={() => navigate(props.route)} sx={{ backgroundColor: color }}>
                <CardContent sx={{ pb: 0 }}>
                    <Typography variant="h6" align="center">
                        Rutina {props.nombre}
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
