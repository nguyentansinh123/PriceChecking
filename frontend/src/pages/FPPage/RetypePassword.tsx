import AuthLayout from "@/comps/AuthCMTS/AuthLayoutProps"
import InputField from "@/comps/AuthCMTS/InputField"
import SocialIcons from "@/comps/AuthCMTS/SocialIcons"
import { useState } from "react"
import { FaEnvelope, FaLock, FaRegEnvelope } from "react-icons/fa"
import { Link } from "react-router-dom"

const RetypePassword = () => {

    const [data, setData] = useState({
        email: "",
        password: ""
    })


    return (
        <AuthLayout isLogin>
            <div className="w-full max-w-sm">
                <div className="flex flex-col justify-center items-center gap-0 mb-8">
                    <h2 className="text-3xl font-bold mb-2 text-[#00004C]">
                        New Password
                    </h2>
                    <div className="h-[5px] w-[100px] bg-[#0000FF]" />
                </div>

                <form>
                    <InputField
                        type="Password"
                        placeholder="Enter Your New Password"
                        icon={<FaLock />}
                        value={data.password}
                        onChange={e => setData(prevData => ({ ...prevData, password: e.target.value }))}
                    />
                    <InputField
                        type="Email"
                        placeholder="Enter Your Email"
                        icon={<FaEnvelope />}
                        value={data.email}
                        onChange={e => setData(prevData => ({ ...prevData, email: e.target.value }))}

                    />


                    <button className="w-full bg-[#00004C] text-white font-bold py-3 rounded-full text-lg hover:bg-[#0088FF] transition cursor-pointer">Reset My Password</button>
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
    )
}

export default RetypePassword
