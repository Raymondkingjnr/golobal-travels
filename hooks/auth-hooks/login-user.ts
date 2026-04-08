import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
    login, logout, verifyEmail, forgotPassword, updatePassword, passwordReset,
    resendVerificationToken
} from "@/api/auth-api";
import { watchSessionExpiry } from "@/utils/helpers";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export const useLoginUser = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ email, password }: { email: string; password: string }) =>
            login(email, password),
        onSuccess: (result) => {
            if (!result.data.user.isVerified) {
                toast.error("Email not verified. Please check your inbox for the verification link.");
                return;
            }
            toast.success("Login successful");
            queryClient.setQueryData(["current-user"], result.data.user);
            void queryClient.invalidateQueries({ queryKey: ["current-user"] });

            watchSessionExpiry(() => {
                queryClient.setQueryData(["current-user"], null);
                void queryClient.invalidateQueries({ queryKey: ["current-user"] });
            });
        },
        onError: (error) => {
            toast.error(error instanceof Error ? error.message : "Login failed");
        },
    });
};

export const useLogout = () =>{
    const queryClient = useQueryClient();
    const router = useRouter();
    return useMutation({
        mutationFn: () => logout(),
        onSuccess: async () => {
            toast.success("Logout successful");
            await queryClient.invalidateQueries({ queryKey: ["current-user"] });
            router.refresh();
            router.push("/");
        },
        onError: (error) => {
            toast.error(error instanceof Error ? error.message : "Logout failed");
        },
    })
}

export const useVerifyEmail = () => {
    const queryClient = useQueryClient();
    const router = useRouter();

    return useMutation({
        mutationFn: ({email, token}: {email: string | null, token: string | null}) => verifyEmail(email!, token!),
        onSuccess: () => {
            toast.success("Email verified successfully");
            router.push("/login");
            void queryClient.invalidateQueries({ queryKey: ["current-user"] });
        },
        onError: (error) => {
            toast.error(error instanceof Error ? error.message : "Email verification failed");
        },
    })
}

export const useResendToken = () => {

    return useMutation({
        mutationFn: ({email}: {email: string}) => resendVerificationToken(email),
        onSuccess: () => {
            toast.success("Verification token resent successfully");
        },
        onError: (error) => {
            toast.error(error instanceof Error ? error.message : "Failed to resend verification token");
        },
    })
}

export const useForgetPassword = () => {
    return useMutation({
        mutationFn: ({email}: {email:string}) => forgotPassword(email),
        onSuccess: () => {
            toast.success("Password reset link sent successfully");
        },
        onError: (error) => {
            toast.error(error instanceof Error ? error.message : "Failed to send password reset link");
        },
    })
}

export const usePasswordRest = () => {
    const router = useRouter();
    return  useMutation({
        mutationFn: ({email, token, password}: {email: string, token: string, password: string}) => passwordReset(email, token, password),
        onSuccess: () => {
            toast.success("Password reset successful");
            router.push("/login");
        },
        onError: (error) => {
            toast.error(error instanceof Error ? error.message : "Password reset failed");
        },
    })
}


export const useUpdatePassword = () => {
    const queryClient = useQueryClient();
    const router = useRouter();

    return useMutation({
        mutationFn: ({currentPassword, newPassword}: {currentPassword: string, newPassword: string}) => updatePassword(currentPassword, newPassword),
        onSuccess: () => {
            toast.success("Password updated successfully");
            router.push("/login");
            void queryClient.invalidateQueries({ queryKey: ["current-user"] });
        },
        onError: (error) => {
            toast.error(error instanceof Error ? error.message : "Password update failed");
        },
    })
}
