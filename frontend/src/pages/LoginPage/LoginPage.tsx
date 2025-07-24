import { FaRegEnvelope, FaLock, FaFacebook, FaYoutube, FaLinkedin } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import cloudImage from '../../assets/cloud.png';

const LoginPage = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="flex w-[1200px] h-[650px] bg-white rounded-2xl overflow-hidden shadow-lg relative">
        <div
          className="flex-[7] flex items-center justify-center relative overflow-hidden"
          style={{
            background: "#00004C",
            clipPath: "polygon(0 0, 100% 0, 85% 100%, 0 100%)",
          }}
        >
          <img src={cloudImage} alt="cloud" className="absolute top-[30px] left-[-150px] w-[400px] opacity-90" />
          <img src={cloudImage} alt="cloud" className="absolute top-[-60px] left-[320px] w-[420px] opacity-80" />
          <img src={cloudImage} alt="cloud" className="absolute bottom-[-30px] left-[-120px] w-[480px] opacity-70" />
          <img src={cloudImage} alt="cloud" className="absolute bottom-[180px] left-[200px] w-[490px] opacity-80" />
          <span className="text-white text-4xl font-bold z-10">Logo Here</span>
          <div
            className="absolute top-0 right-[-40px] h-full w-[80px] pointer-events-none"
            style={{
              background: "linear-gradient(120deg, rgba(0,0,0,0.09) 25%, rgba(0,0,0,0) 75%)",
              filter: "blur(6px)",
              borderRadius: "0 40px 40px 0",
            }}
          />
        </div>
        <div className="flex-[3] flex flex-col items-center justify-center p-10">
          <div className="w-full max-w-sm">
            <div className='flex flex-col justify-center items-center gap-0 mb-8'>
              <h2 className="text-3xl font-bold mb-2 text-[#00004C] flex justify-center items-center">Login</h2>
              <div className='h-[5px] w-[50px] bg-[#0000FF]'></div>
            </div>
            <form>
              <div className="mb-4 relative">
                <input
                  type="text"
                  placeholder="Username"
                  className="w-full pr-11 pl-4 py-2 border-b-2 border-gray-300 focus:outline-none focus:border-[#0088FF] text-lg"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-xl">
                  <FaRegEnvelope />
                </span>
              </div>
              <div className="mb-4 relative">
                <input
                  type="password"
                  placeholder="Password"
                  className="w-full pr-11 pl-4 py-2 border-b-2 border-gray-300 focus:outline-none focus:border-[#0088FF] text-lg"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-xl">
                  <FaLock />
                </span>
              </div>
              <div className="flex justify-between items-center text-sm mb-6">
                <label className='flex items-center'>
                  <input type="checkbox" className="mr-1" /> <span>Remember password</span>
                </label>
                <a href="#" className="text-[#00004C] font-normal hover:underline italic ">
                  Forgot password?
                </a>
              </div>
              <button
                type="submit"
                className="w-full bg-[#00004C] text-white font-bold py-3 rounded-full text-lg hover:bg-[#0088FF] transition cursor-pointer"
              >
                Login
              </button>
            </form>
            <div className="mt-12 flex justify-center items-center space-x-6">
              <a href="#" className="text-blue-600 text-4xl hover:opacity-80"><FaFacebook /></a>
              <a href="#" className="text-4xl hover:opacity-80"><FcGoogle /></a>
              <a href="#" className="text-red-600 text-4xl hover:opacity-80"><FaYoutube /></a>
              <a href="#" className="text-blue-700 text-4xl hover:opacity-80"><FaLinkedin /></a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
