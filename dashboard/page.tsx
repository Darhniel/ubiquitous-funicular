"use client";
import { useState } from "react";
import Image from "next/image";
import { EyeIcon, EyeOffIcon } from "@/components/saturn/SVG";
import { PlusIcon, ArrowUpRightIcon, MagnifyingGlassIcon, ArrowUpTrayIcon } from "@heroicons/react/24/outline";
import Notifications from '@/components/dashboard/Notification';
import DateRangePicker from "@/components/dashboard/DatePicker";
import { Investment, InvestmentsTable } from "@/components/investment-table";
import { RequestFormFive, RequestFormFour, RequestFormOne, RequestFormThree, RequestFormTwo } from "@/components/dashboard/RequestForm";
import { InvestmentFormFive, InvestmentFormFour, InvestmentFormOne, InvestmentFormThree, InvestmentFormTwo } from "@/components/dashboard/FundInvestment";
import { InvestmentDataType, RequestDataType } from "@/lib/types";
import { InvestmentDetailsModal } from "@/components/investment-table-modal";
import { InvestmentReceiptPage } from "@/components/dashboard/Receipt";
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
        id: "INV-202501I5-O01",
        amountInvested: 500000,
        type: "Bitcoin Trust Funds",
        roi: 8.5,
        currentAmount: 502500,
        payoutDate: new Date("2024-06-30"),
        status: "Active",
        startDate: new Date("2025-07-20"),
        maturityDate: new Date("2026-07-20"),
        totalEarnings: 20000,
        returnRate: 12,
        earningsWithdrawn: 12000,
        recentInvestments: [
            {
                amountInvested: 500000,
                totalEarning: 500000,
                date: new Date("2025-02-25"),
                status: "Withdrawn"
            },
        ]

    },
    {
        id: "INV-202501I5-O01",
        amountInvested: 500000,
        type: "Varied Asset Funds",
        roi: 8.5,
        currentAmount: 502500,
        payoutDate: new Date("2024-06-30"),
        status: "Active",
        startDate: new Date("2025-07-20"),
        maturityDate: new Date("2026-07-20"),
        totalEarnings: 20000,
        returnRate: 12,
        earningsWithdrawn: 12000,
        recentInvestments: [
            {
                amountInvested: 500000,
                totalEarning: 500000,
                date: new Date("2025-02-25"),
                status: "Withdrawn"
            },
        ]

    },
    {
        id: "INV-202501I5-O01",
        amountInvested: 500000,
        type: "Specialised AI Funds",
        roi: 8.5,
        currentAmount: 502500,
        payoutDate: new Date("2024-06-30"),
        status: "Active",
        startDate: new Date("2025-07-20"),
        maturityDate: new Date("2026-07-20"),
        totalEarnings: 20000,
        returnRate: 12,
        earningsWithdrawn: 12000,
        recentInvestments: [
            {
                amountInvested: 500000,
                totalEarning: 500000,
                date: new Date("2025-02-25"),
                status: "Withdrawn"
            },
        ]

    },
];

