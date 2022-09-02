import { Edit, Comment, Delete } from "@mui/icons-material";
import { Box, Button, Skeleton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, useMediaQuery } from "@mui/material";
import DeleteButtonWithAlert from "../reusable/buttons/DeleteButtonWithAlert";

const skeleton = (
    <TableRow>
        <TableCell>
            <Skeleton animation="wave" />
        </TableCell>
        <TableCell>
            <Skeleton animation="wave" />
        </TableCell>
        <TableCell>
            <Skeleton animation="wave" />
        </TableCell>
        <TableCell>
            <Skeleton animation="wave" />
        </TableCell>
    </TableRow>
);

const microPlanButtonActionsProps = {
    variant: "contained",
    size: "small",
};

export default function PlanMicroPlansTable(props) {
    const isMediumDevice = useMediaQuery('(max-width:900px');

    return (
        <TableContainer sx={{ mb: 2 }}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell> Numero </TableCell>
                        <TableCell> Nombre </TableCell>
                        <TableCell> Semanas </TableCell>
                        <TableCell>  </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {props.loading ? skeleton :
                        props.microPlans.map((microPlan, index) => (
                            <TableRow key={index}>
                                <TableCell>{index + 1}</TableCell>
                                <TableCell>{microPlan.nombre}</TableCell>
                                <TableCell>
                                    {microPlan.observaciones ? microPlan.observaciones.length : 0}
                                </TableCell>
                                <TableCell>
                                    <Box sx={{ display: "flex", gap: 2 }}>
                                        <Button
                                            {...microPlanButtonActionsProps}
                                            color="secondary"
                                            startIcon={!isMediumDevice && <Comment />}
                                            onClick={() => props.handleStartEditObservaciones(index)}
                                        >
                                            {!isMediumDevice ? "Observaciones" : <Comment />}
                                        </Button>
                                        <Button
                                            {...microPlanButtonActionsProps}
                                            startIcon={!isMediumDevice && <Edit />}
                                            onClick={() => props.handleEditMicroPlan(index)}
                                        >
                                            {!isMediumDevice ? "Editar" : <Edit />}
                                        </Button>
                                        <DeleteButtonWithAlert
                                            handleAccept={() => props.handleDeleteMicroPlan(index)}
                                            buttonProps={{...microPlanButtonActionsProps, color: "error",}}
                                            alertTitle={`Está por eliminar el micro plan ${microPlan.nombre}`}
                                            hideButtonIcon={isMediumDevice}
                                            buttonText={!isMediumDevice ? "Borrar" : <Delete />}
                                        />
                                    </Box>
                                </TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
        </TableContainer>
    );
}
