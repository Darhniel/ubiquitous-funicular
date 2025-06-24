"use client";
import { useState } from "react";
import Image from "next/image";
import { EyeIcon, EyeOffIcon } from "@/components/saturn/SVG";
import { ArrowUpRightIcon, MagnifyingGlassIcon, PlusIcon } from "@heroicons/react/24/outline";
import Notifications from "@/components/dashboard/Notification";
import DateRangePicker from "@/components/dashboard/DatePicker";
import { TransactionsTable, Transaction } from "@/components/transactions-table";
import { RequestFormFive, RequestFormFour, RequestFormOne, RequestFormThree, RequestFormTwo } from "@/components/dashboard/RequestForm";
import { InvestmentFormFive, InvestmentFormFour, InvestmentFormOne, InvestmentFormThree, InvestmentFormTwo } from "@/components/dashboard/FundInvestment";
import { InvestmentDataType, RequestDataType } from "@/lib/types";
import { TransactionDetailsModal } from "@/components/transaction-table-modal";
import { TransactionsReceiptPage } from "@/components/dashboard/Receipt";
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
        paymentMethod: "Bank Transfer",
        currentAmount: 502500,
        payoutDate: new Date("2024-06-30"),
        status: "Active",
        startDate: new Date("2025-03-25"),
        maturityDate: new Date("2026-03-25"),
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
        id: "INV-202501I5-O01",
        amountInvested: 500000,
        type: "Bitcoin Trust Funds",
        paymentMethod: "Bank Transfer",
        currentAmount: 502500,
        payoutDate: new Date("2024-06-30"),
        status: "Pending",
        startDate: new Date("2025-03-25"),
        maturityDate: new Date("2026-03-25"),
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
        id: "INV-202501I5-O01",
        amountInvested: 500000,
        type: "Bitcoin Trust Funds",
        paymentMethod: "Bank Transfer",
        currentAmount: 502500,
        payoutDate: new Date("2024-06-30"),
        status: "Active",
        startDate: new Date("2025-03-25"),
        maturityDate: new Date("2026-03-25"),
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
    const [selectedInvestment, setSelectedInvestment] = useState<Transaction | null>(null)
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isAmountVisible, setIsAmountVisible] = useState(false);
    const [showReceipt, setShowReceipt] = useState(false);
    const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);
    const [fundStep, setFundStep] = useState(1);
    const [reqStep, setReqStep] = useState(1);
    const [investmentData, setInvestmentData] = useState<InvestmentDataType>({
        amount: "",
        investment: "",
        isFund: false,
        payment: "",
    });
    const handleTopUp = (investment: Transaction) => {
        setInvestmentData(prev => ({
            ...prev,
            isFund: true,
            amount: investment.amountInvested.toString(),
        }));
    };

    const [requestData, setRequestData] = useState<RequestDataType>({
        amount: "",
        investment: "",
        isRequest: false,
        penalty: "",
    });
    const handleRequestPayout = (investment: Transaction) => {
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

    const amount = 50000;
    const nairaAmount = amount * 1505;

    return (
        <div className="p-6">
            <header className="mb-6">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-semibold text-[#101010] hidden md:block">
                        Transactions
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
                    <div className="relative hidden lg:block mb-6 md:mb-0">
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
                        <button
                            className="px-2 lg:px-6 py-2 bg-white rounded-xl border border-[#D6D6D6] text-xs lg:text-base font-medium text-[#101010] flex items-center gap-1"
                            onClick={() => setRequestData({ ...requestData, isRequest: true })}
                        >
                            <ArrowUpRightIcon
                                width={24}
                                height={24}
                                className="w-4 h-4 md:w-5 md:h-5 md:mb-1"
                            />
                            Request Payout
                        </button>

                        <button
                            className="px-2 lg:px-6 py-2 rounded-xl bg-gradient-to-b from-[#8627FF] to-[#3F1574] text-white text-xs lg:text-base font-medium flex items-center gap-1"
                            onClick={() => setInvestmentData({ ...investmentData, isFund: true })}
                        >
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
                <div className="bg-white bg-cover bg-[url('/images/dashboard/background.png')] rounded-2xl p-6 flex justify-center items-center flex-col border border-[#EBEBEB]">
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

                <TransactionsTable
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

                <TransactionDetailsModal
                    investment={selectedInvestment}
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                />
            </div>

            {
                showReceipt && selectedTransaction && (
                    <TransactionsReceiptPage
                        data={selectedTransaction}
                        onClose={() => setShowReceipt(false)}
                    />
                )
            }

            {investmentData.isFund &&
                renderFundStep()
            }

            {
                requestData.isRequest &&
                renderReqStep()
            }
        </div>
    );
}