import { React } from "react";
import { Typography } from "@mui/material";
import {ArrowRightAlt, Warning  } from "@mui/icons-material/";
import { flexbox } from "@mui/system";

const AvisoSinRegistro = (props) => {
    const textStyle = {
        variant: "b1",
        sx: {
            textAlign: "center",
        },
    };
    return (
        <>
        <Typography sx={{textAlign:'center'}}>
            <Warning fontSize="large" color='warning'/>
            </Typography>
            {props.tipo === "medidas" ? (
                <Typography {...textStyle}>
                    <p>No tenes ninguna medida registrada.</p>
                    <p>Para registrar tus medidas accede a la opcion
                    de "Mis medidas" desde la pantalla principal.</p>
                </Typography>
            ) : (
                <Typography {...textStyle}>
                <p>No tenes registrado tus avances en ningun ejercicio.</p>
                <p> Para registrar tus avances podes hacerlo desde cada rutina 
                que estes haciendo.</p>
                <p
                sx={{display:'flex', flexDirection:'row', justifyContent:'center' }}
                ><ArrowRightAlt/> Seleccionando el ejercicio</p> 
                <p><ArrowRightAlt/>Opcion "ANOTAR RESULTADOS"</p>
                </Typography>
            )}
        </>
    );
};
export default AvisoSinRegistro;
