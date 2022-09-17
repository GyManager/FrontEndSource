import * as yup from 'yup';
const nroDocTxt = 'El numero de documento '
const currentDate = new Date();

const validationSchema = yup.object({
    tipoDocumento: yup.string()
        .typeError('El tipo de documento debe ser un una cadena de texto')
        .required('El tipo de documento es obligatorio'),
    numeroDocumento: yup.number()
        .typeError(nroDocTxt + 'debe ser un numero')
        .positive(nroDocTxt + 'debe ser un valor positivo')
        .integer(nroDocTxt + 'debe ser un numero entero')
        .min(999999, nroDocTxt + 'debe ser tener como minimo 7 caracteres')
        .max(999999999999, nroDocTxt + 'debe ser tener como maximo 12 caracteres')
        .required(nroDocTxt + 'es obligatorio'),
    nombre: yup.string()
        .required('El nombre es obligatorio')
        .max(50, 'El nombre tiene como maximo 50 caracteres')
        .matches(/^[^0-9]+$/, 'El nombre no puede tener numeros')
    ,
    apellido: yup.string()
        .required('El apellido es obligatorio')
        .max(50, 'El apellido tiene como maximo 50 caracteres')
        .matches(/^[^0-9]+$/, 'El nombre no puede tener numeros'),
    mail: yup.string()
        .email('El campo debe tener un email valido')
        .required('El email es obligatorio')
        .max(100, 'El email tiene como maximo 100 caracteres'),
    fechaNacimiento: yup.date()
        .typeError('Seleccione una fecha valida')
        .required('La fecha de nacimiento es obligatoria')
        .max(currentDate, 'La fecha no puede ser posterior a la fecha actual'),
    sexo: yup.string(),
    celular: yup.number()
        .typeError('El celular debe ser un numero')
        .max(999999999999999, 'El celular tiene como maximo 15 caracteres'),
    direccion: yup.string()
        .max(255, 'Las direccion tienen como maximo 255 caracteres'),
    objetivo: yup.string()
        .required('El objetivo es obligario'),
    observaciones: yup.string()
        .max(255, 'Las observaciones tienen como maximo 255 caracteres'),
});


const clientSchema = {
    validationSchema
};

export default clientSchema;