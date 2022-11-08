import React, { useState, useEffect } from "react";
import { createContext } from "react";
import { useParams } from "react-router-dom";
import _ from "lodash";

import seguimientoAvancesService from "../services/seguimiento.avances.service";

export const AvancesContext = createContext();

export const AvancesProvider = ({ children }) => {
    const [avanceEjercicios, setAvanceEjercicios] = useState([]);

    const { idCliente } = useParams();
    const { idEjercicio} = useParams();
    const [ historicoEjercicio, setHistoricoEjercicio ] = useState([])

    const fetchAvancesEjercicios = async () => {
        const response = await seguimientoAvancesService.getSeguimientosUsuario(await idCliente);
        return _.sortBy(response, "nombre");
    };

    const fetchHistoricoEjercicio = async () => {
        const response = await seguimientoAvancesService.getHistoricoEjercicio(
            await idCliente,
            await idEjercicio
        );
        console.log('response', await response)
        const orderedResponse = await _.sortBy(await response, "fechaCarga");
        // setHistoricoEjercicio(await _.sortBy(await response, "fechaCarga"))
        setHistoricoEjercicio(await orderedResponse)
        // setHistoricoEjercicio('await orderedResponse')
        return;
    };

    return (
        <AvancesContext.Provider
            value={{
                idCliente,
                idEjercicio,
                historicoEjercicio,
                setHistoricoEjercicio,
                avanceEjercicios,
                setAvanceEjercicios,
                fetchAvancesEjercicios,
                fetchHistoricoEjercicio,
            }}
        >
            {children}
        </AvancesContext.Provider>
    );
};
