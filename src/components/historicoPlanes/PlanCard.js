import { Check, ElectricBolt, Lock } from "@mui/icons-material";
import {
    Avatar,
    Card,
    CardActionArea,
    CardContent,
    CardHeader,
    Chip,
    Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { useNavigate, useParams } from "react-router-dom";

export default function PlanCard(props) {
    const navigate = useNavigate();

    const esFuturo = new Date(props.fechaDesde) > new Date();
    const esVigente =
        new Date(props.fechaDesde) <= new Date() && new Date(props.fechaHasta) >= new Date();

    const color = esFuturo ? "#e2dbdb" : esVigente ? "#FFFFFF" : "#cce2cd";

    const badge = esFuturo ? (
        <Chip label="Pendiente" color="secondary" variant="contained" icon={<Lock />} />
    ) : esVigente ? (
        <Chip label="En curso" color="primary" variant="contained" icon={<ElectricBolt />} />
    ) : (
        <Chip label="Completado" color="success" variant="contained" icon={<Check />} />
    );

    const fechas = props.fechaHasta
        ? `${new Date(props.fechaDesde).toLocaleDateString()} - ${new Date(
              props.fechaHasta
          ).toLocaleDateString()}`
        : new Date(props.fechaDesde).toLocaleDateString();

    const avatar = <Avatar sx={{ bgcolor: "primary.main" }}>{props.objetivo.charAt(0)}</Avatar>;

    function handleClick() {
        if (esFuturo) {
        } else {
            navigate(props.route);
        }
    }

    return (
        <Card sx={{ mx: 1, p: 0, mt: 2, borderRadius: 4 }}>
            <CardActionArea onClick={handleClick} sx={{ backgroundColor: color }}>
                <CardHeader
                    title={props.objetivo}
                    subheader={fechas}
                    titleTypographyProps={{ variant: "h5", align: "center" }}
                    subheaderTypographyProps={{ variant: "body2", align: "center" }}
                />
                <CardContent sx={{ pt: 0, pb: 1 }}>
                    <Typography variant="body2">{props.descripcion}</Typography>
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
