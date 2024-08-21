import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
    let ngo = JSON.parse(sessionStorage.getItem("ngo"));
  if (ngo == null) {
    return <Navigate to="/loginNgo" />;
  }

  return children;
};

export default ProtectedRoute;