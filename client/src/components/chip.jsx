import React from "react";
import "./chip.css";

const Chip = ({ children, action, isRemove }) => {
  return (
    <button onClick={() => action()} className="btn btn-primary chip">
      <span>{children}</span>
      {
        isRemove ? 
        <span>&times;</span> :
        <span>+</span>
      }
    </button>
  );
};

export default Chip;
