import React from 'react';
import Image from 'next/image';

export default function Success() {
    return (
        <div className='flex flex-col justify-center items-center p-6 bg-[#FAFAFA] h-screen'>
            <Image
                src={"/blue-logo.svg"}
                width={156}
                height={36}
                alt='logo'
                className='mb-10'
            />

            <div className='p-6 bg-white rounded-2xl max-w-md mx-auto'>
                <Image
                    src={"/check.svg"}
                    width={120}
                    height={120}
                    alt='success icon'
                    className='mb-10 mx-auto'
                />

                <h2 className='font-bold text-2xl mb-2.5 text-center'>
                    Password Changed Successfully
                </h2>

                <p className='text-[#606060] text-sm text-center mb-6'>
                    Your password has been updated. 
                    <br />
                    Use your new password to log in securely.
                </p>

                <button 
                    className="w-full rounded py-2 text-white bg-[#1639CE] cursor-pointer"
                    onClick={() => window.location.reload()}
                >
                    Back to Login
                </button>
            </div>
        </div>
    )
}
