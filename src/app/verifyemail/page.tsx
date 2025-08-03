'use client'

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

const Page = () => {
    const [token, setToken] = useState("")
    const [verified, setVerified] = useState(false)
    const [error, setError] =useState(false)

    const verifyUserEmail = async() =>{
        try {
            await axios.post("/api/users/verifyemail",{token})
            setVerified(true)
            
        } catch (error) {
            console.log(error);
            console.log(error,"Verify failed");
            toast.error("Verify error")
        }
    }
    useEffect(()=> {
        setError(false)
        const urlToken = window.location.search.split("=")[1]
        setToken(urlToken || "")
    }, [])

    useEffect(()=> {
        setError(false)
        if(token.length> 0){
            verifyUserEmail()
        }
    }, [token])

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
  <div className="bg-white p-6 rounded-xl shadow-md text-center space-y-4 max-w-sm w-full">
    <h1 className="text-2xl font-semibold text-gray-800">Verify Email</h1>
    
    <p className="text-sm text-gray-500">
      Token: <span className="font-mono">{token || "No token"}</span>
    </p>

    {verified && (
      <p className="text-green-600 font-medium">✅ Email verified successfully!</p>
    )}

    {error && (
      <p className="text-red-600 font-medium">❌ Verification failed.</p>
    )}

    {!verified && !error && (
      <p className="text-gray-400">⏳ Verifying...</p>
    )}
  </div>
</div>

    );
};

export default Page;