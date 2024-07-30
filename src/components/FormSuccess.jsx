import React from "react";
import { useNavigate } from "react-router-dom";

const FormSuccess = () => {
  const navigate = useNavigate();

  const handleBackToDashboard = () => {
    navigate("/dashboard");
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100">
      <h1 className="mb-4 text-3xl font-bold">Form Successfully Completed</h1>
      <button
        onClick={handleBackToDashboard}
        className="mt-4 rounded bg-indigo-600 px-4 py-2 text-white transition duration-300 hover:bg-indigo-700"
      >
        Back to Dashboard
      </button>
    </div>
  );
};

export default FormSuccess;
