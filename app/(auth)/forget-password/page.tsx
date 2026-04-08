"use client";

import {FloatingInput} from "@/app/components";
import {useForgetPassword, } from "@/hooks/auth-hooks/login-user";
import {useFormik} from "formik";

const ForgetPassword = () => {
    const verifyUser = useForgetPassword()

    const onSubmit = (values: {email: string}) =>{
        const payload ={
            email: values.email,
        }
        verifyUser.mutate(payload)
    }

    const {values, handleSubmit, handleChange} = useFormik({
        initialValues: {
            email: "",
        },
        onSubmit,
    })

    return (
        <div className={`min-h-screen bg-white flex items-center justify-center p-6`}>
            <div className="w-full max-w-xl shadow-lg rounded-2xl mx-auto flex flex-col justify-center p-8 sm:p-10">
                <p className="text-center text-sm font-normal pb-2 text-[#112211]/70 mt-3">Enter your email address you used to open an account</p>
                <FloatingInput  placeholder={"Enter your email"} value={values.email} onChange={handleChange('email')} />
                <button
                    onClick={() => handleSubmit()}
                    type="button"
                    className="w-full py-1.5 bg-[#8DD3BB] hover:bg-[#7bc4aa] text-[#112211] font-normal rounded-lg transition-colors mt-6 disabled:cursor-not-allowed disabled:bg-[#8DD3BB]/50"
                >
                    {verifyUser.isPending ? "Sending..." : "Send"}
                </button>
            </div>
        </div>
    )
}

export default ForgetPassword