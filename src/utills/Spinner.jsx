import React from "react";

const Spinner = () => {
  return (
    <div className="container-fluid gradient-custom d-flex justify-content-center align-items-center">
      <div className="spinner-border text-dark" style={{ width: "3.5rem", height: "3.5rem" }} role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
};

export default Spinner;
