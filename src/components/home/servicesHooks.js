import { useState, useEffect } from "react";
import userService from "../../services/users.service";

const useFetchUserInfo = () => {
    const [userInfo, setUserInfo] = useState({});

    useEffect(() => {
        const fetchUserInfo = async () => {
            const res = await userService.getActiveUser();
            setUserInfo(res);
        };
        fetchUserInfo();
    }, []);
    return {
        userInfo,
    };
};


export default useFetchUserInfo

