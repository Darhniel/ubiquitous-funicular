"use client";
import { useState } from "react";
import Image from "next/image";
import { EyeIcon, EyeOffIcon, CopyIcon } from "@/components/saturn/SVG";
import { ArrowUpTrayIcon, PlusIcon, ReceiptPercentIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import Notifications from '@/components/dashboard/Notification';
import DateRangePicker from "@/components/dashboard/DatePicker";
import { Earning, EarningsTable } from "@/components/earnings-table";
import { ReInvestDataType, WithdrawalDataType } from "@/lib/types";
import { ReinvestFormOne, ReinvestFormTwo, ReinvestFormThree } from "@/components/dashboard/ReInvestForm";
import { WithdrawalFormOne, WithdrawalFormTwo, WithdrawalFormThree, WithdrawalFormFour, WithdrawalFormFive } from "@/components/dashboard/WithdrawalForm";
import { EarningDetailsModal } from '@/components/earnings-table-modal';
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
    PieChart,
    Pie,
    Cell,
    ResponsiveContainer,
    Tooltip,
} from "recharts";

const data = [
    { name: "BTC Fund", value: 55, color: "#A259FF" },
    { name: "Specialised AI Fund", value: 35, color: "#FFD25F" },
    { name: "Varied Asset Fund", value: 10, color: "#4CE364" },
];

const sampleData = [
    {
        type: "Bitcoin Trust Funds",
        amountInvested: 500000,
        earnings: 5000,
        roi: 8.5,
        maturityDate: new Date("2026-06-30"),
        status: "Withdrawn",
        startDate: new Date("2025-03-25"),
        totalEarnings: 20000,
        returnRate: 12,
        earningsWithdrawn: 12000,
        recentInvestments: [
            {
                amountInvested: 500000,
                totalEarning: 500000,
                date: new Date("2025-01-25"),
                status: "Withdrawn"
            },
        ]
    },
    {
        type: "Bitcoin Trust Funds",
        amountInvested: 500000,
        earnings: 5000,
        roi: 8.5,
        maturityDate: new Date("2026-03-25"),
        status: "Completed",
        startDate: new Date("2025-03-25"),
        totalEarnings: 20000,
        returnRate: 12,
        earningsWithdrawn: 12000,
        recentInvestments: [
            {
                amountInvested: 500000,
                totalEarning: 500000,
                date: new Date("2025-01-25"),
                status: "Withdrawn"
            },
        ]
    },
    {
        type: "Bitcoin Trust Funds",
        amountInvested: 500000,
        earnings: 5000,
        roi: 8.5,
        maturityDate: new Date("2024-06-30"),
        status: "Re-Invested",
        startDate: new Date("2025-03-25"),
        totalEarnings: 20000,
        returnRate: 12,
        earningsWithdrawn: 12000,
        recentInvestments: [
            {
                amountInvested: 500000,
                totalEarning: 500000,
                date: new Date("2025-01-25"),
                status: "Withdrawn"
            },
        ]
    },
    {
        type: "Bitcoin Trust Funds",
        amountInvested: 500000,
        earnings: 5000,
        roi: 8.5,
        maturityDate: new Date("2024-06-30"),
        status: "Pending",
        startDate: new Date("2025-03-25"),
        totalEarnings: 20000,
        returnRate: 12,
        earningsWithdrawn: 12000,
        recentInvestments: [
            {
                amountInvested: 500000,
                totalEarning: 500000,
                date: new Date("2025-01-25"),
                status: "Withdrawn"
            },
        ]
    },
];

