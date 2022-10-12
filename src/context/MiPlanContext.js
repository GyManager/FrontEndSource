import { createContext, useEffect, useState } from "react";
import { AxiosError } from "axios";
import planesService from "../services/planes.service";
import { useParams } from "react-router-dom";

export const MiPlanContext = createContext();

export const MiPlanProvider = ({ children }) => {
    const [loading, setLoading] = useState(() => true);
    const [plan, setPlan] = useState(() => {});

    let { idPlan } = useParams();

    const getPlanById = async () => {
        setLoading(true);

        const respuesta = await planesService.getPlanById(idPlan);

        if (respuesta instanceof AxiosError) {
            console.log(respuesta); // TODO IMPROVE
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

    return (
        <MiPlanContext.Provider
            value={{
                plan,
                loading,
            }}
        >
            {children}
        </MiPlanContext.Provider>
    );
};
