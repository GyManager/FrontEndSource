import { createContext, useState } from "react";
import { AxiosError } from "axios";
import clientsService from "../services/users.service";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState();

    async function getUserInfo() {
        if (user !== null && user !== undefined) {
            return user;
        }
        const respuesta = await clientsService.getUserInfo();
        if (respuesta instanceof AxiosError) {
            console.log(respuesta);
        } else {
            setUser(respuesta);
            return respuesta;
        }
    }

    return (
        <UserContext.Provider
            value={{
                getUserInfo,
            }}
        >
            {children}
        </UserContext.Provider>
    );
};
