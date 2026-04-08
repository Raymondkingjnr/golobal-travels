"use client"
import {useSearchParams} from "next/navigation";
import {useResendToken, useVerifyEmail} from "@/hooks/auth-hooks/login-user";
import {useState} from "react";
import {TokenInput} from "@/app/components";
import {Suspense} from "react";

const VerifyEmailContent = () => {
    const searchParams = useSearchParams();
    const [inputToken, setInputToken] = useState("");
    const token= searchParams.get("token");
    const email= searchParams.get("email");

    const verifyEmail = useVerifyEmail()
    const resendToken = useResendToken()

    const resolvedToken = token || inputToken;
    const isTokenComplete = resolvedToken.length === 4;

    const onSubmit = () =>{
        if (!isTokenComplete) {
            return;
        }
        const payload ={
            email: email ?? "",
            token: resolvedToken,
        }
        verifyEmail.mutate(payload)
    }

    const onResend = () =>{
        const payload ={
            email: email ?? "",
        }
        resendToken.mutate(payload)
    }

    return (
        <div className={`min-h-screen bg-white flex items-center justify-center p-6`}>
            <div className="w-full max-w-xl shadow-lg rounded-2xl mx-auto flex flex-col justify-center p-8 sm:p-10">
                <h3 className="text-center text-2xl font-semibold text-[#112211]">Verify token</h3>
                <p className="text-center text-sm font-normal text-[#112211]/70 mt-3">Enter the verification token sent to this email address</p>
                <p className="text-center text-sm font-medium text-[#4659ff] pt-1">{email}</p>

                <div className="mt-8">
                    <TokenInput
                        value={resolvedToken}
                        disabled={Boolean(token) || verifyEmail.isPending}
                        onChange={setInputToken}
                    />
                </div>

                <div className="flex flex-col items-center justify-center mt-4 text-sm text-[#112211]/70">
                    <p>Didn&apos;t receive token</p>
                    <button className="text-[#4659ff] hover:text-[#3344dd] font-medium underline" onClick={onResend}>Re-send</button>
                </div>

                <button
                    type="button"
                    onClick={onSubmit}
                    disabled={verifyEmail.isPending || !isTokenComplete}
                    className="w-full py-1.5 bg-[#8DD3BB] hover:bg-[#7bc4aa] text-[#112211] font-normal rounded-lg transition-colors mt-6 disabled:cursor-not-allowed disabled:bg-[#8DD3BB]/50"
                >
                    {verifyEmail.isPending ? "Verifying..." : "Verify"}
                </button>
            </div>
        </div>
    )
}


const ResetPasswordFallback = () => (
    <div className="min-h-screen bg-white flex items-center justify-center p-6">
        <div className="w-full max-w-xl shadow-lg rounded-2xl mx-auto flex flex-col justify-center p-8 sm:p-10">
            <p className="text-center text-sm font-normal text-[#112211]/70">Loading form...</p>
        </div>
    </div>
);


const VerifyEmail = () => {
    return (
        <Suspense fallback={<ResetPasswordFallback />}>
            <VerifyEmailContent />
        </Suspense>
    );
};



export default VerifyEmail;
