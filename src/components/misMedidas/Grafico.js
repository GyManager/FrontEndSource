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
import _ from 'lodash'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export const options = {
    responsive: true,
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


    let mediciones = _.orderBy(props.mediciones, 'fecha')
    
    const labels = mediciones.map((unaMedicion) => {
        return unaMedicion.fecha;
    });

    // const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

    const data = {
        labels,
        datasets: [
            {
                label: "Peso",
                //   data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
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
                display: "flex",
                flexDirection: "column",
                overflowY: "clip",
                overflowX: "scroll",
                // justifyContent="flex-end" # DO NOT USE THIS WITH 'scroll'
            }}
        >
            <Box
            sx={{ width: props.visualMode? "900px" : null }}
            >
                <Line options={options} data={data} />
            </Box>
        </Box>
    );
}
