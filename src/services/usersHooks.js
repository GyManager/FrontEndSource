import { useState, useEffect } from "react";
import clientsService from "./users.service";
import matriculasService from "./matriculas.service";

/*
const useFetchActiveUserInfo = () => {
    console.log('userhooks1')
    const [userInfo, setUserInfo] = useState({});
    
    useEffect(() => {
        console.log('userhooks, res: ')
        const fetchUserInfo = async () => {
            const res = await clientsService.getActiveUser();
            setUserInfo(res);
        };
        fetchUserInfo();
    },);
    return {
        userInfo,
    };
};
*/

const useFetchActiveUserInfo = () => {
    const [userInfo, setUserInfo] = useState({});
    console.log('userhooks1')
    useEffect(() => {
        console.log('userhooks2')
        const fetchUserInfo = async () => {
            const res = await clientsService.getActiveUser();
            setUserInfo(res);
        };
        fetchUserInfo();
    }, []);
    return {
        userInfo,
    };
};


const useFetchActiveUserMatriculas = (idCliente) => {
    // console.log("usersHooks: idCliente:", idCliente);
    const [matriculas, setMatriculas] = useState([]);

    useEffect(() => {
        const fetchMatriculas = async () => {
            const res = await matriculasService.getMatriculasByIdCliente(idCliente);
            setMatriculas(res);
        };

        const tieneClienteAsociado = idCliente !== undefined ? true : false;
        // console.log("usersHooks: idCliente ", idCliente);
        // console.log("usersHooks: tieneClienteAsociado ", tieneClienteAsociado);
        if (tieneClienteAsociado) {
            // console.log("usersHooks: idCliente en rama true", idCliente);
            // console.log("rama true el id deberia ser un numero: ", idCliente);
            fetchMatriculas(idCliente);
        } else {
            // console.log("usersHooks: idCliente en rama false", idCliente);
            setMatriculas("El usuario actual no tiene cliente asociado");
        }
    }, [idCliente]);
    return [ matriculas ];
};

const usersHooks = {
    useFetchActiveUserInfo,
    useFetchActiveUserMatriculas,
};

export default usersHooks;
