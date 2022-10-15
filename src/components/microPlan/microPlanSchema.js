import * as yup from "yup";

const validationSchema = yup.object({
    nombre: yup.string().trim().required("El nombre del micro plan es obligatorio"),
    rutinas: yup
        .array()
        .min(1, "El micro plan debe tener al menos una rutina")
        .max(7, "El micro plan no puede tener mas de 7 rutinas")
        .of(
            yup.object({
                nombre: yup.string().trim().required("El nombre de la rutina es obligatorio"),
                ejerciciosAplicados: yup
                    .array()
                    .min(1, "La rutina debe tener al menos un ejercicio")
                    .of(
                        yup.object({
                            tipoEjercicio: yup
                                .string()
                                .required("El tipo de ejercicio es obligatorio")
                                .typeError("El tipo de ejercicio debe ser un una cadena de texto"),
                            idEjercicio: yup.number().required("El ejercicio es obligatorio"),
                            bloque: yup
                                .string()
                                .required("El bloque es obligatorio")
                                .typeError("El bloque debe ser un una cadena de texto"),
                            carga: yup
                                .number()
                                .nullable()
                                .typeError("La carga debe ser un numero")
                                .positive("La carga debe debe ser un valor positivo")
                                .max(9999999999, "Maximo de 10 caracteres"),
                            tiempo: yup
                                .number()
                                .nullable()
                                .typeError("El tiempo debe ser un numero")
                                .positive("El tiempo debe debe ser un valor positivo")
                                .max(9999999999, "Maximo de 10 caracteres"),
                        })
                    ),
            })
        ),
});

const microPlanSchema = {
    validationSchema,
};

export default microPlanSchema;
