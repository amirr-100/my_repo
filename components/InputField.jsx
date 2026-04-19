'use client'

import { forwardRef } from 'react'

const InputField = forwardRef(function InputField({ 
  label,
  type = 'text',
  icon: Icon,
  placeholder,
  value,
  onChange,
  name,
  required = false,
  className = '',
  inputClassName = '',
  ...props 
}, ref) {
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
          ref={ref}
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          className={`w-full ${Icon ? 'pl-12 pr-4' : 'px-4'} py-4 border-2 border-gray-200 rounded-xl focus:border-ocean-blue focus:outline-none transition-colors bg-white ${inputClassName}`}
          {...props}
        />
      </div>
    </div>
  )
})

export default InputField