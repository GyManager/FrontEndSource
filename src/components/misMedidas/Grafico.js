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
import { faker } from "@faker-js/faker";
import { Box } from "@mui/material";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export const options = {
    responsive: true,
    plugins: {
        legend: {
            position: "top",
        },
        title: {
            display: true,
            text: "Chart.js Line Chart",
        },
    },
};

export default function Grafico(props) {
    const labels = props.mediciones.map((unaMedicion) => {
        return unaMedicion.fecha;
    });

    // const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

    const data = {
        labels,
        datasets: [
            {
                label: "Peso",
                //   data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
                data: props.mediciones.map((unaMedicion) => {
                    return unaMedicion.valor;
                }),
                borderColor: "rgb(255, 99, 132)",
                backgroundColor: "rgba(255, 99, 132, 0.5)",
            },
        ],
    };

    return (
        <Box sx={{ position: "relative" }}>
            <Box sx={{ position: "absolute", left: 0, top: 0, "pointer-events": "none" }}>
                <Box sx={{ width: "600px", height: "500px", 'overflowX': 'hide' }}>
                    <Line options={options} data={data} />;
                </Box>
            </Box>
        </Box>
    );
}
