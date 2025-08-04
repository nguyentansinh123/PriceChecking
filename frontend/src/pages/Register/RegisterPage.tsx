import { FaRegEnvelope, FaLock } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import AuthLayout from '../../comps/AuthCMTS/AuthLayoutProps'
import InputField from '../../comps/AuthCMTS/InputField'
import SocialIcons from '../../comps/AuthCMTS/SocialIcons'

const RegisterPage = () => (
  <AuthLayout isLogin={false}>
    <div className="w-full max-w-sm">
      <div className="flex flex-col justify-center items-center mb-8">
        <h2 className="text-3xl font-bold mb-2 text-[#00004C]">Register</h2>
        <div className="h-[5px] w-[50px] bg-[#0000FF]" />
      </div>

      <form>
        <InputField type="text" placeholder="Username" icon={<FaRegEnvelope />} />
        <InputField type="password" placeholder="Password" icon={<FaLock />} />
        <InputField type="password" placeholder="Confirm Password" icon={<FaLock />} />

        <Link to="/login" className="block text-sm italic text-[#00004C] mb-6 hover:underline">
          Already have an account?
        </Link>

        <button
          type="submit"
          className="w-full bg-[#00004C] text-white font-bold py-3 rounded-full text-lg hover:bg-[#0088FF] transition"
        >
          Register
        </button>
      </form>

      <SocialIcons />
    </div>
  </AuthLayout>
)

export default RegisterPage