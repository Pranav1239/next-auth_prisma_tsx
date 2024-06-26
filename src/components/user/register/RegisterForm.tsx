"use client"
import React from 'react';
import { useForm } from "react-hook-form";
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Link from 'next/link';
import { signIn } from 'next-auth/react';


interface FormData {
    email: string;
    password: string;
}

const RegisterForm = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<FormData>();

    const onSubmit = async (data: FormData) => {
        try {
            const response = await axios.post('/api/register', data);
            toast.success("Registration success", { theme: "colored" })
            console.log(response.data);
        } catch (error) {
            toast.error("Not Successfully registered", { theme: "colored" })
            console.error(error);
        }
    };

    const handleGoogleSignIn = async () => {
        try {
            const response = await signIn('google', { callbackUrl: '/' });
        } catch (error) {
            toast.error("An error occurred", { theme: "colored" });
            console.error(error);
        }
    };

    return (
        <div className="flex justify-center items-center h-screen">
            <div className="bg-white p-8 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold mb-6">Register</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-gray-700 font-bold mb-2">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            {...register('email', { required: 'Email is required' })}
                        />
                        {errors.email && <span className="text-red-500">{errors.email.message}</span>}
                    </div>
                    <div className="mb-6">
                        <label htmlFor="password" className="block text-gray-700 font-bold mb-2">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            {...register('password', { required: 'Password is required' })}
                        />
                        {errors.password && <span className="text-red-500">{errors.password.message}</span>}
                    </div>
                    <div className="flex items-center justify-between">
                        <button
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        >
                            Register
                        </button>
                        <button
                            type="button"
                            onClick={handleGoogleSignIn}
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ml-4"
                        >
                            Sign in with Google
                        </button>
                    </div>
                    <div className='mt-3 flex flex-row gap-2'>
                        <h1>Already have a account?</h1>
                        <Link className='text-blue-600 font-bold' href={"/login"}>Login</Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default RegisterForm;