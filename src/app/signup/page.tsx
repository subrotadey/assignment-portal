'use client'

import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

const Page = () => {

    const router = useRouter()
    const [user, setUser] = useState({
        email: "",
        password: "",
        username: ""
    })

    const [buttonDisabled, setButtonDisabled] = useState(false)
    const [loading, SetLoading] = useState(false)

    const onSignUp = async() =>{
        try {
            SetLoading(true)
            const response = await axios.post("/api/users/signup", user)
            
            console.log("Signup successful",response.data);
            router.push("/login")
        } catch (error) {
            console.log(error);
            console.log("SignUp failed");
            toast.error("SignUp error")
        }
    }

    useEffect(()=> {
        if(user.email.length> 0 && user.password.length>0 && user.username.length>0){
            setButtonDisabled(false)
        }
        else{
            setButtonDisabled(true)
        }
    }, [user])
    return (
        <div className='flex flex-col items-center justify-center min-h-screen py-2 bg-white text-black'>
            <h1>{loading? "Processing" : " Sign Up"}</h1>
            <hr />
            <label htmlFor="username">Username</label>
            <input 
            className='p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black'
            type="text" 
            id='username' 
            value={user.username} 
            onChange={(e)=> setUser({...user, username: e.target.value})}
            placeholder='Username'
            />

            
            <hr />
            <label htmlFor="email">Username</label>
            <input 
            className='p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black'
            type="email" 
            id='email' 
            value={user.email} 
            onChange={(e)=> setUser({...user, email: e.target.value})}
            placeholder='Username'
            />


            <hr />
            <label htmlFor="password">password</label>
            <input 
            className='p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black'
            type="password" 
            id='password' 
            value={user.password} 
            onChange={(e)=> setUser({...user, password: e.target.value})}
            placeholder='password'
            />

            <button
            onClick={onSignUp} 
            className='p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600'
            >
                {buttonDisabled? "No Signup": "Sign Up"}
            </button>
            <Link href="/login"> Visit Login Page</Link>
            
        </div>
    );
};

export default Page;