import { createContext, useContext, useEffect, useState } from "react";
import { AxiosError } from "axios";
import planesService from "../services/planes.service";
import { useParams } from "react-router-dom";
import { ErrorContext } from "./ErrorContext";

export const MiPlanContext = createContext();

export const MiPlanProvider = ({ children }) => {
    const [loading, setLoading] = useState(() => true);
    const [plan, setPlan] = useState(() => {});
    const { processErrorMessage } = useContext(ErrorContext);

    let { idPlan } = useParams();

    const getPlanById = async () => {
        setLoading(true);

        const respuesta = await planesService.getPlanById(idPlan);

        if (respuesta instanceof AxiosError) {
            processErrorMessage(respuesta.response.data, true);
        } else {
            setPlan(respuesta);
            respuesta.microPlans = respuesta.microPlans.sort(
                (a, b) => a.numeroOrden - b.numeroOrden
            );
            setLoading(false);
        }
    };

    useEffect(() => {
        getPlanById();
    }, []);

    const esCompletado = loading ? false : new Date(plan.fechaHasta) < new Date();

    return (
        <MiPlanContext.Provider
            value={{
                plan,
                loading,
                esCompletado,
                getPlanById
            }}
        >
            {children}
        </MiPlanContext.Provider>
    );
};
