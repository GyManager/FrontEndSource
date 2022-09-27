import { createContext, useState } from "react";

const dataFixed = ''

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
    const [dataSnackbar, setDataSnackbar] = useState(dataFixed)

    return (
        <DataContext.Provider value={{
            dataSnackbar,
            setDataSnackbar
        }}>
            {children}
        </DataContext.Provider>
    )
}