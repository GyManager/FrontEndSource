import * as yup from 'yup';

const validationSchema = yup.object({
    nombre: yup.string()
        .required('El nombre es obligatorio'),
    apellido: yup.string()
        .required('El apellido es obligatorio'),
    observaciones: yup.string(),
    direccion: yup.string()
    });


const clientSchema = {
    validationSchema
};

export default clientSchema;