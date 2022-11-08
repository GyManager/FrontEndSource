import React from 'react'

function VistaInformeButtons(props) {
  return (
    <>
    <button
        onClick={() => {
            // setVisualMode(false);
            props.toggleFullscreen();
        }}
    >
        {props.isFullscreenEnabled
            ? "Cerrar Pantalla Completa"
            : "Abrir Pantalla Completa"}
    </button>
    <button
        onClick={() => {
            // setVisualMode(false);
            props.setTipoAjuste(
                props.tipoAjuste === "horizontal" ? "vertical" : "horizontal"
            );
        }}
    >
        {props.tipoAjuste === "horizontal"
            ? "Ajustar Vertical"
            : "Ajustar Horizontal"}
    </button>
    </>
  )
}

export default VistaInformeButtons