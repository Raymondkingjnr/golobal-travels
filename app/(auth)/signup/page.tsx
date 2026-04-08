"use client";

import { useState } from "react";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";
import { LogoIcon } from "@/assets";
import { AuthCarousel,FloatingInput } from "@/app/components";
import { useSignupUser } from "@/hooks/auth-hooks/signup-user";
import {useFormik} from "formik";
import {SignUpParams} from "@/api/auth-api";

export default function SignUpPage() {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [agreed, setAgreed] = useState(false);
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const signupMutation = useSignupUser();


    const onnSubmit =  (values: SignUpParams) =>{
        if (!agreed) {
            setError("Accept the terms to continue.");
            return;
        }

        const payload ={
            name: values.name,
            email: values.email,
            password: values.password,
        }

        try {
             signupMutation.mutate(payload)
        } catch (error) {
            console.log(error)
        }

    }

    const {values, errors, handleChange, handleSubmit} = useFormik({
        initialValues: {
            name: "",
            email: "",
            password: "",
        },
        onSubmit: onnSubmit,
    })

    return (
        <div className="min-h-screen bg-white flex items-center justify-center p-6">
            <div className="w-full container mx-auto flex justify-center gap-12">
                {/* Left: Carousel */}
                <div className="hidden lg:block w-105 h-170 shrink-0">
                    <AuthCarousel />
                </div>

                {/* Right: Form */}
                <div className="flex-1 max-w-140">
                    <LogoIcon />

                    <div className="mt-10 mb-2">
                        <h1 className="text-4xl font-bold text-[#112211]">Sign up</h1>
                        <p className="mt-2 text-sm text-[#112211]/60">
                            Let&apos;s get you all set up so you can access your personal account.
                        </p>
                    </div>

                    <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
                        {/* Row 1 */}
                        {/*<div className="grid grid-cols-2 gap-4">*/}

                            <FloatingInput label="fullname"
                                           placeholder="John Deo"
                                           value={values.name}
                                           onChange={handleChange('name')}
                                           error={errors ? errors.name : ""} />
                            <FloatingInput
                                label={"Email"}
                                placeholder="john.doe@gmail.com"
                                type="email"
                                value={values.email}
                                onChange={handleChange('email')}
                                error={errors ? errors.email : ""}
                            />
                        {/*</div>*/}

                        {/* Password */}
                        <div className="relative">
                            <FloatingInput
                                label="Password"
                                placeholder="••••••••••••••••••"
                                type={showPassword ? "text" : "password"}
                                value={values.password}
                                onChange={handleChange('password')}
                                error={errors ? errors.password : ""}
                            />
                            <button
                                type="button"
                                className="absolute right-3 bottom-0 -translate-y-1/2 text-[#112211]/40 hover:text-[#112211]/70 transition-colors"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
                            </button>
                        </div>

                        {/* Confirm Password */}
                        <div className="relative">
                            <FloatingInput
                                label="Confirm Password"
                                placeholder="••••••••••••••••••"
                                type={showConfirm ? "text" : "password"}
                                value={confirmPassword}
                                onChange={setConfirmPassword}
                            />
                            <button
                                type="button"
                                className="absolute right-3 bottom-0 -translate-y-1/2 text-[#112211]/40 hover:text-[#112211]/70 transition-colors"
                                onClick={() => setShowConfirm(!showConfirm)}
                            >
                                {showConfirm ? <Eye size={18} /> : <EyeOff size={18} />}
                            </button>
                        </div>

                        {/* Checkbox */}
                        <div className="flex items-center gap-3 pt-1">
                            <button
                                type="button"
                                onClick={() => setAgreed(!agreed)}
                                className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors shrink-0 ${
                                    agreed
                                        ? "bg-[#8DD3BB] border-[#8DD3BB]"
                                        : "border-[#112211]/30 bg-white"
                                }`}
                            >
                                {agreed && (
                                    <svg
                                        viewBox="0 0 10 8"
                                        fill="none"
                                        className="w-3 h-3"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M1 4l3 3 5-6"
                                            stroke="white"
                                            strokeWidth="1.5"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </svg>
                                )}
                            </button>
                            <span className="text-sm text-[#112211]/80">
                I agree to all the{" "}
                                <Link href="#" className="text-[#FF8682] hover:underline">
                  Terms
                </Link>{" "}
                                and{" "}
                                <Link href="#" className="text-[#FF8682] hover:underline">
                  Privacy Policies
                </Link>
              </span>
                        </div>

                        {error && (
                            <p className="text-sm text-[#FF8682]">{error}</p>
                        )}

                        {/* Submit */}
                        <button
                            type="submit"
                            disabled={signupMutation.isPending || !values.email || !values.name || !values.password || !confirmPassword || !agreed}
                            className="w-full py-4 bg-[#8DD3BB] hover:bg-[#7bc4aa] text-[#112211] font-semibold rounded-lg transition-colors mt-2"
                        >
                            {signupMutation.isPending ? "Creating account..." : "Create account"}
                        </button>

                        <p className="text-center text-sm text-[#112211]/70">
                            Already have an account?{" "}
                            <Link
                                href="/login"
                                className="text-[#FF8682] font-medium hover:underline"
                            >
                                Login
                            </Link>
                        </p>

                    </form>
                </div>
            </div>
        </div>
    );
}

