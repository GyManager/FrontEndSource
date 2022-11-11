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
            setUserInfo(await res);
        };
        fetchUserInfo();
    }, []);
    return {
        userInfo,
    };
};


const usersHooks = {
    useFetchActiveUserInfo
};

export default usersHooks;
