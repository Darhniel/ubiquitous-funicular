export type FormDataType = {
    fullName: string;
    email: string;
    phone: string;
    investmentInterest: string;
    investmentSize: string;
    referral: string;
    password: string;
    confirmPassword: string;
    dateOfBirth: string;
    address: string;
    investmentAppetite: string;
    preferredPortfolioTypes: string[];
    files: File[];
    file: Record<string, string>;
    agree: boolean;
    // userType: "individual";
};

export type StepProps = {
    data: FormDataType;
    onNext: (data: Partial<FormDataType>) => void;
};

export interface UploadedFile {
    file: File;
    previewUrl: string;
    progress: number;
    error?: string;
}

export enum FormState {
    LOGIN,
    FORGOT_PASSWORD,
    OTP,
    RESET_PASSWORD,
    SUCCESS
}

// fullname
// email
// phone
// investment Interest
// investmentSize
// how did you hear about us
// password
// confirmPassword


export type InvestmentDataType = {
    amount: string;
    investment: string;
    isFund: boolean;
    payment: string;
}

export type RequestDataType = {
    amount: string;
    investment: string;
    isRequest: boolean;
    penalty: string;
}

export type InvestmentDataFormProps = {
    data: InvestmentDataType;
    onNext: (data: Partial<InvestmentDataType>) => void;
    setInvestmentData: React.Dispatch<React.SetStateAction<InvestmentDataType>>;
    setFundStep: React.Dispatch<React.SetStateAction<number>>;
}

export type RequestDataFormProps = {
    data: RequestDataType;
    onNext: (data: Partial<RequestDataType>) => void;
    setRequestData: React.Dispatch<React.SetStateAction<RequestDataType>>;
    setReqStep: React.Dispatch<React.SetStateAction<number>>;
}

export type ReInvestDataType = {
    investmentPlan: string;
    investmentAmount: string;
    isReinvest: boolean;
}

export type WithdrawalDataType = {
    investmentPlan: string;
    withdrawalAmount: string;
    isWithdrawal: boolean;
    bankName: string;
    accountName: string;
    accountNumber: string
}

export type ReinvestFormProps = {
    data: ReInvestDataType;
    onNext: (data: Partial<ReInvestDataType>) => void;
    setReinvestData: React.Dispatch<React.SetStateAction<ReInvestDataType>>;
    setReinvestStep: React.Dispatch<React.SetStateAction<number>>;
}

export type WithdrawalFormProps = {
    data: WithdrawalDataType;
    onNext: (data: Partial<WithdrawalDataType>) => void;
    setWithdrawalData: React.Dispatch<React.SetStateAction<WithdrawalDataType>>;
    setWithdrawalStep: React.Dispatch<React.SetStateAction<number>>;
}

export type InvestmentType = {
    isFund: boolean;
    withdrawalMethod: string;
    bankName: string;
    accountNumber: string;
    cryptoType: string;
    networkType: string;
    walletAddress: string;
}

export type InvestmentFormProps = {
    data: InvestmentType;
    onNext: (data: Partial<InvestmentType>) => void;
    setInvestmentData: React.Dispatch<React.SetStateAction<InvestmentType>>;
    setFundStep: React.Dispatch<React.SetStateAction<number>>;
};