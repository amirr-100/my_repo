'use client'

import { motion } from 'framer-motion'
import { Loader2 } from 'lucide-react'

export default function Button({ 
  children,
  type = 'submit',
  variant = 'primary',
  isLoading = false,
  disabled = false,
  className = '',
  icon: Icon,
  ...props 
}) {
  const baseClasses = 'w-full py-4 rounded-xl font-semibold flex items-center justify-center gap-2 shadow-lg disabled:opacity-50'
  
  const variantClasses = {
    primary: 'bg-gold text-white hover:bg-gold-dark',
    secondary: 'bg-ocean-blue text-white hover:bg-ocean-blue-dark',
    outline: 'border-2 border-gray-200 bg-white text-dark-text hover:border-ocean-blue hover:text-ocean-blue'
  }

  return (
    <motion.button
      type={type}
      disabled={disabled || isLoading}
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      whileHover={{ scale: 1.02, boxShadow: '0 10px 30px rgba(0, 0, 0, 0.15)' }}
      whileTap={{ scale: 0.98 }}
      {...props}
    >
      {isLoading ? (
        <Loader2 className="w-5 h-5 animate-spin" />
      ) : (
        <>
          {children}
          {Icon && <Icon className="w-5 h-5" />}
        </>
      )}
    </motion.button>
  )
}