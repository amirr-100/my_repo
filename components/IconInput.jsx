'use client'

import { useState } from 'react'
import { Search, Eye, EyeOff } from 'lucide-react'

export default function IconInput({ 
  label,
  type = 'text',
  icon: Icon = Search,
  placeholder,
  value,
  onChange,
  name,
  required = false,
  showPasswordToggle = false,
  className = '',
  inputClassName = '',
  ...props 
}) {
  const [showPassword, setShowPassword] = useState(false)
  const isPassword = showPasswordToggle

  return (
    <div className={className}>
      {label && (
        <label className="block text-sm font-medium text-dark-text mb-2">
          {label}
        </label>
      )}
      <div className="relative">
        {Icon && (
          <Icon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-text" />
        )}
        <input
          type={isPassword ? (showPassword ? 'text' : 'password') : type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          className={`w-full ${Icon ? 'pl-12 pr-12' : 'px-4'} py-4 border-2 border-gray-200 rounded-xl focus:border-ocean-blue focus:outline-none transition-colors bg-white ${inputClassName}`}
          {...props}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-text hover:text-dark-text transition-colors"
          >
            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </button>
        )}
      </div>
    </div>
  )
}