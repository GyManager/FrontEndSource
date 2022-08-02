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
const [data, setData] = useState(dataFixed)

    return (
        <DataContext.Provider value={{
            data,
            setData
        }}>
            { children }
        </DataContext.Provider>
    )
}