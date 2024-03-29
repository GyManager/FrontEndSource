import * as yup from 'yup';

const validationSchema = yup.object(
    {
        descripcion: yup.string()
            .required('La descripcion del plan es obligatoria'),
        objetivo: yup.string()
            .required('El objetivo del plan es obligatorio'),
        fechaDesde: yup.date()
            .typeError('La fecha desde debe ser una fecha valida')
            .required('La fecha desde del plan es obligatoria'),
        microPlans: yup.array()
            .min(1, 'El plan debe tener al menos 1 micro plan asociado')
    }
);


const planSchema = {
    validationSchema
};

export default planSchema;