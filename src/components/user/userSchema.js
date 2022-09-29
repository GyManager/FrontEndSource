import * as yup from "yup";
const nroDocTxt = "El numero de documento ";

const validationSchema = yup.object({
    tipoDocumento: yup
        .string()
        .typeError("El tipo de documento debe ser un una cadena de texto")
        .required("El tipo de documento es obligatorio"),
    numeroDocumento: yup
        .number()
        .typeError(nroDocTxt + "debe ser un numero")
        .positive(nroDocTxt + "debe ser un valor positivo")
        .integer(nroDocTxt + "debe ser un numero entero")
        .min(999999, nroDocTxt + "debe ser tener como minimo 7 caracteres")
        .max(
            999999999999,
            nroDocTxt + "debe ser tener como maximo 12 caracteres"
        )
        .required(nroDocTxt + "es obligatorio"),
    nombre: yup
        .string()
        .required("El nombre es obligatorio")
        .max(50, "El nombre tiene como maximo 50 caracteres")
        .matches(/^[^0-9]+$/, "El nombre no puede tener numeros"),
    apellido: yup
        .string()
        .required("El apellido es obligatorio")
        .max(50, "El apellido tiene como maximo 50 caracteres")
        .matches(/^[^0-9]+$/, "El apellido no puede tener numeros"),
    mail: yup
        .string()
        .email("El campo debe tener un email valido")
        .required("El email es obligatorio")
        .max(100, "El email tiene como maximo 100 caracteres"),
    celular: yup
        .number()
        .typeError("El celular debe ser un numero")
        .max(999999999999999, "El celular tiene como maximo 15 caracteres"),
});

const clientSchema = {
    validationSchema,
};

export default clientSchema;
