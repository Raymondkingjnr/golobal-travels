import { useMutation, useQueryClient } from "@tanstack/react-query";
import {login, logout} from "@/api/auth-api";
import { watchSessionExpiry } from "@/utils/helpers";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export const useLoginUser = () => {
    const queryClient = useQueryClient();
    const router = useRouter();

    return useMutation({
        mutationFn: ({ email, password }: { email: string; password: string }) =>
            login(email, password),
        onSuccess: () => {
            toast.success("Login successful");
            void queryClient.invalidateQueries({ queryKey: ["current-user"] });
            router.push("/");

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
