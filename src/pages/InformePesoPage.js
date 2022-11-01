import React from "react";

import { Container } from "@mui/material/";
import InformeTipoMedida from "../components/misMedidas/InformeTipoMedida";

export default function InformePesoPage() {
    return (
        <Container
            fixed
            sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: { xs: "90vh", sm: "90vh", md: "82vh" },
                
            }}
        >
            <InformeTipoMedida />
        </Container>
    );
}
