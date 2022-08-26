import * as yup from 'yup';

const validationSchema = yup.object({
    nombre: yup.string()
        .required('La descripcion es obligatoria')
        .max(300, 'La descripcion tiene como maximo 300 caracteres'),
    tipoDeEjercicio: yup.string()
        .typeError('El tipo de ejercicio debe ser un una cadena de texto')
        .required('El tipo de ejercicio es obligatorio'),
    pasos: yup.array()
        .of(yup.object()
            // .shape({
            //     descripcion: yup.string().required('La descripcion del paso es obligatoria'),
            //     image: yup.string().url('Debe proveer una url valida para la imagen') })
            ),
            linkVideo: yup.string().url()
                .typeError('El link del video debe ser un link valido'),
            equipamentoDeEjercicio: yup.array().of(yup.string())

});

const ejercicioSchema = {
    validationSchema
}

export default ejercicioSchema