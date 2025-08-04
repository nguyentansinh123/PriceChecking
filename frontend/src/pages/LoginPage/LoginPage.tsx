import { FaRegEnvelope, FaLock } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import AuthLayout from '../../comps/AuthCMTS/AuthLayoutProps'
import InputField from '../../comps/AuthCMTS/InputField'
import SocialIcons from '../../comps/AuthCMTS/SocialIcons'

const LoginPage = () => (
  <AuthLayout isLogin>
    <div className="w-full max-w-sm">
      <div className="flex flex-col justify-center items-center gap-0 mb-8">
        <h2 className="text-3xl font-bold mb-2 text-[#00004C]">Login</h2>
        <div className="h-[5px] w-[50px] bg-[#0000FF]" />
      </div>

      <form>
        <InputField type="text" placeholder="Username" icon={<FaRegEnvelope />} />
        <InputField type="password" placeholder="Password" icon={<FaLock />} />

        <div className="flex justify-between items-center text-sm mb-6">
          <label className="flex items-center">
            <input type="checkbox" className="mr-1" /> Remember password
          </label>
          <Link to={"/forgot-password"} className="text-[#00004C] italic hover:underline">
            Forgot password?
          </Link>
        </div>

        <button className="w-full bg-[#00004C] text-white font-bold py-3 rounded-full text-lg hover:bg-[#0088FF] transition cursor-pointer">
          Login
        </button>
      </form>

      <Link to="/register" className="block text-sm italic text-[#00004C] mt-6 hover:underline">
        Don't have an account? Register Here
      </Link>

      <SocialIcons />
    </div>
  </AuthLayout>
)

export default LoginPage
