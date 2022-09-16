import { createContext, useState } from "react";

//Informacion de Hardcodeada inicial
const dataFixed = ''

export const UsersContext = createContext();

export const UsersProvider = ({ children }) => {
    const [dataSnackbar, setDataSnackbar] = useState(dataFixed)

    return (
        <UsersContext.Provider value={{
            dataSnackbar,
            setDataSnackbar
        }}>
            {children}
        </UsersContext.Provider>
    )
}