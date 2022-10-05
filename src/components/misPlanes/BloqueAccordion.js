import { ExpandMore } from "@mui/icons-material";
import { Accordion, AccordionDetails, AccordionSummary, Divider, Typography } from "@mui/material";
import EjercicioAplicadoCard from "./EjercicioAplicadoCard";

export default function BloqueAccordion(props) {
    return (
        <Accordion>
            <AccordionSummary expandIcon={<ExpandMore />}>
                <Typography variant="h6">Bloque {props.bloque}</Typography>
            </AccordionSummary>

            <Divider />

            <AccordionDetails>
                {props.ejerciciosAplicadosBloque.map((ejercicioAplicado) => (
                    <EjercicioAplicadoCard
                        {...ejercicioAplicado}
                        key={ejercicioAplicado.idEjercicioAplicado}
                        setEjercicioSeleccionado={props.setEjercicioSeleccionado}
                    />
                ))}
            </AccordionDetails>
        </Accordion>
    );
}
