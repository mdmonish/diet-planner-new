import React from "react";
import { useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth";
import CustomForm from "./CustomForm";

const Dashboard = () => {
  const navigate = useNavigate();
  const auth = getAuth();
  const user = auth.currentUser;

  return (
    <div className="container mx-auto p-4">
      <h1 className="mb-4 text-3xl font-bold">Dashboard</h1>
      <p>Welcome, {user.email}</p>
      <CustomForm user={user} />
      <button
        className="mt-4 rounded bg-red-500 px-4 py-2 text-white"
        onClick={() => auth.signOut()}
      >
        Logout
      </button>
    </div>
  );
};

export default Dashboard;
