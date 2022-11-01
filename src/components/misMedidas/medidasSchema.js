import * as yup from "yup";
const maxTxt ='Este campo tiene como maximo 10 caracteres'
const positiveTxt = 'Este campo debe ser un valor positivo'
const onlyNumberTxt = 'Este campo solo acepta numeros'
const validationSchema = yup.object({

    medidas: yup.object({
    peso: yup
        .number()
        .positive(positiveTxt)
        .max(9999999999, maxTxt)
        .typeError(onlyNumberTxt),

    altura: yup
        .number()
        .positive(positiveTxt)
        .max(9999999999, maxTxt)
        .typeError(onlyNumberTxt),
    cervical: yup
        .number()
        .positive(positiveTxt)
        .max(9999999999, maxTxt)
        .typeError(onlyNumberTxt),
    dorsal: yup
        .number()
        .positive(positiveTxt)
        .max(9999999999, maxTxt)
        .typeError(onlyNumberTxt),
    lumbar: yup
        .number()
        .positive(positiveTxt)
        .max(9999999999, maxTxt)
        .typeError(onlyNumberTxt),
    coxalPelvica: yup
        .number()
        .positive(positiveTxt)
        .max(9999999999, maxTxt)
        .typeError(onlyNumberTxt),
    cadera: yup
        .number()
        .positive(positiveTxt)
        .max(9999999999, maxTxt)
        .typeError(onlyNumberTxt),
    muslosIzq: yup
        .number()
        .positive(positiveTxt)
        .max(9999999999, maxTxt)
        .typeError(onlyNumberTxt),
    muslosDer: yup
        .number()
        .positive(positiveTxt)
        .max(9999999999, maxTxt)
        .typeError(onlyNumberTxt),
    rodillasIzq: yup
        .number()
        .positive(positiveTxt)
        .max(9999999999, maxTxt)
        .typeError(onlyNumberTxt),
    rodillasDer: yup
        .number()
        .positive(positiveTxt)
        .max(9999999999, maxTxt)
        .typeError(onlyNumberTxt),
    gemelosIzq: yup
        .number()
        .positive(positiveTxt)
        .max(9999999999, maxTxt)
        .typeError(onlyNumberTxt),
    gemelosDer: yup
        .number()
        .positive(positiveTxt)
        .max(9999999999, maxTxt)
        .typeError(onlyNumberTxt),
    brazoIzq: yup
        .number()
        .positive(positiveTxt)
        .max(9999999999, maxTxt)
        .typeError(onlyNumberTxt),
    brazoDer: yup
        .number()
        .positive(positiveTxt)
        .max(9999999999, maxTxt)
        .typeError(onlyNumberTxt),
    })
}
);

const medidasSchema = {
    validationSchema,
};

export default medidasSchema;
