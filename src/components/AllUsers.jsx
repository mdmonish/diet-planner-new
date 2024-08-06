import React, { useEffect, useState } from "react";
import { useFirebase } from "../Firebase";
import Loader from "./Loader";

const AllUsers = () => {
  const { fetchAllUserDetails } = useFirebase();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const userDetails = await fetchAllUserDetails();
        setUsers(userDetails);
      } catch (error) {
        console.error("Error fetching all user details:", error);
      }
      setLoading(false);
    };

    fetchUsers();
  }, [fetchAllUserDetails]);

  if (loading) {
    return <Loader />;
  }

  if (users.length === 0) {
    return <p>No users found.</p>;
  }

  return (
    <div className="mt-10 overflow-x-auto rounded bg-white p-4 shadow-md">
      <h1 className="mb-4 text-2xl font-bold">All Users</h1>
      {users.map((user) => (
        <div key={user.id} className="mb-6">
          <h2 className="mb-2 text-xl font-semibold">Email: {user.email}</h2>
          <h3 className="mb-2 text-lg font-semibold">Form Responses:</h3>
          <pre className="whitespace-pre-wrap break-words rounded bg-gray-100 p-2">
            {JSON.stringify(user.formResponses, null, 2)}
          </pre>
        </div>
      ))}
    </div>
  );
};

export default AllUsers;
