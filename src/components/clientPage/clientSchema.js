import * as yup from 'yup';
const nroDocTxt = 'El numero de documento '
const nomTxt = 'El nombre '
const validationSchema = yup.object({
    numeroDocumento: yup.number()
        .typeError(nroDocTxt + 'debe ser un numero')
        .positive(nroDocTxt + 'debe ser un valor positivo')
        .integer(nroDocTxt + 'debe ser un numero entero')
        .min(999999, nroDocTxt + 'debe ser tener como minimo 7 caracteres')
        .max(99999999, nroDocTxt + 'debe ser tener como maximo 8 caracteres')
        .required(nroDocTxt + 'es obligatorio'),
    nombre: yup.string()
        .required('El nombre es obligatorio')
        .max(20, 'El nombre tiene como maximo 20 caracteres'),
    apellido: yup.string()
        .required('El apellido es obligatorio'),
    mail: yup.string()
        .email('El campo debe tener un email valido')
        .required('El email es obligatorio'),

    fechaNacimiento: yup.date()
        .typeError('La fecha debe ser una fecha valida')
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
/*
    Tipo de documento: Combobox - Requerido

    Nro de documento: numerico - Requerido

    Tipo y numero de documento: combinacion unica.

    Nombre y Apellido: Texto libre - Requerido

    Fecha de nacimiento: Fecha (datepicker) - Requerido

    Email: debe ser un correo electronico valido y unico. - Requerido

    Objetivo: ComboBox - Requerido

    Numero de celular: Numerico

    Direccion: Texto libre

    Sexo: ComboBox

    Observaciones: Texto libre
    */