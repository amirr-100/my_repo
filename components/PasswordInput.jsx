'use client'

import { useState } from 'react'
import { Lock, Eye, EyeOff } from 'lucide-react'

export default function PasswordInput({ 
  label,
  value,
  onChange,
  name,
  placeholder = 'Enter your password',
  required = false,
  showToggle = true,
  className = '',
  inputClassName = ''
}) {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className={className}>
      {label && (
        <label className="block text-sm font-medium text-dark-text mb-2">
          {label}
        </label>
      )}
      <div className="relative">
        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-text" />
        <input
          type={showPassword ? 'text' : 'password'}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          className={`w-full pl-12 pr-12 py-4 border-2 border-gray-200 rounded-xl focus:border-ocean-blue focus:outline-none transition-colors bg-white ${inputClassName}`}
        />
        {showToggle && (
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