import React, { useEffect, useState } from "react";
import { useFirebase } from "../Firebase";
import Loader from "./Loader";

const UserDetails = ({ userId }) => {
  const { fetchUserDetails } = useFirebase();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userDetails = await fetchUserDetails(userId);
        setUser(userDetails);
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
      setLoading(false);
    };

    fetchUser();
  }, [userId, fetchUserDetails]);

  if (loading) {
    return <Loader />;
  }

  if (!user) {
    return <p>No user data available.</p>;
  }

  return (
    <div className="mt-10 overflow-x-auto rounded bg-white p-4 shadow-md">
      <h1 className="mb-4 text-2xl font-bold">Current user details:</h1>
      <h2 className="mb-2 text-xl">Email: {user.email}</h2>
      <h3 className="mb-2 text-lg font-semibold">Form Responses:</h3>
      <pre className="whitespace-pre-wrap break-words rounded bg-gray-100 p-2">
        {JSON.stringify(user.formResponses, null, 2)}
      </pre>
    </div>
  );
};

export default UserDetails;
