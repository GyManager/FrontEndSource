import { Outlet } from "react-router-dom";
import { MiPlanProvider } from "./MiPlanContext";

export default function MiPlanContextLayout() {
    return (
        <MiPlanProvider>
            <Outlet />
        </MiPlanProvider>
    );
}
