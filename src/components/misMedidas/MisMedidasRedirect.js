import { Fragment, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";

export default function MisPlanes() {
    const { getUserInfo } = useContext(UserContext);

    const navigate = useNavigate();

    async function redirectToUser() {
        let usuario = await getUserInfo();
        navigate(`/mis-medidas/${usuario.cliente.idCliente}`);
    }

    useEffect(() => {
        redirectToUser();
    }, []);

    return <Fragment></Fragment>;
}
