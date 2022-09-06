import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
// import { useMediaQuery } from '@mui/material';

export default function ButtonAddClientDesktop(props) {
    const navigate = useNavigate();

    return (
        <Button
            variant="contained"
            startIcon={<AddIcon />}
            size="medium"
            onClick={() => navigate("/clientes/new")}
        >
            Crear Cliente
        </Button>
    );
}
