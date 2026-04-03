import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signUp } from "@/api/auth-api";
import { watchSessionExpiry } from "@/utils/helpers";
import toast from "react-hot-toast";

export const useSignupUser = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ name, email, password }: { name: string; email: string; password: string }) =>
            signUp(name, email, password),
        onSuccess: () => {
            toast.success("Account created successfully");
            void queryClient.invalidateQueries({ queryKey: ["current-user"] });

            watchSessionExpiry(() => {
                queryClient.setQueryData(["current-user"], null);
                void queryClient.invalidateQueries({ queryKey: ["current-user"] });
            });
        },
        onError: (error) => {
            toast.error(error instanceof Error ? error.message : "Sign up failed");
        },
    });
};
