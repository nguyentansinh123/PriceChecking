import AuthLayout from "@/comps/AuthCMTS/AuthLayoutProps";
import InputField from "@/comps/AuthCMTS/InputField";
import SocialIcons from "@/comps/AuthCMTS/SocialIcons";
import { useState } from "react";
import { FaLock } from "react-icons/fa";
import { Link } from "react-router-dom";
import useResetPassword from "@/hooks/AuthHooks/useResetPassword";
import { useAuthStore } from "@/stores/authStore";
import BtnLoader from "../../comps/loader/BtnLoader.tsx";
import { toast } from "react-toastify";

const RetypePassword = () => {
    const [password, setPassword] = useState("");
    const { ResetPasswordFn, isPending } = useResetPassword();
    const { email, otp } = useAuthStore();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!email || !otp) {
            toast.error("Some details are missing or in correct")
            console.log(email, otp, password)
            return;
        }
        ResetPasswordFn({ email, otp, password });
    };

    return (
        <AuthLayout isLogin>
            <div className="w-full max-w-sm">
                <div className="flex flex-col justify-center items-center gap-0 mb-8">
                    <h2 className="text-3xl font-bold mb-2 text-[#00004C]">
                        New Password
                    </h2>
                    <div className="h-[5px] w-[100px] bg-[#0000FF]" />
                </div>

                <form onSubmit={handleSubmit}>
                    <InputField
                        type="password"
                        placeholder="Enter Your New Password"
                        icon={<FaLock />}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />


                    <button
                        type="submit"
                        disabled={isPending}
                        className="w-full bg-[#00004C] text-white font-bold py-3 rounded-full text-lg hover:bg-[#0088FF] transition cursor-pointer disabled:opacity-50"
                    >
                        {isPending ? <BtnLoader /> : "Reset My Password"}
                    </button>
                </form>

                <Link
                    to="/login"
                    className="block text-sm italic text-[#00004C] mt-6 hover:underline"
                >
                    Back To Login
                </Link>

                <SocialIcons />
            </div>
        </AuthLayout>
    );
};

export default RetypePassword;
