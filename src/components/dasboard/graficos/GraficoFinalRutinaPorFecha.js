import { Skeleton } from "@mui/material";
import GraficoContainer from "./GraficoContainer";
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

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export default function GraficoFinalRutinaPorFecha(props) {
    const data = props.loading
        ? {}
        : {
              labels: props.data.map((element) =>
                  new Date(element.fechaCarga).toLocaleDateString()
              ),
              datasets: [
                  {
                      label: "",
                      data: props.data.map((element) => element.cantidad),
                      borderColor: "rgb(53, 162, 235)",
                      backgroundColor: "rgba(53, 162, 235, 0.5)",
                  },
              ],
          };

    return (
        <GraficoContainer
            title="Feedback de rutinas en los ultimos dias"
            maxWidth={props.maxWidth}
            link={props.link}
        >
            {props.loading ? (
                <Skeleton variant="circular" />
            ) : (
                <div style={{ position: "relative", margin: "auto", height: "87%" }}>
                    <Line
                        data={data}
                        options={{
                            maintainAspectRatio: false,
                            responsive: true,
                            plugins: { legend: { display: false, position: "top" } },
                        }}
                    />
                </div>
            )}
        </GraficoContainer>
    );
}
