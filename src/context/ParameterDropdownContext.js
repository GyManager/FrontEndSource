import { AxiosError } from "axios";
import { createContext, useEffect, useState } from "react";
import parametersService from "../services/parameter.service";

export const ParameterDropdownContext = createContext();

export const ParameterDropdownProvider = ({ children, tipoEjercicio, bloque, ejercicio }) => {
    const [tipoEjercicios, setTipoEjercicios] = useState(() => [])
    const [bloques, setBloques] = useState(() => [])
    const [ejercicios, setEjercicios] = useState(() => [])

    useEffect(() => {
        const fetchData = async () => {
            const respuesta = await parametersService.getTipoEjercicios();
            if (respuesta instanceof AxiosError) {
                console.log(respuesta)
            } else {
                setTipoEjercicios(respuesta)
            }
        }

        if(tipoEjercicio){
            fetchData();
        }

    }, [tipoEjercicio])

    useEffect(() => {
        const fetchData = async () => {
            const respuesta = await parametersService.getBloques();
            if (respuesta instanceof AxiosError) {
                console.log(respuesta)
            } else {
                setBloques(respuesta)
            }
        }

        if(bloque){
            fetchData();
        }

    }, [bloque])

    useEffect(() => {
        const fetchData = async () => {
            const respuesta = await parametersService.getEjercicios();
            if (respuesta instanceof AxiosError) {
                console.log(respuesta)
            } else {
                setEjercicios(respuesta.content)
            }
        }

        if(bloque){
            fetchData();
        }

    }, [ejercicio])

    return (
        <ParameterDropdownContext.Provider value={{
            tipoEjercicios,
            bloques,
            ejercicios
        }}>
            {children}
        </ParameterDropdownContext.Provider>
    )
}