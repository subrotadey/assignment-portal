'use client'

import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

const Page = () => {

    const router = useRouter()
    const [user, setUser] = useState({
        email: "",
        password: ""
    })

    const [buttonDisabled, setButtonDisabled] = useState(false)
    const [loading, SetLoading] = useState(false)

    const onLogin = async() =>{
        try {
            SetLoading(true)
            const response = await axios.post("/api/users/login", user)
            
            console.log("Login successful",response.data);
            router.push("/profile")
        } catch (error) {
            console.log(error);
            console.log("Login failed");
            toast.error("Login error")
        }
    }

    useEffect(()=> {
        if(user.email.length> 0 && user.password.length>0){
            setButtonDisabled(false)
        }
        else{
            setButtonDisabled(true)
        }
    }, [user])
    return (
        <div className='flex flex-col items-center justify-center min-h-screen py-2 bg-white text-black'>
            <h1>{loading? "Processing" : "Login"}</h1>
            <hr />
            <label htmlFor="email">Email</label>
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
            onClick={onLogin} 
            className='p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600'
            >
                {buttonDisabled? "No Login": "Log In"}
            </button>
            <Link href="/signup"> Visit SignUP Page</Link>
            
        </div>
    );
};

export default Page;