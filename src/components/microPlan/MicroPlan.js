import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { Paper, Skeleton, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import microPlanesService from "../../services/micro-planes.service";
import { Breadcumbs, GenericModal } from "../reusable";
import { AxiosError } from "axios";
import Rutina from "./Rutina";

export default function MicroPlan() {

    const [loading, setLoading] = useState(false);
    const [modalMsj, setModalMsj] = useState("");

    let { idMicroPlan } = useParams();

    const [editable, setEditable] = useState(() => false);
    const [microPlan, setMicroPlan] = useState(() => ({nombre:'', rutinas: []}));

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            const respuesta = await microPlanesService.getMicroPlanById(idMicroPlan);
            setLoading(false)
            if (respuesta instanceof AxiosError) {
                console.log(respuesta)
                setModalMsj(respuesta?.message)
            } else {
                setMicroPlan(respuesta)
            }
        }
        fetchData();

    }, [idMicroPlan])

    const paperStyle = {
        elevation: 1,
        sx: { p: 2, my: 2}
    }

    return (
        <Paper sx={{p:2, gap:3, display:'flex', flexDirection:'column'}}>

            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                <Box sx={{ display: 'flex', flexDirection: 'column'}}>
                    <Breadcumbs
                        names={['Micro Planes', microPlan.nombre]}
                        urls={['../micro-planes/']}
                    />
                    <Typography sx={{ fontSize: { xs: 24, md: 30, lg: 36, xl: 40 } }}>
                        {loading ? <Skeleton/> : `Micro Plan: ${microPlan.nombre}`}
                    </Typography>
                </Box>
            </Box>

            <Paper {...paperStyle}>
                {loading? <Skeleton/> :
                <TextField 
                    label="Nombre"
                    id="nombre"
                    value={microPlan.nombre}
                    disabled={!editable}
                    variant="standard"
                    sx={{ minWidth:{ xs:'100%', md:'35%'}}}
                />}
            </Paper>

            {loading?  <Skeleton/> :
                microPlan.rutinas.map(rutina => 
                    <Rutina {...rutina} paperStyle={paperStyle} editable={editable}/>
                )
            }

            <GenericModal
                show={modalMsj !== ""}
                hide={() => setModalMsj("")}
                serverMsj={modalMsj} 
            />
        </Paper>
    )
}

