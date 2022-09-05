import { AxiosError } from "axios";
import { createContext, useEffect, useState } from "react";
import parametersService from "../services/parameter.service";

export const ParameterDropdownContext = createContext();

export const ParameterDropdownProvider = ({ children, tipoEjercicio, bloque, ejercicio, objetivo }) => {
    const [tipoEjercicios, setTipoEjercicios] = useState(() => [])
    const [bloques, setBloques] = useState(() => [])
    const [ejercicios, setEjercicios] = useState(() => [])
    const [objetivos, setObjetivos] = useState(() => [])

    useEffect(() => {
        const fetchData = async () => {
            const respuesta = await parametersService.getTipoEjercicios();
            if (respuesta instanceof AxiosError) {
                console.log(respuesta)
            } else {
                setTipoEjercicios(respuesta.sort())
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
                setBloques(respuesta.sort())
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
                const ejerciciosRespuesta = respuesta.content
                setEjercicios(ejerciciosRespuesta.sort((a,b) => a.nombre < b.nombre? -1 : 1));
            }
        }

        if(ejercicio){
            fetchData();
        }

    }, [ejercicio])

    useEffect(() => {
        const fetchData = async () => {
            const respuesta = await parametersService.getObjetivos();
            if (respuesta instanceof AxiosError) {
                console.log(respuesta)
            } else {
                setObjetivos(respuesta);
            }
        }

        if(objetivo){
            fetchData();
        }

    }, [objetivo])

    return (
        <ParameterDropdownContext.Provider value={{
            tipoEjercicios,
            bloques,
            ejercicios,
            objetivos
        }}>
            {children}
        </ParameterDropdownContext.Provider>
    )
}