import React, { useRef, useContext } from "react";
import { useFullscreen } from "rooks";
import {SnackbarContext} from '../../context/SnackbarContext';

export default function UseFullscreenTest() {
  const { snackbarMessage,
    removeSnackbar,
    addSnackbar} = useContext(SnackbarContext)
  const fullscreenContainerRef = useRef(null);
  const {
    isFullscreenAvailable,
    isFullscreenEnabled,
    toggleFullscreen,
  } = useFullscreen({ target: fullscreenContainerRef });

  addSnackbar('Disponga la pantalla de forma horizontal')
  return (
    <>
      <div ref={fullscreenContainerRef}>
        {isFullscreenAvailable ? (
          <button onClick={toggleFullscreen}>
            {isFullscreenEnabled ? 'Disable fullscreen' : 'Enable fullscreen'}
          </button>
        ) : (
          <p>Fullscreen API is not available.</p>
        )}
      </div>
      <div>
       <p>Other content which won't be visible while in fullscreen mode...</p>
      </div>
    </>
  );
}