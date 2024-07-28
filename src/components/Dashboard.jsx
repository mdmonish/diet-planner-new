import React from "react";
import { useNavigate } from "react-router-dom";
import { useFirebase } from "../Firebase";

const Dashboard = () => {
  const navigate = useNavigate();
  const { user, logout } = useFirebase();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
    } catch (error) {
      console.error("Error logging out: ", error);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100">
      <h1 className="mb-4 text-3xl font-bold">Dashboard</h1>
      <p className="mb-4">Welcome, {user?.email}</p>
      <button
        onClick={handleLogout}
        className="rounded bg-red-500 px-4 py-2 text-white transition duration-300 hover:bg-red-600"
      >
        Logout
      </button>
    </div>
  );
};

export default Dashboard;
