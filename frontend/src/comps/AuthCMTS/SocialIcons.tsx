import { FaFacebook, FaYoutube, FaLinkedin } from 'react-icons/fa'
import { FcGoogle } from 'react-icons/fc'

const socials = [
  { icon: <FaFacebook />, color: 'text-blue-600' },
  { icon: <FcGoogle />, color: '' },
  { icon: <FaYoutube />, color: 'text-red-600' },
  { icon: <FaLinkedin />, color: 'text-blue-700' },
]

const SocialIcons = () => (
  <div className="mt-12 flex justify-center items-center space-x-6">
    {socials.map(({ icon, color }, i) => (
      <a key={i} href="#" className={`${color} text-4xl hover:opacity-80`}>
        {icon}
      </a>
    ))}
  </div>
)

export default SocialIcons