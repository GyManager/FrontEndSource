import * as yup from 'yup';
const nroDocTxt = 'El numero de documento '
const nomTxt = 'El nombre '
const validationSchema = yup.object({
    numeroDocumento: yup.number()
        .typeError(nroDocTxt + 'debe ser un numero')
        .required(nroDocTxt + 'es obligatorio')
        .positive(nroDocTxt + 'debe ser un valor positivo')
        .integer(nroDocTxt + 'debe ser un numero entero'),
    nombre: yup.string()
        .required('El nombre es obligatorio')
        .max(20, 'El nombre tiene como maximo 20 caracteres'),
    apellido: yup.string()
        .required('El apellido es obligatorio'),
    mail: yup.string()
        .email('El campo debe tener un email valido')
        .required('El email es obligatorio'),
    fechaNacimiento: yup.date('La fecha debe ser una fecha valida')
        .required('La fecha de nacimiento es obligatoria'),
    celular: yup.number()
    .typeError('El celular debe ser un numero'),
    observaciones: yup.string(),
    direccion: yup.string()
});


const clientSchema = {
    validationSchema
};

export default clientSchema;