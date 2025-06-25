import React, { useRef } from 'react';
import { FormState } from '@/lib/types';
import Image from 'next/image';
import { ApiService } from '@/lib/services/api';

interface OtpProps {
    email: string;
    otp: string[];
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
    setOtp: React.Dispatch<React.SetStateAction<string[]>>;
    setCurrentForm: React.Dispatch<React.SetStateAction<FormState>>;
    setFormHistory: React.Dispatch<React.SetStateAction<FormState[]>>;
}

export default function OTP({
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    email,
    otp,
    setLoading,
    setOtp,
    setCurrentForm,
    setFormHistory
}: OtpProps) {
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

    const handleOtpChange = (index: number, value: string) => {
        if (!/^[0-9]?$/.test(value)) return;

        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        if (value && index < otp.length - 1) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Backspace" && !otp[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    function completeOtp() {
        if (otp.length === 6 && otp.every(val => /^\d$/.test(val))) {
            // console.log("true")
            return true;
        } else {
            // console.log("false")
            return false;
        }
    }

    const handleOtpSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            // Verify OTP
            await ApiService.verifyOtp({
                email: email,
                otp: otp
            });
            setCurrentForm(FormState.RESET_PASSWORD);
            setFormHistory(prev => [...prev, FormState.RESET_PASSWORD]);
        } catch (error) {
            alert(error instanceof Error ? error.message : "Invalid OTP");
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
                    Enter OTP
                </h1>

                <p className='text-[#8C8B90] mb-6'>
                    Please enter the One-Time Password (OTP) sent to your email to proceed.
                </p>

                <form onSubmit={handleOtpSubmit} className="mt-6">
                    <div className="mb-4">
                        <div className="flex justify-center space-x-2">
                            {otp.map((digit, index) => (
                                <input
                                    key={index}
                                    ref={(el) => { inputRefs.current[index] = el }}
                                    name="otp"
                                    type="text"
                                    value={digit}
                                    onChange={(e) => handleOtpChange(index, e.target.value)}
                                    onKeyDown={(e) => handleKeyDown(index, e)}
                                    maxLength={1}
                                    className="w-12 h-12 border border-gray-300 rounded-lg text-center text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-purple"
                                />
                            ))}
                        </div>
                    </div>
                    <button
                        type="submit"
                        className={`w-full py-2 px-4 ${!completeOtp() ? "bg-gray-400" : "bg-[#1639CE]"} text-white rounded-lg transition-colors cursor-pointer`}
                        disabled={!completeOtp()}
                    >
                        Proceed
                    </button>
                </form>
            </div>
        </div>
    )
}
