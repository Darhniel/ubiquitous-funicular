"use client"
import { useState } from "react";
import Spinner from "../saturn/Spinner";
import { FormState } from '@/lib/types';
import ResetPassword from "./ResetPassword";
import Success from "./Success";
import OTP from "./OTP";
import ForgotPassword from "./ForgotPassword";
import Login from "./Login";

export default function LoginForm() {
    const [currentForm, setCurrentForm] = useState(FormState.LOGIN);

    const [formHistory, setFormHistory] = useState<FormState[]>([FormState.LOGIN]);

    function goBack() {
        // Create a copy of the history array
        const newHistory = [...formHistory];

        // Remove current state from history
        newHistory.pop();

        // Get previous state from history
        const previousState = newHistory[newHistory.length - 1];

        // Update both current form and history
        setCurrentForm(previousState);
        setFormHistory(newHistory);
    };

    const [loading, setLoading] = useState(false)
    const [localData, setLocalData] = useState({
        email: "",
        password: ""
    });
    const [otp, setOtp] = useState(["", "", "", "", "", ""]);
    const [passwordData, setPasswordData] = useState({
        newPassword: "",
        confirmPassword: ""
    })

    function renderForm() {
        switch (currentForm) {
            case FormState.LOGIN:
                return (
                    <Login
                        localData={localData}
                        setLocalData={setLocalData}
                        setLoading={setLoading}
                        setCurrentForm={setCurrentForm}
                        setFormHistory={setFormHistory}
                    />
                );
            case FormState.FORGOT_PASSWORD:
                return (
                    <ForgotPassword
                        localData={localData}
                        setLoading={setLoading}
                        setLocalData={setLocalData}
                        setCurrentForm={setCurrentForm}
                        setFormHistory={setFormHistory}
                    />
                );
            case FormState.OTP:
                return (
                    <OTP
                        email={localData.email}
                        otp={otp}
                        setLoading={setLoading}
                        setOtp={setOtp}
                        setCurrentForm={setCurrentForm}
                        setFormHistory={setFormHistory}
                    />
                );
            case FormState.RESET_PASSWORD:
                return (
                    <ResetPassword
                        email={localData.email}
                        passwordData={passwordData}
                        otp={otp}
                        setLoading={setLoading}
                        setPasswordData={setPasswordData}
                        setCurrentForm={setCurrentForm} setFormHistory={setFormHistory}
                    />
                );
            case FormState.SUCCESS:
                return (
                    <Success />
                )
        }
    }

    return (
        <>
            {
                loading ? (
                    <div className="mb-4">
                        <Spinner />
                    </div>
                )
                    :
                    <>
                        {renderForm()}
                        {
                            currentForm !== FormState.LOGIN && currentForm !== FormState.SUCCESS && (
                                <button
                                    onClick={goBack}
                                    className="w-full rounded-md py-2 font-medium text-white"
                                >
                                    ← Back
                                </button>
                            )
                        }
                    </>
            }
        </>
    )
}