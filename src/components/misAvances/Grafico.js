import React from "react";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { Box } from "@mui/material";
import _ from "lodash";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: {
            display: false,
            position: "top",
        },
        title: {
            display: false,
            text: "Chart.js Line Chart",
        },
    },
};

export default function Grafico(props) {


    const anchoExpandido = props.mediciones.length * 1000 + "px";
    console.log('anchoExpandido',anchoExpandido)
    const fullAnchoExpandido = props.mediciones.length * 400 + "px";
    console.log("fullAnchoExpandido", fullAnchoExpandido);

    let mediciones = _.orderBy(props.mediciones, "fecha");

    const boxStyle = props.isFullscreenEnabled
        ? props.isExpanded
            ? 
            {width: {fullAnchoExpandido},
            height: "100%",}
            : 
            {height: "100%",}



        : props.isExpanded
        ? {
              width: {anchoExpandido} ,
              height: "100%",
          }
        : {
              height: "100%",
          };

    const labels = mediciones.map((unaMedicion) => {
        return unaMedicion.fecha;
    });

    const data = {
        labels,
        datasets: [
            {
                label: props.label,
                data: mediciones.map((unaMedicion) => {
                    return unaMedicion.valor;
                }),
                borderColor: "#BA00BA",
                backgroundColor: "rgba(255, 99, 132, 0.5)",
            },
        ],
    };

    return (
        <Box
            sx={{
                ml: 0,
                mb: 0,
                // display: "flex",
                // flexDirection: "column",
                // justifyContent:'center',
                overflowY: "clip",
                overflowX: "scroll",
                // justifyContent="flex-end" # DO NOT USE THIS WITH 'scroll'
            }}
        >
            <Box
                sx={{
                    width: props.isExpanded ? "400%" : null,
                    height: "70vh",
                }}
            >
                <Box {...boxStyle} display="flex" justifyContent="center" alignItems="center">
                    <Line options={options} data={data} />
                </Box>
            </Box>
        </Box>
    );
}
