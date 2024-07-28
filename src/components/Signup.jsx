// src/components/Signup.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFirebase } from "../Firebase";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();
  const { signUpWithEmail } = useFirebase();

  const handleSignup = async (e) => {
    e.preventDefault();
    if (!email) {
      setError("Please enter an email.");
      return;
    }
    if (!password) {
      setError("Please enter a password.");
      return;
    }
    try {
      await signUpWithEmail(email, password);
      setMessage(
        "Verification email sent. Please check your inbox and verify your email.",
      );
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
        <h1 className="text-center text-3xl font-bold">Signup</h1>
        {error && <div className="text-red-500">{error}</div>}
        {message && <div className="text-green-500">{message}</div>}
        <form onSubmit={handleSignup} className="mt-8 space-y-6">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
          />
          <button
            type="submit"
            className="group relative flex w-full justify-center rounded-md border border-transparent bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
          >
            Sign Up
          </button>
        </form>
        <div className="mt-4 flex flex-col justify-between md:flex-row">
          <Link to="/" className="text-indigo-600 hover:text-indigo-500">
            Already have an account? Login instead
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