export default function DashboardPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedInvestment, setSelectedInvestment] = useState<Earning | null>(null)
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isAmountVisible, setIsAmountVisible] = useState(false);
    const [modal, setModal] = useState(false);
    const [reinvestStep, setReinvestStep] = useState(1);
    const [withdrawalStep, setWithdrawalStep] = useState(1);

    const [reinvestData, setReinvestData] = useState<ReInvestDataType>({
        investmentPlan: "",
        investmentAmount: "",
        isReinvest: false
    });
    const handleTopUp = (investment: Earning) => {
        setReinvestData(prev => ({
            ...prev,
            isReinvest: true,
            investmentAmount: investment.totalEarnings.toString(),
            investmentPlan: investment.type
        }))
    };

    const [withdrawalData, setWithdrawalData] = useState<WithdrawalDataType>({
        investmentPlan: "",
        withdrawalAmount: "",
        isWithdrawal: false,
        bankName: "",
        accountName: "",
        accountNumber: ""
    });
    const handleWithdrawalPayout = (investment: Earning) => {
        setWithdrawalData(prev => ({
            ...prev,
            isWithdrawal: true,
            withdrawalAmount: investment.totalEarnings.toString()
        }))
    }

    async function handleReinvestNext(stepData: Partial<ReInvestDataType>) {
        setReinvestData((prev) => ({ ...prev, ...stepData }));

        setReinvestStep(reinvestStep + 1);
    }

    async function handleWithdrawalNext(stepData: Partial<WithdrawalDataType>) {
        setWithdrawalData((prev) => ({ ...prev, ...stepData }));

        setWithdrawalStep(withdrawalStep + 1);
    }

    const renderReinvestStep = () => {
        switch (reinvestStep) {
            case 1:
                return <ReinvestFormOne data={reinvestData} onNext={handleReinvestNext} setReinvestData={setReinvestData} setReinvestStep={setReinvestStep} />;
            case 2:
                return <ReinvestFormTwo data={reinvestData} onNext={handleReinvestNext} setReinvestData={setReinvestData} setReinvestStep={setReinvestStep} />;
            case 3:
                return <ReinvestFormThree data={reinvestData} onNext={handleReinvestNext} setReinvestData={setReinvestData} setReinvestStep={setReinvestStep} />;
            default:
                return null;
        };
    };

    const renderWithdrawalStep = () => {
        switch (withdrawalStep) {
            case 1:
                return <WithdrawalFormOne data={withdrawalData} onNext={handleWithdrawalNext} setWithdrawalData={setWithdrawalData} setWithdrawalStep={setWithdrawalStep} />;
            case 2:
                return <WithdrawalFormTwo data={withdrawalData} onNext={handleWithdrawalNext} setWithdrawalData={setWithdrawalData} setWithdrawalStep={setWithdrawalStep} />;
            case 3:
                return <WithdrawalFormThree data={withdrawalData} onNext={handleWithdrawalNext} setWithdrawalData={setWithdrawalData} setWithdrawalStep={setWithdrawalStep} />;
            case 4:
                return <WithdrawalFormFour data={withdrawalData} onNext={handleWithdrawalNext} setWithdrawalData={setWithdrawalData} setWithdrawalStep={setWithdrawalStep} />;
            case 5:
                return <WithdrawalFormFive data={withdrawalData} onNext={handleWithdrawalNext} setWithdrawalData={setWithdrawalData} setWithdrawalStep={setWithdrawalStep} />;
            default:
                return null;
        };
    };


    function DetailRow({ label, value, icon }: { label: string, value: string, icon?: boolean }) {
        return (
            <div className="flex justify-between text-sm text-black mb-4">
                <span className="">{label}</span>
                <span className={`flex gap-2 items-center ${label === "Transaction ID" ? "font-bold text-[#8627FF] text-base" : "font-semibold"}`}>
                    {value}
                    {
                        icon && <CopyIcon />
                    }
                </span>
            </div>
        );
    }

    const amount = 50000;
    const nairaAmount = amount * 1505;

    return (
        <div className="p-6">
            <header className="mb-6">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-semibold text-[#101010] hidden md:block">
                        Earnings & Returns
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
                    <div className="relative lg:block mb-6 md:mb-0">
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
                            className="pl-10 pr-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500 bg-[#F7F9FC] w-full"
                        />
                    </div>

                    <div className="flex gap-4 justify-between md:justify-center mt-4 lg:mt-0">
                        <button className="px-2 lg:px-6 py-2 bg-white rounded-xl border border-[#D6D6D6] text-xs lg:text-base font-medium text-[#101010] flex items-center gap-1">
                            <ArrowUpTrayIcon
                                width={24}
                                height={24}
                                className="w-4 h-4 md:w-5 md:h-5 md:mb-1"
                            />
                            Export
                        </button>

                        <button className="px-2 lg:px-6 py-2 rounded-xl bg-gradient-to-b from-[#8627FF] to-[#3F1574] text-white text-xs lg:text-base font-medium flex items-center gap-1">
                            <PlusIcon
                                width={24}
                                height={24}
                                className="w-4 h-4 md:w-5 md:h-5 md:mb-1"
                            />
                            Fund Investment
                        </button>
                    </div>
                </div>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                <div className="bg-white  bg-[url('/images/dashboard/background.png')] bg-cover rounded-2xl p-6 flex justify-center items-center flex-col border border-[#EBEBEB]">
                    <DateRangePicker />

                    <p className="text-[#8C8B90] text-xl font-semibold">
                        Total Amount Invested
                    </p>
                    <div className="flex gap-2 items-baseline mb-4">
                        <span className="text-2xl font-semibold">
                            {isAmountVisible ? `$${amount.toLocaleString()}` : "*******"}
                        </span>
                        <div onClick={() => setIsAmountVisible(!isAmountVisible)} className="cursor-pointer">
                            {
                                isAmountVisible ? <EyeOffIcon /> : <EyeIcon />
                            }
                        </div>
                    </div>

                    <span className="text-xl font-medium text-[#5D5C63]">
                        {isAmountVisible ? `≈ ₦${nairaAmount.toLocaleString()}` : "***********"}
                    </span>
                </div>

                {/* Right Card: Investment Value (chart placeholder) */}
                <Card className="rounded-2xl shadow-sm">
                    <CardContent className="p-6">
                        <Tabs defaultValue="overview">
                            <TabsList className="grid w-full grid-cols-2 mb-4">
                                <TabsTrigger value="overview" className="rounded-none border-b-2 data-[state=active]:border-[#8627FF] data-[state=active]:bg-transparent data-[state=active]:rounded-none data-[state=active]:shadow-none data-[state=active]:text-[#8627FF]">
                                    Overview
                                </TabsTrigger>
                                <TabsTrigger value="btc" className="text-muted-foreground">
                                    BTC Price
                                </TabsTrigger>
                            </TabsList>
                        </Tabs>

                        <div className="flex items-center gap-6 flex-col md:flex-row">
                            <div className="w-[120px] h-[120px]">
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie
                                            data={data}
                                            innerRadius={40}
                                            outerRadius={60}
                                            dataKey="value"
                                            stroke="none"
                                        >
                                            {data.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={entry.color} />
                                            ))}
                                        </Pie>
                                        <Tooltip formatter={(value) => `${value}%`} />
                                    </PieChart>
                                </ResponsiveContainer>
                            </div>

                            <div className="flex flex-col gap-3 text-sm">
                                {data.map((item, index) => (
                                    <div key={index} className="flex items-center justify-between w-[14rem]">
                                        <div className="flex items-center gap-2">
                                            <span
                                                className="w-3 h-3 rounded-full"
                                                style={{ backgroundColor: item.color }}
                                            />
                                            <span>{item.name}</span>
                                        </div>
                                        <span className="font-medium">{item.value}%</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <div className="bg-white rounded border border-[#EBEBEB] p-4 mb-6">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-semibold">Recent Investments</h2>
                    {/* “Show” dropdown, search, or any other filter */}
                    <div className="flex items-center space-x-2 text-sm">
                        <span className="text-gray-500">Show:</span>
                        <select className="border border-gray-300 rounded px-2 py-1 focus:outline-none">
                            <option>5</option>
                            <option>10</option>
                            <option>25</option>
                        </select>
                    </div>
                </div>

                <EarningsTable
                    data={sampleData}
                    onViewDetails={(investment) => {
                        setSelectedInvestment(investment)
                        setIsModalOpen(true)
                    }}
                    onTopUp={handleTopUp}
                    onRequest={handleWithdrawalPayout}
                />

                <EarningDetailsModal
                    investment={selectedInvestment}
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                />
            </div>

            {
                modal &&
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 mt-0 overflow-y-scroll"
                    onClick={() => setModal(false)}
                >
                    <div
                        className="w-full mx-auto max-w-[21rem] md:max-w-sm xl:max-w-[30rem] bg-white rounded-2xl shadow-md p-6 text-center"
                        onClick={(e) => { e.stopPropagation() }}
                    >
                        {/* Icon */}
                        <div className="p-4 w-fit mx-auto my-4 bg-[#F3E9FF] rounded-full">
                            <ReceiptPercentIcon
                                color="#8627FF"
                                width={24}
                                height={24}
                            />
                        </div>

                        <h1 className="text-xl font-bold text-center text-[#1C1B1F]">Transaction Details</h1>
                        <p className="text-sm text-center text-[#8C8B90] mt-2">
                            View a detailed breakdown of your transaction.
                        </p>

                        {/* Amount */}
                        <div className="mt-6 text-3xl font-bold text-gray-800">$50,000</div>

                        {/* Details Card */}
                        <div className="border border-gray-200 rounded-xl p-4 mt-6 space-y-2 text-left">
                            <DetailRow label="Transaction ID" value="TRX-20250115-001" />
                            <DetailRow label="Investment Name" value="The Bitcoin Fund" />
                            <DetailRow label="Current Balance" value="$50,000" />
                            <DetailRow label="New Balance" value="Adah Jonathan" />
                            <DetailRow label="Maturity Date" value="20-07-2026" />
                            <DetailRow label="Expected Returns" value="$250" />
                            <DetailRow label="Payment Method" value="Bank Transfer" />
                        </div>

                        <button
                            className="mt-6 w-full py-3 rounded-xl bg-[#8627FF] text-white font-semibold transition-colors"
                        >
                            Download PDF
                        </button>
                    </div>
                </div>
            }

            {
                reinvestData.isReinvest &&
                renderReinvestStep()
            }

            {
                withdrawalData.isWithdrawal &&
                renderWithdrawalStep()
            }
        </div>
    );
}

{/* <div
    className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 mt-0 overflow-y-scroll"
    onClick={() => setReinvestData({ ...data, isReinvest: false })}
>
    <div
        className="w-[22rem] mx-auto md:w-[35rem] p-6 bg-white rounded-lg shadow  mt-24 mb-4"
        onClick={(e) => { e.stopPropagation() }}
    >
        <div className="p-4 w-fit mx-auto my-4 bg-[#F3E9FF] rounded-full">
            <MoneyIcon />
        </div>
        <h2 className="text-2xl font-bold text-center">
            Earning Details
        </h2>
        <p className="mt-2 text-gray-600 text-center">
            View a comprehensive breakdown of your earning.
        </p>

        <div className="grid grid-cols-2 gap-4 mt-6">
            <div className="bg-[#F3E9FF] border border-[#D9BCFF] rounded-xl p-4 text-center">
                <p className="text-sm font-bold text-[#1C1B1F] my-4 sm:my-0">$50,000</p>
                <p className="text-xs text-[#8C8B90]">Total Amount Invested</p>
            </div>
            <div className="bg-[#F3E9FF] border border-[#D9BCFF] rounded-xl p-4 text-center">
                <p className="text-sm font-bold text-[#1C1B1F] my-2 m:my-0">31st of Mar, 2025</p>
                <p className="text-xs text-[#8C8B90]">Next Withdrawal Day</p>
            </div>
        </div>

        <p className="text-[#8C8B90] font-semibold text-xs text-center mt-7">
            Amount Withdrawn
        </p>
        <p className="mt-1 font-bold text-2xl text-[#1C1B1F] text-center">
            $10,000
        </p>

        <div className="mt-6 border border-gray-200 rounded-xl p-4 space-y-2 text-left">
            <DetailRow
                label="Investment Name"
                value={"The Bitcoin Fund"}
            />
            <DetailRow
                label="Start Date"
                value={`20-07-2025`}
            />
            <DetailRow
                label="Maturity Date"
                value={"20-07-2026"}
            />
            <DetailRow 
                label="Interest Rate" 
                value={"12%"} 
            />
            <DetailRow 
                label="Total Expected Returns" 
                value={"$2,050"} 
            />
        </div>

    </div>
</div> */}