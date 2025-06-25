"use client"
import React, { useState } from 'react';
import Image from 'next/image';
import { FormState } from '@/lib/types';
import { ErrorIcon, EyeIcon, EyeOffIcon } from "../saturn/SVG";
import { Check } from "lucide-react";

interface ResetPasswordProps {
    email: string;
    passwordData: {
        newPassword: string;
        confirmPassword: string;
    };
    otp: string[];
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
    setPasswordData: React.Dispatch<React.SetStateAction<{
        newPassword: string;
        confirmPassword: string;
    }>>;
    setCurrentForm: React.Dispatch<React.SetStateAction<FormState>>;
    setFormHistory: React.Dispatch<React.SetStateAction<FormState[]>>;
}

export default function ResetPassword({
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    email,
    passwordData,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    otp,
    setLoading,
    setPasswordData,
    setCurrentForm,
    setFormHistory
}: ResetPasswordProps) {
    const [validation, setValidation] = useState({
        hasUppercase: false,
        hasLowercase: false,
        hasSpecialChar: false,
        hasNumber: false,
        isLongEnough: false,
    });

    const [errors, setErrors] = useState({
        newPasswordError: false,
        confirmPassword: false
    });

    const [showPassword, setShowPassword] = useState(false);


    function togglePasswordVisibility() {
        setShowPassword(!showPassword);
    };

    const validatePassword = (password: string) => {
        const hasUppercase = /[A-Z]/.test(password);
        const hasLowercase = /[a-z]/.test(password);
        const hasSpecialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(
            password,
        );
        const hasNumber = /\d/.test(password);
        const isLongEnough = password.length >= 8;
        return {
            isValid:
                hasUppercase &&
                hasLowercase &&
                hasSpecialChar &&
                hasNumber &&
                isLongEnough,
            hasUppercase,
            hasLowercase,
            hasSpecialChar,
            hasNumber,
            isLongEnough,
        };
    };

    function handlePasswordResetChange(e: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = e.target;
        const newPasswordData = { ...passwordData, [name]: value };
        if (name === "newPassword") {
            const {
                isValid,
                hasUppercase,
                hasLowercase,
                hasSpecialChar,
                hasNumber,
                isLongEnough,
            } = validatePassword(value);
            setErrors((prev) => ({ ...prev, newPasswordError: !isValid }));
            setValidation({
                hasUppercase,
                hasLowercase,
                hasSpecialChar,
                hasNumber,
                isLongEnough,
            });
        }
        // Validate confirmPassword match
        if (name === "confirmPassword" || name === "newPassword") {
            const isMatching = newPasswordData.newPassword === newPasswordData.confirmPassword;
            setErrors((prev) => ({ ...prev, confirmPassword: !isMatching }));
        }

        setPasswordData(newPasswordData)
    };

    function completePasswordReset() {
        if (errors.newPasswordError || errors.confirmPassword || passwordData.newPassword === "" || passwordData.confirmPassword === "") {
            return true;
        }

        return false;
    };

    const handlePasswordReset = async (e: React.FormEvent) => {
        e.preventDefault();

        if (passwordData.newPassword !== passwordData.confirmPassword) {
            alert("Passwords don't match!");
            return;
        }

        setLoading(true);

        try {
            // Reset password
            // await ApiService.resetPassword({
            //     email: email,
            //     newPassword: passwordData.newPassword,
            //     otp: otp
            // });
            setCurrentForm(FormState.SUCCESS);
            setFormHistory(prev => [...prev, FormState.SUCCESS]);
        } catch (error) {
            alert(error instanceof Error ? error.message : "Password reset failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='flex flex-col justify-center items-center p-6 bg-[#FAFAFA] h-screen'>
            <Image
                src={"/blue-logo.svg"}
                width={156}
                height={36}
                alt='logo'
                className='mb-10'
            />

            <div className='p-6 bg-white rounded-2xl'>
                <h1 className='font-bold text-2xl mb-1'>
                    Reset Password
                </h1>

                <p className='text-[#8C8B90] mb-6'>
                    Set a new password to ensure the security of your account.
                </p>

                <form onSubmit={handlePasswordReset} className="mt-6">
                    <div className="mb-4">
                        <label className="mb-2 block text-base font-medium text-gray-800">
                            New Password
                        </label>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                name="newPassword"
                                placeholder="Enter Password"
                                className="focus:ring-[#1639CE] mb-2 w-full rounded-xl border border-gray-300 p-3 text-gray-800 focus:outline-none focus:ring-2"
                                value={passwordData.newPassword}
                                onChange={handlePasswordResetChange}
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
                        {errors.newPasswordError && (
                            <div className="flex items-center gap-1">
                                <ErrorIcon />
                                <span className="text-sm font-medium text-red-600">
                                    Password must meet criteria.
                                </span>
                            </div>
                        )}
                        <div className="mt-2 flex flex-wrap gap-2">
                            <div
                                className={`flex items-center gap-1 rounded-3xl border p-2 ${validation.isLongEnough ? "border-[#1639CE] bg-[#F3E9FF]" : "border-gray-300"}`}
                            >
                                <span
                                    className={`text-sm ${validation.isLongEnough ? "text-[#1639CE]" : "text-gray-500"}`}
                                >
                                    8 characters
                                </span>
                                <Check
                                    size={16}
                                    color={validation.isLongEnough ? "#1639CE" : "#999"}
                                />
                            </div>
                            <div
                                className={`flex items-center gap-1 rounded-3xl border p-2 ${validation.hasUppercase ? "border-[#1639CE] bg-[#F3E9FF]" : "border-gray-300"}`}
                            >
                                <span
                                    className={`text-sm ${validation.hasUppercase ? "text-[#1639CE]" : "text-gray-500"}`}
                                >
                                    Uppercase
                                </span>
                                <Check
                                    size={16}
                                    color={validation.hasUppercase ? "#1639CE" : "#999"}
                                />
                            </div>
                            <div
                                className={`flex items-center gap-1 rounded-3xl border p-2 ${validation.hasLowercase ? "border-[#1639CE] bg-[#F3E9FF]" : "border-gray-300"}`}
                            >
                                <span
                                    className={`text-sm ${validation.hasLowercase ? "text-[#1639CE]" : "text-gray-500"}`}
                                >
                                    Lowercase
                                </span>
                                <Check
                                    size={16}
                                    color={validation.hasLowercase ? "#1639CE" : "#999"}
                                />
                            </div>
                            <div
                                className={`flex items-center gap-1 rounded-3xl border p-2 ${validation.hasSpecialChar ? "border-[#1639CE] bg-[#F3E9FF]" : "border-gray-300"}`}
                            >
                                <span
                                    className={`text-sm ${validation.hasSpecialChar ? "text-[#1639CE]" : "text-gray-500"}`}
                                >
                                    Special Char
                                </span>
                                <Check
                                    size={16}
                                    color={validation.hasSpecialChar ? "#1639CE" : "#999"}
                                />
                            </div>
                            <div
                                className={`flex items-center gap-1 rounded-3xl border p-2 ${validation.hasNumber ? "border-[#1639CE] bg-[#F3E9FF]" : "border-gray-300"}`}
                            >
                                <span
                                    className={`text-sm ${validation.hasNumber ? "text-[#1639CE]" : "text-gray-500"}`}
                                >
                                    Number
                                </span>
                                <Check
                                    size={16}
                                    color={validation.hasNumber ? "#1639CE" : "#999"}
                                />
                            </div>
                        </div>
                    </div>
                    {/* Confirm Password Field */}
                    <div className="mb-4">
                        <label className="mb-2 block text-base font-medium text-gray-800">
                            Confirm Password
                        </label>
                        <input
                            type="password"
                            name="confirmPassword"
                            placeholder="Confirm Password"
                            className="focus:ring-[#1639CE] mb-2 w-full rounded-xl border border-gray-300 p-3 text-gray-800 focus:outline-none focus:ring-2"
                            value={passwordData.confirmPassword}
                            onChange={handlePasswordResetChange}
                        />
                        {errors.confirmPassword && (
                            <div className="flex items-center gap-1">
                                <ErrorIcon />
                                <span className="text-sm font-medium text-red-600">
                                    Passwords do not match.
                                </span>
                            </div>
                        )}
                    </div>
                    <button
                        type="submit"
                        className={`w-full rounded-lg py-2 text-white transition-colors ${completePasswordReset() ? "bg-[#D9D9D9]" : "bg-[#1639CE]"} cursor-pointer`}
                        disabled={completePasswordReset()}
                    >
                        Proceed
                    </button>
                </form>
            </div>
        </div>
    )
}
