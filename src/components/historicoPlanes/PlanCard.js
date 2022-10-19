import { Check, ElectricBolt, Lock, WarningAmberRounded } from "@mui/icons-material";
import {
    Button,
    Card,
    CardActionArea,
    CardContent,
    CardHeader,
    Chip,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    Stack,
    Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { Fragment, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function PlanCard(props) {
    const [open, setOpen] = useState(() => false);
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

    function handleClick() {
        if (esFuturo) {
            setOpen(true);
        } else {
            navigate(props.route);
        }
    }

    return (
        <Fragment>
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
            <Dialog open={open} onClose={() => setOpen(false)}>
                <DialogContent>
                    <Stack direction="column" justifyContent="center" alignItems="center">
                        <WarningAmberRounded
                            sx={{ width: "100%", height: "8vh", color: "secondary.main" }}
                        />
                        <DialogContentText id="alert-dialog-description" align="center">
                            Aun no tienes acceso al plan, podras acceder desde el{" "}
                            {new Date(props.fechaDesde).toLocaleDateString()}
                        </DialogContentText>
                    </Stack>
                </DialogContent>
                <DialogActions sx={{ justifyContent: "center" }}>
                    <Button onClick={() => setOpen(false)}>Aceptar</Button>
                </DialogActions>
            </Dialog>
        </Fragment>
    );
}
