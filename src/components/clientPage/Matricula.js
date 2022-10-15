import { Delete } from "@mui/icons-material";
import {
    Card,
    CardActions,
    CardContent,
    CardHeader,
    Collapse,
    Typography,
} from "@mui/material";
import { Fragment, useState } from "react";
import DeleteButtonWithAlert from "../reusable/buttons/DeleteButtonWithAlert";

/**
 *
 * @param {title, fechaPago, fechaInicio, fechaVencimiento, collapsable} props
 */
export default function Matricula(props) {
    const [collapsed, setCollapsed] = useState(false);

    async function deleteMatricula() {
        props.deleteMatricula(props.idCliente, props.idMatricula);
    }

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

    const cardActions = (
        <CardActions disableSpacing>
            <DeleteButtonWithAlert
                handleAccept={deleteMatricula}
                alertTitle={`Está por eliminar esta matricula`}
                buttonIcon={<Delete color="secondary" />}
                alertContent="¿Seguro desea eliminarla?"
                isIconButton
            />
        </CardActions>
    );

    return (
        <Card
            sx={{ mt: 1 }}
            onMouseEnter={() => setCollapsed(true)}
            onMouseLeave={() => setCollapsed(false)}
        >
            <CardHeader
                sx={{ pb: 1 }}
                title={props.title}
                titleTypographyProps={{ variant: "h6" }}
            />
            {props.collapsable ? (
                <Collapse in={collapsed} timeout={{ enter: 300, exit: 1000 }}>
                    {cardContent}
                    {cardActions}
                </Collapse>
            ) : (
                <Fragment>
                    {cardContent}
                    {cardActions}
                </Fragment>
            )}
        </Card>
    );
}
