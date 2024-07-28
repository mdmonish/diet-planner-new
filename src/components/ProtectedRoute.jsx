import React from "react";
import { Navigate } from "react-router-dom";
import { useFirebase } from "../Firebase";

const ProtectedRoute = ({ children }) => {
  const { user } = useFirebase();

  if (!user) {
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;
