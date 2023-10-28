import React from "react";
import { Rnd } from "react-rnd";
import './drawingOverlay.css';

const DrawingOverlay = ({
  index,
  signatureSize,
  drawingData,
  handleDrawingPadResize,
  handleDrawingPadDragStop,
  handleDeleteDrawing,
}) => {
  const getDimensionsBasedOnScreenSize = () => {
    const screenWidth = window.innerWidth;

    if (screenWidth <= 768) {
      // For smaller screens (e.g., mobile)
      return {
        minWidth: 70,
        minHeight: 27,
        maxWidth: 140,
        maxHeight: 80,
      };
    } else if (screenWidth <= 1024) {
      // For medium-sized screens (e.g., tablets)
      return {
        minWidth: 50,
        minHeight: 30,
        maxWidth: 300,
        maxHeight: 150,
      };
    } else {
      // For larger screens (e.g., desktops)
      return {
        minWidth: 90,
        minHeight: 30,
        maxWidth: 350,
        maxHeight: 100,
      };
    }
  };
  const dimensions = getDimensionsBasedOnScreenSize();

  return (
    <Rnd
      size={{
        width: signatureSize[index].width,
        height: signatureSize[index].height,
      }}
      bounds="parent"
      enableResizing={{
        topRight: true,
        bottomRight: true,
        bottomLeft: true,
        topLeft: true,
      }}
      className="drawing-overlay"
      style={{
        width: signatureSize[index].width,
        height: signatureSize[index].height,
        position: "absolute",
        zIndex: "1",
        border: "1px dashed rgb(79, 78, 78)",
        boxSizing: "border-box",
        objectFit: "fill",
      }}
      minWidth={dimensions.minWidth}
      minHeight={dimensions.minHeight}
      maxWidth={dimensions.maxWidth}
      maxHeight={dimensions.maxHeight}
      onResize={(e, direction, ref, delta, position) =>
        handleDrawingPadResize(e, direction, ref, delta, position, index)
      }
      onDragStop={(e, d) => handleDrawingPadDragStop(e, d, index)}
    >
      <img
        draggable="false"
        style={{
          width: "100%",
          height: "100%",
          boxSizing: "border-box",
        }}
        src={drawingData[index + 1]}
        className="drawing-overlay"
        alt=""
      />
      <div className="drawing-actions">
        <div
          onClick={() => handleDeleteDrawing(index)}
          onTouchStart={() => handleDeleteDrawing(index)}
          className="delete-button"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 25 25"
            fill="none"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </div>
      </div>
    </Rnd>
  );
};

export default DrawingOverlay;
