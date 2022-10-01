import * as yup from "yup";
const currentDate = new Date(new Date().setUTCHours(0, 0, 0, 0));

const validationSchema = yup.object({
    fechaPago: yup
        .date()
        .typeError("Seleccione una fecha valida")
        .required("La fecha de pago es obligatoria"),
    fechaInicio: yup
        .date()
        .typeError("Seleccione una fecha valida")
        .required("La fecha de inicio es obligatoria"),
    cantidadMeses: yup
        .number()
        .min(1, "La cantidad de meses de la matricula debe ser al menos 1")
        .max(
            12000,
            "La cantidad de meses de la matricula debe ser como maximo 12.000"
        ),
    cantidadDiasSemana: yup
        .number()
        .min(1, "La cantidad de dias a la semana debe ser al menos 1")
        .max(7, "La cantidad de dias a la semana debe ser como maximo 7"),
});

const matriculaSchema = {
    validationSchema,
};

export default matriculaSchema;
