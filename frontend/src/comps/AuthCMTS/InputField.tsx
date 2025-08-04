import React from 'react'

interface InputFieldProps {
  type: string
  placeholder: string
  icon: React.ReactNode
  value?: string
  onChange?: React.ChangeEventHandler<HTMLInputElement>
}

const InputField = ({
  type,
  placeholder,
  icon,
  value,
  onChange,
}: InputFieldProps) => (
  <div className="mb-4 relative">
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="w-full pr-11 pl-4 py-2 border-b-2 border-gray-300 focus:outline-none focus:border-[#0088FF] text-lg"
    />
    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-xl">
      {icon}
    </span>
  </div>
)

export default InputField