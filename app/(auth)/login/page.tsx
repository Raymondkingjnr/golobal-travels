"use client";

import {  useState } from "react";
import Link from "next/link";
import { AuthCarousel,FloatingInput } from "@/app/components";
import { Eye, EyeOff } from "lucide-react";
import { LogoIcon } from "@/assets";
import { useLoginUser } from "@/hooks/auth-hooks/login-user";
import {useFormik} from "formik";
import { useRouter } from "next/navigation";

export default function LoginPage() {
    const [showPassword, setShowPassword] = useState(false);
    const loginMutation = useLoginUser();
    const router = useRouter();

    const onSubmit = async (values: { email: string; password: string }) => {
        const payload = {
            email: values.email,
            password: values.password
        }

        try {
            const result = await loginMutation.mutateAsync(payload);
            const user = result.data.user;

            if (user.isVerified) {
                router.push("/");
                return;
            }

            router.push(`/verify-email?email=${encodeURIComponent(user.email)}`);
        } catch (error){
            console.log(error)
        }
    }

    const {handleSubmit, handleChange, isSubmitting, errors, values} = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        onSubmit: onSubmit,
    })


    return (
        <div className="min-h-screen bg-white flex items-center justify-center p-6">
            <div className="w-full max-w-6xl flex gap-12">
                {/* Left: Form */}
                <div className="flex-1 max-w-140">
                    <LogoIcon />

                    <div className="mt-10 mb-2">
                        <h1 className="text-4xl font-bold text-[#112211]">Login</h1>
                        <p className="mt-2 text-sm text-[#112211]/60">
                            Login to access your Golobe account
                        </p>
                    </div>

                    <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
                        {/* Email */}

                            <FloatingInput
                                type="email"
                                label={"Email"}
                                value={values.email}
                                onChange={handleChange('email')}
                                placeholder="john.doe@gmail.com"
                            />

                        {/* Password */}
                        <div className="relative">
                            <FloatingInput
                                type={showPassword ? "text" : "password"}
                                label={"Password"}
                                value={values.password}
                                onChange={handleChange('password')}
                                placeholder="••••••••••••••••••"
                            />
                            <button
                                type="button"
                                className="absolute right-3 bottom-1 -translate-y-1/2 text-[#112211]/40 hover:text-[#112211]/70 transition-colors"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
                            </button>
                        </div>

                        {/* Remember + Forgot */}
                        <div className="flex items-center justify-between pt-1">
                            <Link
                                href="/forget-password"
                                className="text-sm text-[#FF8682] hover:underline font-medium"
                            >
                                Forgot Password
                            </Link>
                        </div>
                        {/* Submit */}
                        <button
                            type="submit"
                            disabled={loginMutation.isPending || !values.email || !values.password}
                            className="w-full py-4 bg-[#8DD3BB] hover:bg-[#7bc4aa] text-[#112211] font-semibold rounded-lg transition-colors mt-2"
                        >
                            {loginMutation.isPending || isSubmitting ? "Logging in..." : "Login"}
                        </button>

                        <p className="text-center text-sm text-[#112211]/70">
                            Don&apos;t have an account?{" "}
                            <Link
                                href="/signup"
                                className="text-[#FF8682] font-medium hover:underline"
                            >
                                Sign up
                            </Link>
                        </p>

                    </form>
                </div>

                {/* Right: Carousel */}
                <div className="hidden lg:block w-130 h-170 shrink-0">
                    <AuthCarousel />
                </div>
            </div>
        </div>
    );
}
