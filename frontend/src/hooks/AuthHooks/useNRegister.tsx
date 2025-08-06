import { normalsignup } from "@/lib/authapi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

const useNRegister = ()=>{
    const queryClient = useQueryClient()

    const {mutate, isPending, error} = useMutation({
        mutationFn: normalsignup,
        onSuccess: data =>{
            if (data.success){
                toast.success(data.message)
                queryClient.invalidateQueries({queryKey: ["authUser"]})
            }else{
                toast.error(data.message)
            }
        },
        onError: err =>{
            toast.error(err instanceof Error ? err.message : "Registration Failed")
        }
    })

    return {isPending, error, NRegisterMutation: mutate }
}

export default useNRegister;