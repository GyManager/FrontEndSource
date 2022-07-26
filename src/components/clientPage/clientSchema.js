import * as yup from 'yup';

const validationSchema = yup.object({
    nroDoc: yup.number()
        .required('El numero de documento es obligatorio')
        .positive('El numero de documento debe ser un valor positivo')
        .integer('El numero de documento debe ser un numero entero'),
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