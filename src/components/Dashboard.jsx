// import React from "react";
// import { useNavigate } from "react-router-dom";
// import { getAuth } from "firebase/auth";
// import CustomForm from "./CustomForm";

// const Dashboard = () => {
//   const navigate = useNavigate();
//   const auth = getAuth();
//   const user = auth.currentUser;
//   console.log("Cu: ", user);

//   return (
//     <div className="container mx-auto p-4">
//       <h1 className="mb-4 text-3xl font-bold">Dashboard</h1>
//       <p>Welcome, {user.email}</p>
//       <CustomForm user={user} />
//       <button
//         className="mt-4 rounded bg-red-500 px-4 py-2 text-white"
//         onClick={() => auth.signOut()}
//       >
//         Logout
//       </button>
//     </div>
//   );
// };

// export default Dashboard;

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { useFirebase } from "../Firebase";
import CustomForm from "./CustomForm";
import Loader from "./Loader";

const Dashboard = () => {
  const navigate = useNavigate();
  const auth = getAuth();
  const user = auth.currentUser;
  const { fetchUserData } = useFirebase();
  const [isFormSubmitted, setIsFormSubmitted] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFormStatus = async () => {
      if (user) {
        const userData = await fetchUserData(user.uid);
        console.log("User on dashboard: ", userData);
        setIsFormSubmitted(userData.isFormSubmitted);
        console.log("User on dashboard after submitting form: ", userData);
      }
      setLoading(false);
    };
    fetchFormStatus();
  }, [user, fetchUserData]);

  const handleLogout = () => {
    auth.signOut();
    navigate("/");
  };

  if (loading && user) {
    return <Loader />;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="mb-4 text-3xl font-bold">Dashboard</h1>
      <p>Welcome, {user.email}</p>
      {isFormSubmitted === false ? (
        <CustomForm user={user} />
      ) : (
        <div className="mt-4 rounded-lg bg-white p-4 shadow-md">
          <p className="text-lg font-medium">
            Your form is filled and we are working on providing you with the
            best diet plan that customizes your needs. Please wait until your
            diet gets published.
          </p>
        </div>
      )}
      <button
        className="mt-4 rounded bg-red-500 px-4 py-2 text-white"
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  );
};

export default Dashboard;
