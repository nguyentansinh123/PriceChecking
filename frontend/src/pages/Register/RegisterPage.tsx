import { FaRegEnvelope, FaLock, FaUser } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import AuthLayout from '../../comps/AuthCMTS/AuthLayoutProps'
import InputField from '../../comps/AuthCMTS/InputField'
import SocialIcons from '../../comps/AuthCMTS/SocialIcons'
import { useState } from 'react'
import useNRegister from '@/hooks/AuthHooks/useNRegister'
import BtnLoader from '@/comps/loader/BtnLoader'

const RegisterPage = () => {

  const [registerData, setRegisterData] = useState({
    name: "",
    email: "",
    password: ""
  })

  const {isPending, NRegisterMutation} = useNRegister();

  const handleRegister = (e: React.FormEvent<HTMLFormElement>) =>{
    e.preventDefault()
    NRegisterMutation(registerData)
    
  }

return  (
    <AuthLayout isLogin={false}>
      <div className="w-full max-w-sm">
        <div className="flex flex-col justify-center items-center mb-8">
          <h2 className="text-3xl font-bold mb-2 text-[#00004C]">Register</h2>
          <div className="h-[5px] w-[50px] bg-[#0000FF]" />
        </div>

        <form onSubmit={handleRegister}>
          <InputField type="text" placeholder="Username" icon={<FaRegEnvelope />} value={registerData.name} onChange={(e)=> setRegisterData({...registerData, name: e.target.value})} />
          <InputField type="email" placeholder="Email" icon={<FaUser />} value={registerData.email} onChange={(e)=> setRegisterData({...registerData, email: e.target.value})}/>
          <InputField type="password" placeholder="Password" icon={<FaLock />} value={registerData.password} onChange={(e)=> setRegisterData({...registerData, password: e.target.value})}/>

          <Link to="/login" className="block text-sm italic text-[#00004C] mb-6 hover:underline">
            Already have an account?
          </Link>

          <button
            type="submit"
            className="w-full bg-[#00004C] text-white font-bold py-3 rounded-full text-lg hover:bg-[#0088FF] transition cursor-pointer"
          >
            {
              isPending ? (
                <>
                  <span className='loading loading-spinner loading-xs'></span>
                  <BtnLoader/>
                </>
              ) : (
                "Create Account"
              )
            }
          </button>
        </form>

        <SocialIcons />
      </div>
    </AuthLayout>
)
}

export default RegisterPage