"use client";
// import { useSearchParams } from 'next/navigation';
import { useState } from "react";
import Image from 'next/image';
import { ArrowUpTrayIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import Notifications from "@/components/dashboard/Notification";
import { InvestmentFormOne, InvestmentFormThree, InvestmentFormTwo } from "@/components/dashboard/InvestmentForm";
import { InvestmentType } from "@/lib/types";

export default function WithdrawalPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [fundStep, setFundStep] = useState(1);
    const [investmentData, setInvestmentData] = useState<InvestmentType>({
        isFund: false,
        withdrawalMethod: "",
        bankName: "",
        accountNumber: "",
        cryptoType: "",
        networkType: "",
        walletAddress: "",
    });

    async function handleNext(stepData: Partial<InvestmentType>) {
        setInvestmentData((prev) => ({ ...prev, ...stepData }));

        setFundStep(fundStep + 1);
    }

    const renderFundStep = () => {
        switch (fundStep) {
            case 1:
                return <InvestmentFormOne data={investmentData} onNext={handleNext} setInvestmentData={setInvestmentData} setFundStep={setFundStep} />;
            case 2:
                return <InvestmentFormTwo data={investmentData} onNext={handleNext} setInvestmentData={setInvestmentData} setFundStep={setFundStep} />;
            case 3:
                return <InvestmentFormThree data={investmentData} onNext={handleNext} setInvestmentData={setInvestmentData} setFundStep={setFundStep} />;
            default:
                return null;
        };
    };

    return (
        <div className="p-6">
            <header className="mb-6">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-semibold text-[#101010] hidden md:block">
                        WIthdrawal Method
                    </h1>
                    <Image
                        src={"/images/dashboard/logos.svg"}
                        width={112}
                        height={26}
                        alt=""
                        className="md:hidden"
                    />

                    <div className="hidden lg:flex gap-3">
                        <Notifications />

                        <div className="flex items-center ml-4 space-x-2">
                            <div className="h-10 w-10 bg-gray-400 rounded-full flex items-center justify-center">
                                {/* Replace with <img> if you have a real avatar */}
                                <div className="bg-[#CCC1F0] rounded-full">
                                    <Image
                                        src={"/images/dashboard/avatar.png"}
                                        width={40}
                                        height={40}
                                        alt=""
                                    />
                                </div>
                            </div>
                            <div>
                                <p className="font-medium text-sm">Sandra Vivian</p>
                                <p className="text-xs text-gray-500">devign@gmail.com</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="lg:flex items-center justify-center lg:justify-between">
                    <div className="relative hidden lg:block mb-6 md:mb-0">
                        {/* <FaSearch className="absolute left-3 top-3 text-gray-400" /> */}
                        <div className="w-6 h-6 absolute left-2 top-2">
                            <MagnifyingGlassIcon
                                width={20}
                                height={20}
                            />
                        </div>
                        <input
                            type="text"
                            placeholder="Search anything here"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-10 pr-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500 bg-[#F7F9FC]"
                        />
                    </div>

                    <div className="hidden md:flex gap-3">
                        <button className="px-6 py-2 bg-white rounded-xl border border-[#D6D6D6] text-base font-medium text-[#101010] flex items-center gap-2">
                            <ArrowUpTrayIcon
                                width={24}
                                height={24}
                                className="w-4 h-4 md:w-5 md:h-5 md:mb-1"
                            />
                            Export
                        </button>
                    </div>
                </div>
            </header>

            <div className="border border-[#E7E7E7] p-7">
                <div className='max-w-80'>
                    <h2 className='text-[#101928] text-xl mb-4'>
                        Withdrawal Method
                    </h2>
                    <p className='text-[#3D3A43]'>
                        Manage your connected bank accounts and crypto wallets for seamless withdrawals.
                    </p>
                </div>

                <div className="flex flex-1 justify-center items-center">
                    <div className="flex flex-col justify-center items-center gap-6 max-w-[15rem]">
                        <div className="flex flex-col items-center mt-12">
                            <Image
                                width={202}
                                height={180}
                                src={"/images/dashboard/bank.svg"}
                                alt={"No bank added"}
                            />
                            <p className="text-xs text-[#667185] text-center">
                                You haven’t added a bank account yet. Once you link your bank, it will appear here for seamless transactions.
                            </p>
                        </div>
                        <button
                            className="bg-[#8627FF] text-white p-2 border-0 rounded-md w-full"
                            onClick={() => setInvestmentData({ ...investmentData, isFund: true })}
                        >
                            Add Bank
                        </button>
                    </div>
                </div>
            </div>

            {
                investmentData.isFund &&
                renderFundStep()
            }
        </div>
    )
}