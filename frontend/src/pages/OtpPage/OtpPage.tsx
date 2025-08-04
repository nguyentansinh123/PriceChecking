import React, { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaArrowLeft, FaLock } from 'react-icons/fa'

const OtpPage = () => {
  const navigate = useNavigate()
  const [otp, setOtp] = useState<string[]>(Array(6).fill(''))
  const inputsRef = useRef<Array<HTMLInputElement | null>>([])
  const [timer, setTimer] = useState(300) 

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0))
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60)
    const s = secs % 60
    return `${m}:${String(s).padStart(2, '0')}`
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, idx: number) => {
    const val = e.target.value.replace(/\D/, '')
    const next = [...otp]
    next[idx] = val
    setOtp(next)
    if (val && idx < otp.length - 1) {
      inputsRef.current[idx + 1]?.focus()
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, idx: number) => {
    if (e.key === 'Backspace' && !otp[idx] && idx > 0) {
      inputsRef.current[idx - 1]?.focus()
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const code = otp.join('')
    console.log('submitted code:', code)
  }

  const handlePaste = (e: React.ClipboardEvent<HTMLDivElement>): void => {
    e.preventDefault()
    const pasted = e.clipboardData.getData('Text').replace(/\D/g, '')
    if (!pasted) return
    const chars = pasted.split('').slice(0, otp.length)
    const next = [...otp]
    chars.forEach((c, i) => {
      next[i] = c
    })
    setOtp(next)
    const last = chars.length - 1
    if (last >= 0) inputsRef.current[last]?.focus()
  }

  return (
    <div className='w-full h-[100vh] flex justify-center items-center bg-[#D9D9D9]'>
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        <div className="flex items-center mb-6">
          <button onClick={() => navigate("/login")} className="text-2xl text-gray-600 cursor-pointer">
                <FaArrowLeft/>
          </button>
          <div className="flex-1 flex justify-center">
            <div className="bg-[#00004C] rounded-full w-16 h-16 flex items-center justify-center">
              <FaLock className="text-white text-2xl" />
            </div>
          </div>
        </div>

        <h2 className="text-3xl font-bold text-center mb-2">Fill in the Code</h2>
        <p className="text-sm text-center text-gray-500 mb-1">
          We send a code by email and SMS
        </p>
        <p className="text-xs text-center text-gray-400 mb-4">
          The code has been sent to you@example.com
        </p>
        <p className="text-center font-medium mb-6">{formatTime(timer)}</p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div
            className="flex justify-center space-x-2"
            onPaste={handlePaste}
          >
            {otp.map((digit, idx) => (
              <input
                key={idx}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                ref={(el) => { inputsRef.current[idx] = el }}
                onChange={(e) => handleChange(e, idx)}
                onKeyDown={(e) => handleKeyDown(e, idx)}
                className="w-12 h-12 border border-gray-300 rounded-md text-center text-xl focus:border-[#00004C] focus:outline-none"
              />
            ))}
          </div>

          <button
            type="submit"
            className="w-full bg-[#00004C] text-white font-bold py-3 rounded-full text-lg hover:bg-[#0088FF] transition cursor-pointer"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  )
}

export default OtpPage