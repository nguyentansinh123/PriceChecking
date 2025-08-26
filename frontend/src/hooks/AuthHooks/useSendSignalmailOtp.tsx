import { sendResetOtp } from "@/lib/authapi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const useSendResetMailOtp = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate, isPending, error } = useMutation({
    mutationFn: (data: { email: string }) => sendResetOtp(data),
    onSuccess: (data) => {
      if (data.success) {
        toast.success(data.message);
        navigate("/otp");
        queryClient.invalidateQueries({ queryKey: ["authuser"] });
      } else {
        toast.error(data.message);
      }
    },
    onError: (err: Error) => {
      toast.error(
        err instanceof Error ? err.message : "Sending Your ResetOtp Failed"
      );
    },
  });

  return { isPending, error, SendingResetMailOtp: mutate };
};

export default useSendResetMailOtp;
