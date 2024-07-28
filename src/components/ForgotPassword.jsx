// src/components/ForgotPassword.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFirebase } from "../Firebase";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
  const { resetPassword } = useFirebase();
  const navigate = useNavigate();

  const handlePasswordReset = async (e) => {
    e.preventDefault();
    if (!email) {
      setError("Please enter an email.");
      return;
    }
    try {
      await resetPassword(email);
      setMessage("Password reset email sent. Please check your inbox.");
      setTimeout(() => {
        navigate("/");
      }, 5000);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <h1 className="text-center text-3xl font-bold">Forgot Password</h1>
        {error && <div className="text-red-500">{error}</div>}
        {message && <div className="text-green-500">{message}</div>}
        <form onSubmit={handlePasswordReset} className="mt-8 space-y-6">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
          />
          <button
            type="submit"
            className="group relative flex w-full justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Reset Password
          </button>
        </form>
        <div className="mt-4 flex flex-col justify-between md:flex-row">
          <Link to="/" className="text-indigo-600 hover:text-indigo-500">
            Back to Login
          </Link>
          <Link to="/signup" className="text-indigo-600 hover:text-indigo-500">
            Don't have an account? Sign up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
