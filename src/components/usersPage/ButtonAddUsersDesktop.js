import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

export default function ButtonAddUsersDesktop(props) {
    const navigate = useNavigate();

    return (
        <Button
            variant="contained"
            startIcon={<AddIcon />}
            size="medium"
            onClick={() => navigate("/usuarios/new")}
        >
            Crear Usuario
        </Button>
    );
}