export default function DashboardPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [activeTab, setActiveTab] = useState<"all" | "bitcoin" | "special" | "varied">("all");
    const [selectedInvestment, setSelectedInvestment] = useState<Investment | null>(null)
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isAmountVisible, setIsAmountVisible] = useState(false);
    const [showReceipt, setShowReceipt] = useState(false);
    const [selectedTransaction, setSelectedTransaction] = useState<Investment | null>(null);
    const [fundStep, setFundStep] = useState(1);
    const [reqStep, setReqStep] = useState(1);
    const [investmentData, setInvestmentData] = useState<InvestmentDataType>({
        amount: "",
        investment: "",
        isFund: false,
        payment: "",
    });
    const handleTopUp = (investment: Investment) => {
        setInvestmentData(prev => ({
            ...prev,
            isFund: true,
            amount: investment.currentAmount.toString(),
        }));
    };

    const [requestData, setRequestData] = useState<RequestDataType>({
        amount: "",
        investment: "",
        isRequest: false,
        penalty: "",
    });
    const handleRequestPayout = (investment: Investment) => {
        setRequestData(prev => ({
            ...prev,
            isRequest: true,
            amount: investment.totalEarnings.toString()
        }));
    };

    async function handleNext(stepData: Partial<InvestmentDataType>) {
        setInvestmentData((prev) => ({ ...prev, ...stepData }));

        setFundStep(fundStep + 1);
    }

    async function handleRequestNext(stepData: Partial<InvestmentDataType>) {
        setRequestData((prev) => ({ ...prev, ...stepData }));

        setReqStep(reqStep + 1);
    }

    const renderFundStep = () => {
        switch (fundStep) {
            case 1:
                return <InvestmentFormOne data={investmentData} onNext={handleNext} setInvestmentData={setInvestmentData} setFundStep={setFundStep} />;
            case 2:
                return <InvestmentFormTwo data={investmentData} onNext={handleNext} setInvestmentData={setInvestmentData} setFundStep={setFundStep} />;
            case 3:
                return <InvestmentFormThree data={investmentData} onNext={handleNext} setInvestmentData={setInvestmentData} setFundStep={setFundStep} />;
            case 4:
                return <InvestmentFormFour data={investmentData} onNext={handleNext} setInvestmentData={setInvestmentData} setFundStep={setFundStep} />;
            case 5:
                return <InvestmentFormFive setFundStep={setFundStep} setInvestmentData={setInvestmentData} data={investmentData} onNext={handleNext} />;
            default:
                return null;
        };
    };

    const renderReqStep = () => {
        switch (reqStep) {
            case 1:
                return <RequestFormOne data={requestData} onNext={handleRequestNext} setRequestData={setRequestData} setReqStep={setReqStep} />;
            case 2:
                return <RequestFormTwo data={requestData} onNext={handleRequestNext} setRequestData={setRequestData} setReqStep={setReqStep} />;
            case 3:
                return <RequestFormThree data={requestData} onNext={handleRequestNext} setRequestData={setRequestData} setReqStep={setReqStep} />;
            case 4:
                return <RequestFormFour data={requestData} onNext={handleRequestNext} setRequestData={setRequestData} setReqStep={setReqStep} />;
            case 5:
                return <RequestFormFive data={requestData} onNext={handleRequestNext} setRequestData={setRequestData} setReqStep={setReqStep} />;
            default:
                return null;
        };
    };

    const amount = 50000

    const nairaAmount = amount * 1505;

    return (
        <div className="p-6">
            <header className=" space-y-4 mb-6 sm:space-y-0">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-semibold text-[#101010] hidden md:block">
                        Welcome Back, Jonathan 🎉
                    </h1>
                    <Image
                        src={"/logo.svg"}
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

                    <div className="flex gap-4 justify-center mt-4 lg:mt-0">
                        <button
                            className="px-2 lg:px-6 py-2 bg-white rounded-xl border border-[#D6D6D6] text-xs lg:text-base font-medium text-[#101010] flex items-center gap-2"
                        >
                            <ArrowUpTrayIcon
                                width={24}
                                height={24}
                            />
                            Export
                        </button>

                        <button
                            className="px-2 lg:px-6 py-2 rounded-xl bg-gradient-to-b from-[#8627FF] to-[#3F1574] text-white text-xs lg:text-base font-medium flex items-center gap-1"
                            onClick={() => setInvestmentData({ ...investmentData, isFund: true })}
                        >
                            <PlusIcon
                                width={24}
                                height={24}
                            />
                            Fund Investment
                        </button>
                    </div>
                </div>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                <div className="bg-white bg-[url('/images/dashboard/background.png')] bg-cover rounded-2xl p-6 flex justify-center items-center flex-col border border-[#EBEBEB]">
                    <div className="flex flex-col items-center justify-between mb-2">
                        <DateRangePicker />
                    </div>
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

            {/* Small Stats Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                <div className="bg-white rounded border border-[#EBEBEB] p-4 flex flex-col">
                    <div className="flex justify-between items-center">
                        <p className="text-sm text-[#606060]">
                            Investor Status
                        </p>
                        <div className="flex items-center px-2 py-1 rounded-xl border border-[#3Da20B]">
                            <ArrowUpRightIcon
                                width={16}
                                height={16}
                                color="#3DA20B"
                            />
                            <span className="text-[#3DA20B] text-xs">12%</span>
                        </div>
                    </div>

                    <div className="flex justify-between">
                        <div className="flex flex-col">
                            <span className="text-2xl font-semibold mb-2">
                                Active
                            </span>
                            <span className="text-xs text-[#8C8B90]">
                                Today
                            </span>
                        </div>
                        <div className="flex items-end">
                            <Image
                                src={"/images/dashboard/graph.svg"}
                                width={68}
                                height={28}
                                alt=""
                            />
                        </div>
                    </div>
                </div>
                <div className="bg-white rounded border border-[#EBEBEB] p-4 flex flex-col">
                    <div className="flex justify-between items-center">
                        <p className="text-sm text-[#606060]">
                            Active Investments
                        </p>
                        <div className="flex items-center px-2 py-1 rounded-xl border border-[#3Da20B]">
                            <ArrowUpRightIcon
                                width={16}
                                height={16}
                                color="#3DA20B"
                            />
                            <span className="text-[#3DA20B] text-xs">12%</span>
                        </div>
                    </div>

                    <div className="flex justify-between">
                        <div className="flex flex-col">
                            <span className="text-2xl font-semibold mb-2">
                                3
                            </span>
                            <span className="text-xs text-[#8C8B90]">
                                Today
                            </span>
                        </div>
                        <div className="flex items-end">
                            <Image
                                src={"/images/dashboard/graph.svg"}
                                width={68}
                                height={28}
                                alt=""
                            />
                        </div>
                    </div>
                </div>
                <div className="bg-white rounded border border-[#EBEBEB] p-4 flex flex-col">
                    <div className="flex justify-between items-center">
                        <p className="text-sm text-[#606060]">
                            Interest Generated
                        </p>
                        <div className="flex items-center px-2 py-1 rounded-xl border border-[#3Da20B]">
                            <ArrowUpRightIcon
                                width={16}
                                height={16}
                                color="#3DA20B"
                            />
                            <span className="text-[#3DA20B] text-xs">12%</span>
                        </div>
                    </div>

                    <div className="flex justify-between">
                        <div className="flex flex-col">
                            <span className="text-2xl font-semibold mb-2">
                                $20,224
                            </span>
                            <span className="text-xs text-[#8C8B90]">
                                Today
                            </span>
                        </div>
                        <div className="flex items-end">
                            <Image
                                src={"/images/dashboard/graph.svg"}
                                width={68}
                                height={28}
                                alt=""
                            />
                        </div>
                    </div>
                </div>
                <div className="bg-white rounded border border-[#EBEBEB] p-4 flex flex-col">
                    <div className="flex justify-between items-center">
                        <p className="text-sm text-[#606060]">
                            Total Payouts
                        </p>
                        <div className="flex items-center px-2 py-1 rounded-xl border border-[#3Da20B]">
                            <ArrowUpRightIcon
                                width={16}
                                height={16}
                                color="#3DA20B"
                            />
                            <span className="text-[#3DA20B] text-xs">12%</span>
                        </div>
                    </div>

                    <div className="flex justify-between">
                        <div className="flex flex-col">
                            <span className="text-2xl font-semibold mb-2">
                                $800,000
                            </span>
                            <span className="text-xs text-[#8C8B90]">
                                Today
                            </span>
                        </div>
                        <div className="flex items-end">
                            <Image
                                src={"/images/dashboard/graph.svg"}
                                width={68}
                                height={28}
                                alt=""
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Fund Filters (optional) */}
            <div className="mb-3">
                <nav className="flex space-x-4 items-center overflow-x-scroll md:overflow-visible">
                    <button
                        onClick={() => setActiveTab("all")}
                        className={`grid grid-cols-[7rem_1rem] pb-3 -mb-px text-sm font-medium ${activeTab === "all"
                            ? "border-b-2 border-[#8627FF] text-[#8627FF]"
                            : "text-gray-500 hover:text-gray-700"
                            }`}
                    >
                        All Investments <span className={`ml-1 ${activeTab === "all" ? "text-[#8627FF]" : "text-gray-500"}`}>3</span>
                    </button>
                    <button
                        onClick={() => setActiveTab("bitcoin")}
                        className={`grid grid-cols-[9rem_1rem] pb-3 -mb-px text-sm font-medium ${activeTab === "bitcoin"
                            ? "text-[#8627FF] border-b-2 border-[#8627FF]"
                            : "text-gray-500 hover:text-gray-700"
                            }`}
                    >
                        Bitcoin Trust Funds <span className={`ml-1 ${activeTab === "bitcoin" ? "text-[#8627FF]" : "text-gray-500"}`}>1</span>
                    </button>
                    <button
                        onClick={() => setActiveTab("special")}
                        className={`grid grid-cols-[9rem_1rem] pb-3 -mb-px text-sm font-medium ${activeTab === "special"
                            ? "text-[#8627FF] border-b-2 border-[#8627FF]"
                            : "text-gray-500 hover:text-gray-700"
                            }`}
                    >
                        Specialized AI Funds <span className={`ml-1 ${activeTab === "special" ? "text-[#8627FF]" : "text-gray-500"}`}>1</span>
                    </button>
                    <button
                        onClick={() => setActiveTab("varied")}
                        className={`grid grid-cols-[9rem_1rem] pb-3 -mb-px text-sm font-medium ${activeTab === "varied"
                            ? "text-[#8627FF] border-b-2 border-[#8627FF]"
                            : "text-gray-500 hover:text-gray-700"
                            }`}
                    >
                        Varied Asset Funds <span className={`ml-1 ${activeTab === "varied" ? "text-[#8627FF]" : "text-gray-500"}`}>1</span>
                    </button>
                </nav>
            </div>

            {/* Recent Investments Table */}
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

                <InvestmentsTable
                    data={sampleData}
                    onViewDetails={(investment) => {
                        setSelectedInvestment(investment)
                        setIsModalOpen(true)
                    }}
                    onTopUp={handleTopUp}
                    onRequest={handleRequestPayout}
                    onDownload={(investment) => {
                        setSelectedTransaction(investment);
                        setShowReceipt(true);
                    }}
                />
                <InvestmentDetailsModal
                    investment={selectedInvestment}
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                />
            </div>

            {
                showReceipt && selectedTransaction && (
                    <InvestmentReceiptPage
                        data={selectedTransaction}
                        onClose={() => setShowReceipt(false)}
                    />
                )
            }

            {
                investmentData.isFund &&
                renderFundStep()
            }

            {
                requestData.isRequest &&
                renderReqStep()
            }
        </div>
    );
}