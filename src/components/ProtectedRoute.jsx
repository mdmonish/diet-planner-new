import React from "react";
import { Navigate } from "react-router-dom";
import { useFirebase } from "../Firebase";
import Loader from "./Loader";

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useFirebase();
  if (loading) {
    return <Loader />;
  }

  if (!user) {
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;
