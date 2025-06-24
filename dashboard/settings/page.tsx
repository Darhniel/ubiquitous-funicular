"use client";
import { useSearchParams } from 'next/navigation';
import { useState, useEffect, Suspense } from "react";
import Image from 'next/image';
import { FaCheckCircle, FaRocket, FaEnvelope, FaLock, FaWallet, FaKey, FaExclamationTriangle, FaUserShield } from "react-icons/fa";
import { ArrowUpTrayIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import Notifications from "@/components/dashboard/Notification";
import { CopyIcon, ErrorIcon, EyeIcon, EyeOffIcon, SuccessIcon } from "@/components/saturn/SVG";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from '@/components/ui/table';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronLeft, ChevronRight, SlidersHorizontal } from "lucide-react";

const notifications = [
  {
    title: "Payout Completed ✅",
    description: "Your payout of $1,200 has been successfully sent to your bank account.",
    icon: <FaCheckCircle />,
    time: "2 mins ago",
    unread: false,
  },
  {
    title: "Payout Request Received",
    description: "Your payout request is being processed. You will be notified once the funds are sent.",
    icon: <FaCheckCircle />,
    time: "2 mins ago",
    unread: true,
  },
  {
    title: "New Investment Plan Available 🚀",
    description: "Check out our latest investment plans with competitive returns.",
    icon: <FaRocket />,
    time: "2 mins ago",
    unread: true,
  },
  {
    title: "Early Withdrawal Fee Applied",
    description: "A penalty of 2.5% has been deducted due to early payout. Check details in your transactions.",
    icon: <FaExclamationTriangle />,
    time: "2 mins ago",
    unread: false,
  },
  {
    title: "Low Investment Balance Alert",
    description: "Your investment balance is running low. Add funds to continue earning.",
    icon: <FaWallet />,
    time: "2 mins ago",
    unread: true,
  },
  {
    title: "An OTP Has Been Sent to Your Email",
    description: "Enter the one-time password sent to your email to proceed securely.",
    icon: <FaEnvelope />,
    time: "2 mins ago",
    unread: true,
  },
  {
    title: "Password Changed Successfully",
    description: "Your password has been updated. If this wasn’t you, reset your password immediately.",
    icon: <FaLock />,
    time: "2 mins ago",
    unread: true,
  },
  {
    title: "Bank Account Added Successfully",
    description: "Your bank account has been linked. You can now receive payouts seamlessly.",
    icon: <FaWallet />,
    time: "2 mins ago",
    unread: true,
  },
  {
    title: "KYC Verification Approved 🎉",
    description: "Your identity verification is complete. You can now invest and withdraw without limits.",
    icon: <FaUserShield />,
    time: "2 mins ago",
    unread: true,
  },
  {
    title: "New Login Detected",
    description: "A new login was detected on your account from Lagos, Nigeria. If this wasn’t you, secure your account now.",
    icon: <FaKey />,
    time: "2 mins ago",
    unread: true,
  },
];

function SettingsPage() {
  const searchParams = useSearchParams();
  const initialTab = searchParams.get('tab') === 'notification' ? 'notification' : 'profile';
  const [activeTab, setActiveTab] = useState<"profile" | "password" | "notification" | "referral">(initialTab);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (searchParams.get('tab') === 'notification') {
      setActiveTab("notification");
    }
  }, [searchParams]);

  return (
    <div className="p-6 space-y-6">
      {/* Top Bar */}
      <header className="mb-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold text-[#101010] hidden md:block">
            Settings
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

      {/* Tabs: Profile, Password, Notification */}
      <div className="border-b border-gray-200">
        <nav className="flex space-x-8">
          <button
            onClick={() => setActiveTab("profile")}
            className={`pb-3 -mb-px text-sm font-medium ${activeTab === "profile"
              ? "border-b-2 border-[#8627FF] text-[#8627FF]"
              : "text-gray-500 hover:text-gray-700"
              }`}
          >
            Profile
          </button>
          <button
            onClick={() => setActiveTab("password")}
            className={`pb-3 -mb-px text-sm font-medium ${activeTab === "password"
              ? "text-[#8627FF] border-b-2 border-[#8627FF]"
              : "text-gray-500 hover:text-gray-700"
              }`}
          >
            Password
          </button>
          <button
            onClick={() => setActiveTab("notification")}
            className={`pb-3 -mb-px text-sm font-medium ${activeTab === "notification"
              ? "text-[#8627FF] border-b-2 border-[#8627FF]"
              : "text-gray-500 hover:text-gray-700"
              }`}
          >
            Notification
          </button>
          <button
            onClick={() => setActiveTab("referral")}
            className={`pb-3 -mb-px text-sm font-medium ${activeTab === "referral"
              ? "text-[#8627FF] border-b-2 border-[#8627FF]"
              : "text-gray-500 hover:text-gray-700"
              }`}
          >
            Referral
          </button>
        </nav>
      </div>

      {/* Tab Content */}
      {activeTab === "profile" && <ProfileTab />}
      {activeTab === "password" && <PasswordTab />}
      {activeTab === "notification" && <NotificationTab />}
      {activeTab === "referral" && <ReferralTab />}
    </div>
  );
}


