import { normalLogin } from "@/lib/authapi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

const useNLogin = ()=>{
    const queryClient = useQueryClient()

    const {mutate, isPending, error} = useMutation({
        mutationFn: normalLogin,
        onSuccess: data =>{
            if (data.success){
                toast.success(data.message)
                queryClient.invalidateQueries({queryKey: ["authUser"]})
            }else{
                toast.error(data.message)
            }
        },
        onError: err =>{
            toast.error(err instanceof Error ? err.message : "Login Failed")
        }
    })

    return {isPending, error, NLoginMutation: mutate }
}

export default useNLogin;