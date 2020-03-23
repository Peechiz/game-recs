import React from "react";
import "../assets/styles/chip.css";

const Chip = ({ children, action, isRemove, noSpan, myStyle }) => {
  return (
    <button style={myStyle} onClick={() => action()} className="btn btn-primary chip">
      <span>{children}</span>
      { !noSpan &&
        (isRemove ? 
        <span>&times;</span> :
        <span>+</span>)
      }
    </button>
  );
};

export default Chip;
