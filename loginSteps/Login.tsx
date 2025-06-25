"use client"
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { ErrorIcon, EyeIcon, EyeOffIcon } from "../saturn/SVG";
import { FormState } from "@/lib/types";
import Link from 'next/link';
import { ApiService } from '@/lib/services/api';


interface LoginProps {
    localData: { email: string, password: string };
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
    setLocalData: React.Dispatch<React.SetStateAction<{
        email: string,
        password: string
    }>>;
    setCurrentForm: React.Dispatch<React.SetStateAction<FormState>>;
    setFormHistory: React.Dispatch<React.SetStateAction<FormState[]>>;
}

export default function Login({ localData, setLocalData, setLoading, setCurrentForm, setFormHistory }: LoginProps) {
    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState({
        emailError: false,
        passwordError: false,
    });

    useEffect(()=> {
        setLoading(false);
    }, [setLoading])

    function togglePasswordVisibility() {
        setShowPassword(!showPassword);
    };

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = e.target;
        const newLocalData = { ...localData, [name]: value };

        if (name === "email") {
            if (value.trim() === "" || !/^\S+@\S+\.\S+$/.test(value)) {
                setErrors((prev) => ({ ...prev, emailError: true }));
            } else {
                setErrors((prev) => ({ ...prev, emailError: false }));
            }
        }

        if (name === "password") {
            if (value.trim() === "" || value.length < 4) {
                setErrors({ ...errors, passwordError: true });
            } else {
                setErrors({ ...errors, passwordError: false })
            }
        }

        setLocalData(newLocalData)
    }

    function complete() {
        if (errors.emailError || errors.passwordError || localData.email === "" || localData.password === "") {
            return true;
        }

        return false;
    };

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setLoading(true);

        try {
            await ApiService.login(localData);
            window.location.href = 'https://saturnuserapp-mirror.vercel.app/dashboard';
            // Handle successful login here (e.g., redirect)
        } catch (error) {
            let errorMessage = 'An unexpected error occurred';
            if (error instanceof Error) {
                errorMessage = error.message;
            }
            alert(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='flex gap-8 items-center p-6 bg-[#FAFAFA]'>
            <div className='hidden md:block'>
                <Image
                    src={"/illustration.svg"}
                    width={630}
                    height={514}
                    alt=""
                    className="mx-auto"
                />
            </div>
            <div>
                <Link href={"/"}>
                    <Image
                        src={"/blue-logo.svg"}
                        width={156}
                        height={36}
                        alt='logo'
                        className='mb-10'
                    />
                </Link>

                <div className='p-6 bg-white rounded-2xl'>
                    <h1 className='font-bold text-2xl mb-1'>
                        Welcome Back
                    </h1>

                    <p className='text-[#8C8B90] mb-6'>
                        Log in to manage your portfolio and track your investments effortlessly.
                    </p>

                    <form onSubmit={handleSubmit}>
                        <div className='mb-6'>
                            <label htmlFor="email" className='font-medium text-[#121212] block mb-2'>
                                Email Address
                            </label>
                            <input
                                type="email"
                                name="email"
                                id="email"
                                placeholder='Enter Email Address'
                                className='p-3 rounded-lg border border-[#E7E7E7] block w-full'
                                value={localData.email}
                                onChange={handleChange}
                            />
                            {errors.emailError && (
                                <div className="flex items-center gap-1">
                                    <ErrorIcon />
                                    <span className="text-sm font-medium text-red-600">
                                        Please enter a valid email address
                                    </span>
                                </div>
                            )}
                        </div>

                        <div className='mb-6'>
                            <label htmlFor="password" className='font-medium text-[#121212] block mb-2'>
                                Password
                            </label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    id="password"
                                    placeholder='Enter your password'
                                    className='p-3 rounded-lg border border-[#E7E7E7] block w-full'
                                    value={localData.password}
                                    onChange={handleChange}
                                />
                                <button
                                    type="button"
                                    onClick={togglePasswordVisibility}
                                    className="absolute right-3 top-[45%] -translate-y-1/2"
                                    aria-label={showPassword ? "Hide password" : "Show password"}
                                >
                                    {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                                </button>
                            </div>
                            {errors.passwordError && (
                                <div className="flex items-center gap-1">
                                    <ErrorIcon />
                                    <span className="text-sm font-medium text-red-600">
                                        Incomplete password.
                                    </span>
                                </div>
                            )}
                        </div>

                        <div className='flex justify-end'>
                            <button className='text-[#0033CC] font-bold text-sm cursor-pointer'
                                onClick={() => {
                                    setLoading(true);
                                    setCurrentForm(FormState.FORGOT_PASSWORD);
                                    setFormHistory(prev => [...prev, FormState.FORGOT_PASSWORD])
                                }}
                            >
                                Forgot Password?
                            </button>
                        </div>

                        <button
                            type="submit"
                            className={`rounded-lg text-white py-4 text-center font-bold ${!complete() ? "bg-[#1639CE]" : "bg-[#B6B6B6]"} block mt-8 w-full cursor-pointer`}
                            disabled={complete()}
                        >
                            Sign In
                        </button>
                    </form>
                </div>

                <p className='text-[#414141] text-center mt-6'>
                    I don’t have an account? {" "}
                    <Link href={"/get-started"} className='font-bold underline text-[#0033cc]'>Sign Up</Link>
                </p>
            </div>
        </div>
    )
}
