import React, { useRef } from "react";
import { useFullscreen } from "rooks";

export default function UseFullscreenTest() {
  const fullscreenContainerRef = useRef(null);
  const {
    isFullscreenAvailable,
    isFullscreenEnabled,
    toggleFullscreen,
  } = useFullscreen({ target: fullscreenContainerRef });

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