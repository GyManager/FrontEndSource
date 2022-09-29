import * as yup from "yup";

const validationSchema = yup.object({
  nombre: yup
    .string()
    .trim()
    .required("El nombre es obligatorio")
    .max(300, "El nombre tiene como maximo 300 caracteres"),
  tipoDeEjercicio: yup
    .string()
    .typeError("El tipo de ejercicio debe ser un una cadena de texto")
    .required("El tipo de ejercicio es obligatorio"),
  linkVideo: yup
    .string()
    .url("Debe proveer una url valida para el video")
    .typeError("El link del video debe ser un link valido"),
});

const ejercicioSchema = {
  validationSchema,
};

export default ejercicioSchema;
