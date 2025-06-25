"use client"
import { FormState } from "@/lib/types";
import React, { useState, useEffect } from "react";
import Image from 'next/image';
import { ErrorIcon } from "../saturn/SVG";
import { ApiService } from "@/lib/services/api";


interface ForgotPasswordProps {
    localData: { email: string, password: string };
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
    setLocalData: React.Dispatch<React.SetStateAction<{
        email: string,
        password: string
    }>>;
    setCurrentForm: React.Dispatch<React.SetStateAction<FormState>>;
    setFormHistory: React.Dispatch<React.SetStateAction<FormState[]>>;
}

export default function ForgotPassword({ localData, setLoading, setLocalData, setCurrentForm, setFormHistory }: ForgotPasswordProps) {
    const [errors, setErrors] = useState({
        emailError: false,
    });

        setLoading(false);
    

    function validateEmail(email: string) {
        return /^\S+@\S+\.\S+$/.test(email);
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

        setLocalData(newLocalData)
    }

    async function handleForgotPassword(e: React.FormEvent) {
        e.preventDefault();
        setLoading(true);

        try {
            // Call API to send OTP
            await ApiService.forgotPassword({ email: localData.email });
            setCurrentForm(FormState.OTP);
            setFormHistory(prev => [...prev, FormState.OTP]);
        } catch (error) {
            alert(error instanceof Error ? error.message : "Failed to send OTP");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col justify-center items-center p-6 bg-[#FAFAFA] h-screen">
            <Image
                src={"/blue-logo.svg"}
                width={156}
                height={36}
                alt='logo'
                className='mb-10'
            />

            <div className='p-6 bg-white rounded-2xl'>
                <h1 className='font-bold text-2xl mb-1'>
                    Forgot Password
                </h1>

                <p className='text-[#8C8B90] mb-6'>
                    Reset your password to regain access to your account securely.
                </p>

                <form onSubmit={handleForgotPassword} className="mt-6">
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

                    <button
                        type="submit"
                        className={`rounded-lg text-white py-4 text-center font-bold ${validateEmail(localData.email) ? "bg-[#1639CE]" : "bg-[#B6B6B6]"} block mt-8 w-full cursor-pointer`}
                        disabled={!validateEmail(localData.email)}
                    >
                        Proceed
                    </button>
                </form>
            </div>

            <button className='text-[#414141] font-bold text-sm cursor-pointer '
                onClick={() => {
                    setCurrentForm(FormState.LOGIN);
                    setFormHistory(prev => [...prev, FormState.LOGIN])
                }}
            >
                Back to Login
            </button>
        </div>
    )
}