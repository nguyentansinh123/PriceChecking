import React from 'react'

const Deals = () => {
  return (
            <div
                className="my-6 p-6 rounded-lg bg-cover bg-center text-center flex flex-col justify-center items-center min-h-[150px]"
                style={{
                    backgroundImage: `url(https://imgs.search.brave.com/bqyOn3t8Xn3uVakZMkP0NLnYAbGbDs40j4UD7tAoN-Y/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvOTQ1/ODI4ODY0L3ZlY3Rv/ci93b3Jkcy1ob3Qt/ZGVhbHMtd2l0aC1m/bGFtZXMtb24tdGhl/LWJyb3duLWJhY2tn/cm91bmQtdmVjdG9y/LWlsbHVzdHJhdGlv/bi5qcGc_cz02MTJ4/NjEyJnc9MCZrPTIw/JmM9dGpVNEdSQ1Bj/LW05SjFKZXJkRkJX/Vy1WSlRnUWtqeFNq/djJpbTVpXy1DMD0)`,
                }}
            >
                <a
                    href="#"
                    className="inline-block mt-2 px-6 py-2 bg-white text-blue-700 font-bold rounded-full shadow-lg hover:bg-gray-100 transform hover:scale-105 transition-all duration-300"
                >
                    See Price →
                </a>
            </div>
  )
}

export default Deals
