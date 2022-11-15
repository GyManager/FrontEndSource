import { React, useState } from "react";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import AlertDialog from "../reusable/AlertDialog";

import { Add, Edit, Delete, Save, Cancel } from "@mui/icons-material/";
import { useParams } from "react-router-dom";

export default function ButtonClientMobile(props) {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const { idMedidas } = useParams();

    return (
        <>
            <SpeedDial
                ariaLabel="SpeedDial tooltip example"
                icon={<SpeedDialIcon />}
                onClose={handleClose}
                onOpen={handleOpen}
                open={open}
                sx={{
                    position: "fixed",
                    bottom: { xs: 16, md: 65, lg: 90, xl: 110 },
                    right: { xs: 16, md: 65, lg: "17vw", xl: "28vw" },
                }}
            >
                {props.editable && (
                    <SpeedDialAction
                        key="Guardar"
                        icon={<Save />}
                        tooltipTitle="Guardar"
                        onClick={() => {
                            props.handleSubmit();
                            handleClose();
                        }}
                    />
                )}
                {props.editable && (
                    <SpeedDialAction
                        key="Cancelar"
                        icon={<Cancel />}
                        tooltipTitle="Cancelar"
                        onClick={() => {
                            props.handleCancelEdit();
                            handleClose();
                        }}
                    />
                )}

                {!props.editable && (
                    <SpeedDialAction
                        key="Nuevo"
                        icon={<Add />}
                        tooltipTitle="Nuevo"
                        onClick={() => {
                            props.handleAddClick();
                            handleClose();
                        }}
                    />
                )}

                {!props.editable !== "new" && !props.editable && idMedidas!=='new' && (
                    <SpeedDialAction
                        key="Editar"
                        icon={<Edit />}
                        tooltipTitle="Editar"
                        onClick={() => {
                            props.handleEditClick();
                            handleClose();
                        }}
                    />
                )}

                {props.clienteId !== "new" && !props.editable && idMedidas!=='new' && (
                    <SpeedDialAction
                        key="Borrar"
                        icon={<Delete />}
                        tooltipTitle="Borrar"
                        onClick={props.handleDeleteClick}
                    />
                )}
            </SpeedDial>
            <AlertDialog
                open={props.openAlertDialog}
                setOpen={props.setOpenAlertDialog}
                title={"Está por eliminar las medidas de la fecha: " + props.formik.values.fecha}
                content="¿Seguro desea eliminarlas?"
                buttonTextAccept="Borrar"
                buttonTextDeny="Cancelar"
                buttonActionAccept={props.deleteMedidas}
            />
        </>
    );
}
