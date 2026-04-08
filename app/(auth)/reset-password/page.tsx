"use client"
import {Suspense} from "react";
import {useSearchParams} from "next/navigation";
import {usePasswordRest} from "@/hooks/auth-hooks/login-user";
import {FloatingInput} from "@/app/components";
import {useFormik} from "formik";
import * as yup from 'yup';

 const ResetPasswordValidationSchema = yup.object({
    password: yup
        .string()
        .trim()
        .required('password required!'),

    confirmPassword: yup
        .string()
        .label('confirm new password')
        .required()
        .oneOf([yup.ref('password')], 'Passwords must match'),
});

interface IValues {
    password: string;
    confirmPassword: string;
}

const ResetPasswordContent = () => {
    const params = useSearchParams();

    const email = params.get('email')
    const token = params.get('token')

    const passwordReset = usePasswordRest()

    const onSubmit = (values: IValues) =>{
        const payload ={
            email: email ?? "",
            token: token ?? "",
            password: values.password,
        }
        passwordReset.mutate(payload)
    }

    const {values, handleSubmit, handleChange ,errors} = useFormik({
        initialValues: {
            password: "",
            confirmPassword: "",
        },
        onSubmit,
        validationSchema: ResetPasswordValidationSchema,
    })

    return (
        <div className={`min-h-screen bg-white flex items-center justify-center p-6`}>
            <div className="w-full max-w-xl shadow-lg rounded-2xl mx-auto flex flex-col justify-center p-8 sm:p-10">
                <p className="text-center text-sm font-normal pb-2 text-[#112211]/70 mt-3">create your new password</p>
                <div className={"space-y-3.5"}>
                <FloatingInput
                    placeholder={"Enter new password"}
                    value={values.password}
                    onChange={handleChange('password')}
                    error={errors ? errors.password : ""}/>

                <FloatingInput
                    placeholder={"Confirm your password"}
                    value={values.confirmPassword}
                    onChange={handleChange('confirmPassword')}
                    error={errors ? errors.confirmPassword : ""} />

                </div>

                <button
                    disabled={passwordReset.isPending || !values.password || !values.confirmPassword}
                    onClick={() => handleSubmit()}
                    type="button"
                    className="w-full py-1.5 bg-[#8DD3BB] hover:bg-[#7bc4aa] text-[#112211] font-normal rounded-lg transition-colors mt-6 disabled:cursor-not-allowed disabled:bg-[#8DD3BB]/50"
                >
                    {passwordReset.isPending ? "Submitting..." : "Submit"}
                </button>
            </div>
        </div>
    )
}

const ResetPasswordFallback = () => (
    <div className="min-h-screen bg-white flex items-center justify-center p-6">
        <div className="w-full max-w-xl shadow-lg rounded-2xl mx-auto flex flex-col justify-center p-8 sm:p-10">
            <p className="text-center text-sm font-normal text-[#112211]/70">Loading reset form...</p>
        </div>
    </div>
);

const ResetPassword = () => {
    return (
        <Suspense fallback={<ResetPasswordFallback />}>
            <ResetPasswordContent />
        </Suspense>
    );
};

export default ResetPassword
