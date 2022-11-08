import { Skeleton } from "@mui/material";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import GraficoContainer from "./GraficoContainer";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function GraficoClientesPorEstados(props) {
    const data = props.loading
        ? {}
        : {
              labels: props.data.map((element) => element.clienteEstado),
              datasets: [
                  {
                      label: "Cantidad de clientes",
                      data: props.data.map((element) => element.cantidad),
                      backgroundColor: [
                          "rgba(54, 162, 235, 0.2)",
                          "rgba(255, 99, 132, 0.2)",
                          "rgba(100, 100, 100, 0.2)",
                      ],
                      borderColor: [
                          "rgba(54, 162, 235, 1)",
                          "rgba(255, 99, 132, 1)",
                          "rgba(100, 100, 100, 1)",
                      ],
                      borderWidth: 1,
                  },
              ],
          };

    return (
        <GraficoContainer title="Clientes" maxWidth={props.maxWidth} link={props.link}>
            {props.loading ? (
                <Skeleton variant="circular" height={300} width={300} />
            ) : (
                <Pie
                    data={data}
                    height={325}
                    options={{ maintainAspectRatio: false, responsive: true }}
                />
            )}
        </GraficoContainer>
    );
}
