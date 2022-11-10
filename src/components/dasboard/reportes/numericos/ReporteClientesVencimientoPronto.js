import { AxiosError } from "axios";
import { useContext, useEffect, useState } from "react";
import { ErrorContext } from "../../../../context/ErrorContext";
import clientsServiceV2 from "../../../../services/clients.service.v2";
import dashboardService from "../../../../services/dashboard.service";
import ReporteNumerico from "./ReporteNumerico";

export default function ReporteClientesVencimientoPronto() {
    const [data, setData] = useState(() => {});
    const [loading, setLoading] = useState(() => true);
    const { processErrorMessage } = useContext(ErrorContext);

    useEffect(() => {
        async function fetchData() {
            setLoading(true);
            const response = await dashboardService.getSummary();
            if (response instanceof AxiosError) {
                processErrorMessage(response.response.data);
            } else {
                setData(response);
                setLoading(false);
            }
        }
        fetchData();
    }, []);

    async function fetchClientes(
        fuzzySearch,
        pageSize,
        page,
        matriculaVenceEn,
        matriculaVenceEnOverdue,
        sinFinalizarRutinaEn
    ) {
        return clientsServiceV2.getClients(
            fuzzySearch,
            pageSize,
            page,
            matriculaVenceEn ? matriculaVenceEn : 7,
            matriculaVenceEnOverdue ? matriculaVenceEnOverdue : 0,
            sinFinalizarRutinaEn ? sinFinalizarRutinaEn : null
        );
    }
    return (
        <ReporteNumerico
            data={loading ? null : data.cantidadClientesConMatriculaProximoVencimiento}
            loading={loading}
            title="Clientes con vencimiento de Matricula pronto"
            fetchClientes={fetchClientes}
        />
    );
}
