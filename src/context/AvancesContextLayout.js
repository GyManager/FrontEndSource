import { Outlet } from "react-router-dom";
import { AvancesProvider } from "./AvancesContext";

export default function AvancesContextLayout() {
    return (
        <AvancesProvider>
            <Outlet />
        </AvancesProvider>
    );
}
