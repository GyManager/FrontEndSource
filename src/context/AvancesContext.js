import React, { useState, useEffect } from "react";
import { createContext } from "react";
import { useParams } from "react-router-dom";
import _ from "lodash";

import seguimientoAvancesService from "../services/seguimiento.avances.service";

export const AvancesContext = createContext();

export const AvancesProvider = ({children}) => {
    const [avanceEjercicios, setAvanceEjercicios] = useState([]);

    const { idCliente } = useParams();

    const fetchAvancesEjercicios = async () => {
        const response = await seguimientoAvancesService.getSeguimientosUsuario(idCliente);
        return _.sortBy(response, "nombre");
    };
    useEffect(() => {
        fetchAvancesEjercicios().then((response) => {
            setAvanceEjercicios(response);
        });
    }, []);


    return (
    <AvancesContext.Provider value={{
        avanceEjercicios
    }}>
    {children}
    </AvancesContext.Provider>
    )
};
