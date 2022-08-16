import * as yup from 'yup';
const currentDate = new Date();

const validationSchema = yup.object(
    {
        nombre: yup.string()
            .required('El nombre del micro plan es obligatorio'),
        rutinas: yup.array()
            .min(1, 'El micro plan debe tener al menos una rutina')
            .of(yup.object(
                {
                    nombre: yup.string()
                        .required('El nombre de la rutina es obligatorio'),
                    ejerciciosAplicados: yup.array()
                        .min(1, 'La rutina debe tener al menos un ejercicio')
                        .of(yup.object(
                            {
                                tipoEjercicio: yup.string()
                                    .required('El tipo de ejercicio es obligatorio')
                                    .typeError('El tipo de ejercicio debe ser un una cadena de texto'),
                                idEjercicio: yup.number()
                                    .required('El ejercicio es obligatorio'),
                                bloque: yup.string()
                                    .required('El bloque es obligatorio')
                                    .typeError('El bloque debe ser un una cadena de texto'),
                            }
                        ))
                }
            ))
    }
);


const microPlanSchema = {
    validationSchema
};

export default microPlanSchema;