import React from "react";

const Spinner = ({ show }) => {
  return (
    <>
      {show && (
        <div className="spinner-border text-primary text-center" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      )}
    </>
  );
};

export default Spinner;
