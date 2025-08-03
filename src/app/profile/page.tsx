'use client'

import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import toast from 'react-hot-toast';

const Page = () => {
  const router = useRouter();
  const [data, setData] = useState("nothing");

  const getUserDetails = async () => {
    try {
      const res = await axios.post("/api/users/me");
      console.log(res.data.data._id);
      setData(res.data.data._id || "No ID found");
      toast.success("User data fetched");
    } catch (error) {
      console.log(error);
      toast.error("Failed to fetch user");
    }
  };

  const logout = async () => {
    try {
      await axios.get('/api/users/logout');
      toast.success("Logout successfully");
      router.push("/login");
    } catch (error) {
      console.log(error);
      toast.error("Logout failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-6 rounded-2xl shadow-xl w-full max-w-md text-center">
        <h1 className="text-2xl font-bold mb-4">👤 Profile Page</h1>
        <hr />
        <div className="bg-gray-100 text-gray-800 p-4 rounded-md mb-4">
          <p className="text-sm">User ID:</p>
          <p className="font-mono text-blue-600 break-all">{
                data === "nothing" ? "Nothing" : <Link href={`/profile/${data}`}>test{data}</Link>
            }</p>
        </div>
        <hr />
        

        <div className="flex flex-col gap-3">
          <button
            onClick={getUserDetails}
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg transition"
          >
            Get User Details
          </button>

          <button
            onClick={logout}
            className="bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg transition"
          >
            Logout


          </button>

          
        </div>
      </div>
    </div>
  );
};

export default Page;
