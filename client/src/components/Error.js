import React from "react";
import { NavLink } from "react-router-dom";

const Error = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "85vh",
      }}
    >
      <img
        src="./404.svg"
        style={{
          width: "500px",
          marginBottom: "20px",
        }}
      />
      <h2 className="mb-3">PAGE NOT FOUND</h2>
      <NavLink to="/" className="btn btn-primary" style={{ fontSize: 18 }}>
        Back To Home Page
      </NavLink>
    </div>
  );
};

export default Error;
