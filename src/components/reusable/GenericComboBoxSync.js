import { React, useState, useEffect } from 'react'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { AxiosError } from 'axios';
import { FormHelperText } from '@mui/material';

/**
 * 
 * @param {string} label - Label for the combobox 
 * @param {string} id - id for Formik
 * @param {any} value - actual value (formik.values.<xyz>)
 * @param {function} handleChange - Function for onChange (formik.handleChange)
 * @param {boolean} editable - for making the form readOnly or not
 * @param {int} minWidth - min width for the combobox (250 recom)
 * @param {string} error - error condition  (formik.touched.<xyz> && Boolean(formik.errors.<xyz>))
 * @param {string} helperText - error or helper message  (formik.touched.<xyz> && formik.errors.<xyz>)
 * @param {function} loadData - function from which to load the data (received as array of values array items or list with .content property)
 * @param {boolean} valueAndLabel - <Optional> if we use same value for label and value or if different
 * @param {string} valueLabel - <Optional> <valueAndLabel>? property name for label for options
 * @param {string} valueId - <Optional> <valueAndLabel>? property name for value/id for options
 * @returns 
 */
export default function GenericComboBoxSync(props) {

    const [values, setValues] = useState(() => [])
    const [loadError, setLoadError] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
            setLoadError(false)
            const respuesta = await props.loadData();

            if(respuesta instanceof AxiosError){
                setLoadError(true)
            } else {
                const data = respuesta.hasOwnProperty('content') ? respuesta.content : respuesta;
                setValues(data.map(value => {
                    return {
                        id: (props.valueAndLabel ? value[props.valueId] : value),
                        label: (props.valueAndLabel ? value[props.valueLabel] : value)
                    }
                }))
            }
        }
        
        fetchData();
    }, [])
    
    const valuesJsx = values.map(value => (
        <MenuItem name={props.id} value={value.id} key={value.id}>{value.label}</MenuItem>
    ));

    return (
        <div>
            <FormControl sx={{ minWidth: props.minWidth }}>

                <InputLabel id={props.label} error={props.error || loadError}>{props.label}</InputLabel>

                <Select
                    id={props.id}
                    name={props.id}
                    labelId={props.label}
                    value={props.value}
                    onChange={props.handleChange}
                    autoWidth
                    label={props.label}
                    readOnly={props.editable ? false: true }
                    error={props.error || loadError}
                >
                    {valuesJsx}
                </Select>

                <FormHelperText error={props.error || loadError}>{props.helperText}{loadError && 'Error loading'}</FormHelperText>

            </FormControl>
        </div>
    );
}
