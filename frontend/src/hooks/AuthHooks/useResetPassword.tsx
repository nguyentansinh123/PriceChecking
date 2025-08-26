import { resetPassword } from "@/lib/authapi";
import { toast } from "react-toastify";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import type { resetPasswordType } from "@/lib/types/authTypes";

const useResetPassword = () => {
    const queryClient = useQueryClient()
    const { mutate, isPending, error } = useMutation({
        mutationFn: (data: resetPasswordType) => resetPassword(data),
        onSuccess: (data) => {
            if (data.success) {
                toast.success(data.message);
                queryClient.invalidateQueries({ queryKey: ["authuser"] });
            } else {
                toast.error(data.message);
            }
        },
        onError: (err: Error) => {
            toast.error(
                err instanceof Error ? err.message : "Reseting Your Password Failed"
            );
        },

    })
    return { isPending, error, ResetPasswordFn: mutate }
}

export default useResetPassword