function ProfileTab() {
  const [isEditing, setIsEditing] = useState(false);

  // State to store form data
  const [formData, setFormData] = useState({
    fullName: "Adah Jonathan",
    email: "joeeenathanadah@gmail.com",
    role: "Super Admin",
  });

  const [tempData, setTempData] = useState(formData);

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTempData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  // Save changes and update formData
  const handleSave = () => {
    setFormData(tempData);
    setIsEditing(false);
    console.log("Saved Data:", tempData); // Replace with API request if needed
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="bg-white p-8 rounded shadow flex flex-col gap-4 lg:gap-44 lg:flex-row">
        {/* Title & Description */}
        <div className="max-w-80">
          <h2 className="text-xl font-semibold mb-2">Profile</h2>
          <p className="text-sm text-gray-500 mb-6">
            Invite your colleagues to work faster and collaborate easily together.
          </p>
        </div>

        <div className="w-full">
          {/* Avatar + Edit Button */}
          <div className="flex items-center mb-8 justify-between">
            {/* Avatar with camera overlay */}
            <div className="relative w-20 h-20">
              {/* Replace this with a real user avatar image or Next.js Image */}
              <Image
                src="/images/dashboard/avatar.png"
                alt="User Avatar"
                width={80}
                height={80}
                className="w-20 h-20 object-cover rounded-full"
              />
              {/* Camera overlay icon */}
              <button
                type="button"
                className="absolute bottom-0 right-0 w-8 h-8 bg-[#8627FF]-500 hover:bg-[#8627FF]-600 text-white rounded-full flex items-center justify-center"
              >
                {/* <FaCamera className="text-sm" /> */}
              </button>
            </div>

            {/* Edit button */}
            <button
              onClick={handleEdit}
              className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-sm rounded flex items-center"
              disabled={isEditing} // Disable button if already editing
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#000"
                strokeWidth="1"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-file-pen-line"
              >
                <path d="m18 5-2.414-2.414A2 2 0 0 0 14.172 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2" />
                <path d="M21.378 12.626a1 1 0 0 0-3.004-3.004l-4.01 4.012a2 2 0 0 0-.506.854l-.837 2.87a.5.5 0 0 0 .62.62l2.87-.837a2 2 0 0 0 .854-.506z" />
                <path d="M8 18h1" />
              </svg>
              Edit
            </button>
          </div>

          {/* Form Fields */}
          <form className="space-y-4">
            {/* Full Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Full Name
              </label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                readOnly={!isEditing}
                className={`mt-1 block w-full border border-gray-300 rounded px-3 py-2 focus:outline-none ${isEditing ? "focus:ring-1 focus:ring-[#8627FF]" : ""}`}
              />
            </div>

            {/* Email Address */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={isEditing ? tempData.email : formData.email}
                onChange={handleChange}
                readOnly={!isEditing}
                className={`mt-1 block w-full bg-[#D9D9D9] border border-gray-300 rounded px-3 py-2 placeholder:text-[#606060] focus:outline-none ${isEditing ? "focus:ring-1 focus:ring-[#8627FF]" : ""
                  }`}
              />
            </div>

            {/* Role */}
          </form>

          {isEditing && (
            <div className="mt-6 text-left">
              <button
                onClick={handleSave}
                className="px-6 py-2 bg-[#8627FF] hover:bg-[#8627FF]-600 text-white rounded"
              >
                Save Changes
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}


function PasswordTab() {
  const [modal, setModal] = useState(false)
  const [password, setPassword] = useState({ currentPassword: "", newPassword: "", confirmPassword: "" });
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
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
  const [errors, setErrors] = useState({
    newPasswordError: false,
    confirmPasswordError: false,
    currentPasswordError: false
  })
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const newLocalData = { ...password, [name]: value };
    if (name === "currentPassword") {
      const {
        isValid
      } = validatePassword(value);
      setErrors((prev) => ({ ...prev, currentPasswordError: !isValid }));
    }
    // Validate password
    if (name === "newPassword") {
      const {
        isValid
      } = validatePassword(value);
      setErrors((prev) => ({ ...prev, newPasswordError: !isValid }));
    }
    // Validate confirmPassword match
    if (name === "confirmPassword" || name === "newPassword") {
      const isMatching = newLocalData.newPassword === newLocalData.confirmPassword;
      setErrors((prev) => ({ ...prev, confirmPasswordError: !isMatching }));
    }
    setPassword(newLocalData);
  };
  function complete() {
    if (
      errors.newPasswordError ||
      errors.confirmPasswordError ||
      errors.currentPasswordError ||
      password.newPassword === "" ||
      password.confirmPassword === "" ||
      password.currentPassword === ""
    ) {
      // alert("Please fill out all required fields correctly.");
      return true;
    }

    return false;
  }
  function handleSubmit() {
    setModal(true);
    setPassword({ currentPassword: "", newPassword: "", confirmPassword: "" })
  }

  return (
    <div className="bg-white rounded shadow p-6">
      <h2 className="text-lg font-semibold mb-4">Password</h2>
      <p className="text-sm text-gray-500 mb-6">
        Update your password here. Make sure it’s strong and secure.
      </p>
      <form className="flex flex-wrap gap-6 items-center">
        {/* Current Password */}
        <div className="md:w-[48%] w-full">
          <label className="block text-sm font-medium text-gray-700">
            Current Password
          </label>
          <input
            type="password"
            name="currentPassword"
            value={password.currentPassword}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-[#8627FF]"
          />
          {errors.currentPasswordError && (
            <div className="flex items-center gap-1">
              <ErrorIcon />
              <span className="text-sm font-medium text-red-600">
                Password must meet criteria.
              </span>
            </div>
          )}
        </div>
        {/* New Password */}
        <div className="md:w-[48%] w-full">
          <label className="block text-sm font-medium text-gray-700">
            New Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="newPassword"
              className="mt-1 block w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-[#8627FF]"
              placeholder="Enter New Password"
              value={password.newPassword}
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
          {errors.newPasswordError && (
            <div className="flex items-center gap-1">
              <ErrorIcon />
              <span className="text-sm font-medium text-red-600">
                Password must meet criteria.
              </span>
            </div>
          )}
        </div>
        {/* Confirm New Password */}
        <div className="md:w-[48%] w-full">
          <label className="block text-sm font-medium text-gray-700">
            Confirm New Password
          </label>
          <input
            type="password"
            name="confirmPassword"
            placeholder={"Confirm Password"}
            className="mt-1 block w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-[#8627FF]"
            value={password.confirmPassword}
            onChange={handleChange}
          />
          {errors.confirmPasswordError && (
            <div className="flex items-center gap-1">
              <ErrorIcon />
              <span className="text-sm font-medium text-red-600">
                Passwords do not match.
              </span>
            </div>
          )}
        </div>
      </form>

      <div className="mt-6 text-left">
        <button
          className={`px-6 py-2 text-white rounded ${complete() ? "bg-[#D9D9D9]" : "bg-[#8627FF]"}`}
          disabled={complete()}
          onClick={() => handleSubmit()}
        >
          Change Password
        </button>
      </div>
      {
        modal &&
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 mt-0"
          onClick={() => setModal(false)}
        >
          <div className="w-full mx-auto max-w-[21rem] md:max-w-sm bg-white rounded-2xl shadow-md p-6 text-center">
            <div className="p-3 w-fit mx-auto my-4 bg-[#F3E9FF] rounded-full">
              <SuccessIcon />
            </div>

            <h1 className="text-xl font-bold text-gray-900">
              Password Changed Successfully
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Your password has been updated. Use your new password to log in securely.
            </p>

            <button
              className="p-2 rounded-lg border border-[#D6D6D6] text-[#1C1B1F] font-semibold w-40 mt-6"
              onClick={() => { setModal(false) }}
            >
              Close
            </button>
          </div>
        </div>
      }
    </div>
  );
}

function NotificationTab() {
  return (
    <div className="bg-white rounded shadow p-6">
      <h2 className="text-xl font-semibold mb-4">Notifications</h2>
      <p className="text-sm text-gray-500 mb-6">
        Choose how you receive notifications.
      </p>
      {/* Example notification preferences */}
      <div className="space-y-4">
        {notifications.map((notification, index) => (
          <div key={index} className="flex items-start justify-between p-4 rounded-lg hover:bg-gray-100 transition">
            {/* Left Section: Icon + Text */}
            <div className="flex items-start space-x-4">
              {/* Icon */}
              <div className={`p-3 rounded-full ${notification.unread ? "bg-[#8627FF] text-white" : "bg-gray-300 text-gray-600"}`}>
                {notification.icon}
              </div>
              {/* Title & Description */}
              <div>
                <h3 className="font-semibold">{notification.title}</h3>
                <p className={`text-sm ${notification.unread ? "text-gray-700" : "text-gray-400"}`}>
                  {notification.description}
                </p>
              </div>
            </div>

            {/* Right Section: Time & Unread Dot */}
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-500">{notification.time}</span>
              {notification.unread && <span className="w-2.5 h-2.5 bg-[#8627FF]-500 rounded-full"></span>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ReferralTab() {
  return (
    <div className="bg-white rounded shadow p-6">
      <h2 className="text-xl font-semibold mb-4">Referral</h2>
      <p className="text-sm text-gray-500 mb-6">
        Invite friends earn rewards
      </p>

      <div className="flex items-center gap-2 mb-6">
        <div className='px-4 py-2 rounded-xl bg-[#F3E9FF]'>
          <span className="text-[#8627FF]">
            https://.referralscodebynabungin.com/ujexnpyc
          </span>
        </div>
        <button className='bg-[#8627FF] px-4 py-2 flex items-center gap-2 rounded-xl text-white'>
          <CopyIcon
            stroke='#fff'
          />
          Copy link
        </button>
      </div>

      <Card className="rounded-2xl shadow-sm">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Referral History</h2>
            <Button variant="outline" className="gap-2">
              <SlidersHorizontal className="w-4 h-4" />
              Sort By
            </Button>
          </div>

          <div className="overflow-auto">
            <Table>
              <TableHeader className="bg-muted">
                <TableRow>
                  <TableHead>Date Joined</TableHead>
                  <TableHead>Email Address</TableHead>
                  <TableHead>Level</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>30-06-2024</TableCell>
                  <TableCell>lorumipsum@gmail.com</TableCell>
                  <TableCell>Verified</TableCell>
                  <TableCell>$1</TableCell>
                  <TableCell>
                    <span className="text-green-600 border border-green-600 rounded-full px-3 py-1 text-sm font-medium">
                      Paid
                    </span>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>30-06-2024</TableCell>
                  <TableCell>lorumipsum@gmail.com</TableCell>
                  <TableCell>Not Verified</TableCell>
                  <TableCell>$1</TableCell>
                  <TableCell>
                    <span className="text-yellow-700 border border-yellow-700 rounded-full px-3 py-1 text-sm font-medium">
                      Pending
                    </span>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>

          <div className="flex items-center justify-end gap-4 mt-4">
            <p className="text-sm text-muted-foreground">1-2 of 2</p>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon">
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="icon">
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

    </div>
  )
}

export default function Settings() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SettingsPage />
    </Suspense>
  )
}