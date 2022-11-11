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
        <GraficoContainer
            title="Estados Final de rutinas en los ultimos dias"
            maxWidth={props.maxWidth}
            link={props.link}
            hideTitle={props.hideTitle}
            containerSxOverride={props.containerSxOverride}
        >
            {props.loading ? (
                <Skeleton variant="circular" />
            ) : (
                <div style={{ position: "relative", margin: "auto", height: props.hideTitle ? "98%" : "87%" }}>
                    <Bar
                        data={data}
                        options={{
                            responsive: true,
                            maintainAspectRatio: false,
                            plugins: { legend: { display: false, position: "top" } },
                        }}
                    />
                </div>
            )}
        </GraficoContainer>
    );
}
