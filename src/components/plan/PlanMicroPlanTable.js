import { Edit, Comment, Delete, Visibility } from "@mui/icons-material";
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
                                        { props.editable &&
                                            <Button
                                                {...microPlanButtonActionsProps}
                                                startIcon={!isMediumDevice && <Comment />}
                                                onClick={() => props.handleStartEditObservaciones(index)}
                                            >
                                                {!isMediumDevice ? "Observaciones" : <Comment />}
                                            </Button>
                                        }
                                        <Button
                                            {...microPlanButtonActionsProps}
                                            startIcon={!isMediumDevice && (props.editable? <Edit /> : <Visibility/> )}
                                            onClick={() => props.handleEditMicroPlan(index)}
                                        >
                                            {!isMediumDevice ? props.editable? "Editar" : "Ver" : props.editable? <Edit /> : <Visibility/>}
                                        </Button>
                                        { props.editable &&
                                            <DeleteButtonWithAlert
                                                disabled={!props.editable}
                                                handleAccept={() => props.handleDeleteMicroPlan(index)}
                                                buttonProps={{...microPlanButtonActionsProps, color: "error", variant:"outlined"}}
                                                alertTitle={`Está por eliminar el micro plan ${microPlan.nombre}`}
                                                hideButtonIcon={isMediumDevice}
                                                buttonText={!isMediumDevice ? "Borrar" : <Delete />}
                                            />
                                        }
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
