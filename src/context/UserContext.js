import { createContext, useEffect, useState } from "react";
import { AxiosError } from "axios";
import clientsService from "../services/users.service";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(() => {});
    const [loadingUser, setLoadingUser] = useState(() => true);
    const [notificaciones, setNotificaciones] = useState();
    const [loadingNotificaciones, setLoadingNotificaciones] = useState(() => true);

    async function loadUserInfo() {
        setLoadingUser(true)
        const respuesta = await clientsService.getUserInfo();
        if (respuesta instanceof AxiosError) {
            console.log(respuesta);
        } else {
            setUser(respuesta);
            setLoadingUser(false)
            return respuesta;
        }
    }

    async function getUserInfo() {
        if (user !== null && user !== undefined) {
            return user;
        }
        return loadUserInfo();
    }

    async function getNotificaciones() {
        setLoadingNotificaciones(true);
        const respuesta = await clientsService.getUserNotificaciones();
        if (respuesta instanceof AxiosError) {
            console.log(respuesta);
        } else {
            setNotificaciones(respuesta);
            setLoadingNotificaciones(false);
        }
    }

    useEffect(() => {
        getNotificaciones();
    }, []);
    
    useEffect(() => {
        getUserInfo();
    }, []);

    return (
        <UserContext.Provider
            value={{
                getUserInfo,
                loadUserInfo,
                loadingUser,
                user,
                notificaciones,
                loadingNotificaciones,
            }}
        >
            {children}
        </UserContext.Provider>
    );
};
