import { createContext, useState } from "react";

//Informacion de Hardcodeada inicial
const dataFixed = ''
/*
{
    
    nombre: 'Informacion',
    edad: 'Hardcodeada Inicial'
}
*/

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