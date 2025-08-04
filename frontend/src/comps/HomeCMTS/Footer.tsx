import { FaBehance, FaDribbble, FaLinkedinIn, FaTwitter } from 'react-icons/fa'

const Footer = () => {
  return (
          <footer className="bg-gray-900 text-white py-12">
        <div className="w-4/5 mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center mb-4">
              <FaDribbble className="text-blue-500 text-2xl mr-2" />
              <span className="font-semibold text-xl">SatyamStudio</span>
            </div>
            <p className="text-sm text-gray-400">
              OurStudio is a digital agency UX/UI Design & Website Development located in Ohio, United States of America.
            </p>
            <p className="text-sm text-gray-400 mt-6">
              © 2025 Satyam Studio
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-lg mb-4">Get In Touch</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li className="flex items-start space-x-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11c1.657 0 3-1.343 3-3S13.657 5 12 5s-3 1.343-3 3 1.343 3 3 3z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 22s8-4.5 8-10a8 8 0 10-16 0c0 5.5 8 10 8 10z" />
                </svg>
                <span>839 N 90th St. South Gate, CA 90280</span>
              </li>
              <li className="flex items-center space-x-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12l-4-4-4 4m0 0l4 4 4-4" />
                </svg>
                <span>Ourstudio@hello.com</span>
              </li>
              <li className="flex items-center space-x-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3l3 7L9 17H5a2 2 0 01-2-2V5z" />
                </svg>
                <span>+1 386-688-3295</span>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-lg mb-4">Follow Us</h4>
            <div className="flex space-x-4 mb-4">
              <a href="#" className="hover:text-white text-gray-400"><FaDribbble size={20} /></a>
              <a href="#" className="hover:text-white text-gray-400"><FaBehance size={20} /></a>
              <a href="#" className="hover:text-white text-gray-400"><FaLinkedinIn size={20} /></a>
              <a href="#" className="hover:text-white text-gray-400"><FaTwitter size={20} /></a>
            </div>
            <p className="text-sm text-gray-400">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-lg mb-2">Join a Newsletter</h4>
            <p className="text-sm text-gray-400 mb-4">Your Email</p>
            <div className="flex">
              <input
                type="email"
                placeholder="Enter Your Email"
                className="flex-1 p-2 text-white bg-[#4F5A68] border-none"
              />
              <button className="bg-blue-600 px-4 py-2 rounded-r-md hover:bg-blue-700">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </footer>
  )
}

export default Footer