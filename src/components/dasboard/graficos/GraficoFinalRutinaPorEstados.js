import { Skeleton } from "@mui/material";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import GraficoContainer from "./GraficoContainer";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function GraficoFinalRutinaPorEstados(props) {
    const data = props.loading
        ? {}
        : {
              labels: props.data.map((element) => element.descripcion),
              datasets: [
                  {
                      label: "",
                      data: props.data.map((element) => element.cantidad),
                      backgroundColor: props.data
                          .map((element) => element.color)
                          .map((color) =>
                              color == "success"
                                  ? "#2e7d32"
                                  : color == "secondary"
                                  ? "#606060"
                                  : "#d32f2f"
                          ),
                  },
              ],
          };

    return (
        <GraficoContainer title="Feedback de rutinas en los ultimos dias" maxWidth={props.maxWidth}>
            {props.loading ? (
                <Skeleton variant="circular" height={300} width={300} />
            ) : (
                <Bar
                    data={data}
                    height={325}
                    options={{
                        maintainAspectRatio: false,
                        responsive: true,
                        plugins: { legend: { display: false, position: "top" } },
                    }}
                />
            )}
        </GraficoContainer>
    );
}
