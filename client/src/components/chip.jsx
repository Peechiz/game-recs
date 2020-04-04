import React from "react";
import "../assets/styles/chip.css";

const Chip = ({ children, action, isRemove, noSpan, myStyle, myClass }) => {
  return (
    <button style={myStyle} onClick={() => action && action()} className={`btn ${ myClass || 'btn-primary'} chip`}>
      {/* <div style={{ display: 'inline-block'}}>{children}</div> */}
      {children}
      { !noSpan &&
        (isRemove ? 
        <span>&times;</span> :
        <span>+</span>)
      }
    </button>
  );
};

export default Chip;
