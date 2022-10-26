import * as yup from "yup";

const validationSchema = yup.object({
    fechaMedicionSeleccionada: yup.string("La fecha de medicion debe ser en formato de texto"),
    // idMedidas: "",
    fecha: yup
        .string("La fecha de medicion debe ser en formato de texto")
        .required("La fecha de medicion es obligatoria"),
    peso: yup
        .number("El peso debe ser un numero")
        .positive("El peso debe ser un valor positivo")
        .max(9999999999, "El peso tiene como maximo 10 caracteres"),
    altura: yup
        .number("La altura debe ser un numero")
        .positive("La altura debe ser un valor positivo")
        .max(9999999999, "La altura tiene como maximo 10 caracteres"),
    cervical: yup
        .number("Cervical debe ser un numero")
        .positive("Cervical debe ser un valor positivo")
        .max(9999999999, "Cervical tiene como maximo 10 caracteres"),
    dorsal: yup
        .number("Dorsal debe ser un numero")
        .positive("Dorsal debe ser un valor positivo")
        .max(9999999999, "Dorsal tiene como maximo 10 caracteres"),
    lumbar: yup
        .number("Lumbar debe ser un numero")
        .positive("Lumbar debe ser un valor positivo")
        .max(9999999999, "Lumbar tiene como maximo 10 caracteres"),
    coxalPelvica: yup
        .number("Coxal Pelvica debe ser un numero")
        .positive("Coxal Pelvica debe ser un valor positivo")
        .max(9999999999, "Coxal Pelvica tiene como maximo 10 caracteres"),
    cadera: yup
        .number("Cadera debe ser un numero")
        .positive("Cadera debe ser un valor positivo")
        .max(9999999999, "Cadera tiene como maximo 10 caracteres"),
    muslosIzq: yup
        .number("Muslo izquierdo debe ser un numero")
        .positive("Muslo izquierdo debe ser un valor positivo")
        .max(9999999999, "Muslo izquierdo tiene como maximo 10 caracteres"),
    muslosDer: yup
        .number("Muslo derecho debe ser un numero")
        .positive("Muslo derecho debe ser un valor positivo")
        .max(9999999999, "Muslo derecho tiene como maximo 10 caracteres"),
    rodillasIzq: yup
        .number("Rodilla izquierdo debe ser un numero")
        .positive("Rodilla Izquierdo debe ser un valor positivo")
        .max(9999999999, "Rodilla Izquierdo tiene como maximo 10 caracteres"),
    rodillasDer: yup
        .number("Rodilla derecha debe ser un numero")
        .positive("Rodilla derecha debe ser un valor positivo")
        .max(9999999999, "Rodilla derecha tiene como maximo 10 caracteres"),
    gemelosIzq: yup
        .number("Gemelo izquierdo debe ser un numero")
        .positive("Gemelo izquierdo debe ser un valor positivo")
        .max(9999999999, "Gemelo izquierdo tiene como maximo 10 caracteres"),
    gemelosDer: yup
        .number("Gemelo derecho debe ser un numero")
        .positive("Gemelo derecho debe ser un valor positivo")
        .max(9999999999, "Gemelo derecho tiene como maximo 10 caracteres"),
    brazoIzq: yup
        .number("Brazo izquierdo debe ser un numero")
        .positive("Brazo izquierdo debe ser un valor positivo")
        .max(9999999999, "Brazo izquierdo  tiene como maximo 10 caracteres"),
    brazoDer: yup
        .number("Brazo derecho debe ser un numero")
        .positive("Brazo derecho debe ser un valor positivo")
        .max(9999999999, "Brazo derecho tiene como maximo 10 caracteres"),
});

const medidasSchema = {
    validationSchema,
};

export default medidasSchema;
