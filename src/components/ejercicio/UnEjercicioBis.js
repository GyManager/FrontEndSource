import React, { useContext } from 'react'
import { GenericComboBox } from '../reusable'

import { ParameterDropdownContext } from "../../context/ParameterDropdownContext";

function UnEjercicioBis() {
    const { tipoEjercicios, bloques, ejercicios } = useContext(ParameterDropdownContext)
    console.log(tipoEjercicios)
    return (
        <div>
            <GenericComboBox
            label="Tipo de ejercicio"
                id="ejercicioTipoDeEjercicio"
                value='ValorSeleccionado'
                // value={"Full body"}
                // handleChange={formik.handleChange}
                // editable={editable}
                editable={true}
                valueForNone=""
                labelForNone="Seleccionar tipo de ejercicio"
                // values={["Superior", "Medio", "Inferior", "Full body"]}
                // values={['ValorSeleccionado', 'Otro Valor', 'Otro valor mas']}
                values={tipoEjercicios}
                minWidth={250} />
            
        </div>
    )
}

export default UnEjercicioBis