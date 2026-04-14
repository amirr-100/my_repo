'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Mountain, Mail, Lock, Eye, EyeOff, User, Phone, ArrowRight, Loader2, Check } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function SignupPage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match')
      return
    }
    
    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters')
      return
    }
    
    setIsLoading(true)
    
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    if (formData.firstName && formData.lastName && formData.email && formData.password) {
      localStorage.setItem('userName', formData.firstName)
      router.push('/home')
    } else {
      setError('Please fill in all required fields')
      setIsLoading(false)
    }
  }

  const passwordRequirements = [
    { met: formData.password.length >= 8, text: 'At least 8 characters' },
    { met: /[A-Z]/.test(formData.password), text: 'One uppercase letter' },
    { met: /[0-9]/.test(formData.password), text: 'One number' },
    { met: /[^A-Za-z0-9]/.test(formData.password), text: 'One special character' }
  ]

  return (
    <div className="min-h-screen bg-soft-white flex">
      {/* Left side - Visual */}
      <motion.div 
        className="hidden lg:flex flex-1 bg-gradient-to-br from-tropical-green to-ocean-blue items-center justify-center p-12 relative overflow-hidden"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-md text-center text-white relative z-10">
          <motion.div
            className="w-32 h-32 mx-auto mb-8 rounded-full bg-white/20 flex items-center justify-center"
            animate={{ 
              y: [0, -15, 0],
              rotate: [0, 5, -5, 0]
            }}
            transition={{ 
              duration: 3,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
          >
            <Mountain className="w-16 h-16" />
          </motion.div>
          
          <motion.h2 
            className="text-4xl font-bold mb-4 font-serif"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            Start Your Adventure
          </motion.h2>
          
          <motion.p 
            className="text-lg opacity-90 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            Create an account to discover amazing destinations, save your favorites, and get personalized travel recommendations.
          </motion.p>

          <motion.div
            className="flex justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            {['50+ Destinations', 'Expert Guides', 'Local Tips'].map((item, i) => (
              <motion.div
                key={item}
                className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.6 + i * 0.1 }}
              >
                {item}
              </motion.div>
            ))}
          </motion.div>
        </div>

        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-4 h-4 bg-white/10 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`
            }}
            animate={{
              y: [0, -50, 0],
              opacity: [0.1, 0.4, 0.1],
              scale: [1, 1.5, 1]
            }}
            transition={{
              duration: 4 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2
            }}
          />
        ))}
      </motion.div>

      {/* Right side - Form */}
      <motion.div 
        className="flex-1 flex items-center justify-center px-8 py-12 overflow-y-auto"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="w-full max-w-md py-8">
          <motion.div 
            className="mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <motion.div 
              className="flex items-center gap-3 mb-6 cursor-pointer"
              whileHover={{ scale: 1.05 }}
              onClick={() => router.push('/')}
            >
              <div className="w-12 h-12 bg-ocean-blue rounded-xl flex items-center justify-center">
                <Mountain className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-dark-text">Sierra Explorer</span>
            </motion.div>
            <h1 className="text-3xl font-bold text-dark-text mb-2 font-serif">Create Account</h1>
            <p className="text-gray-text">Join thousands of travelers exploring Sierra Leone</p>
          </motion.div>

          <motion.form 
            className="space-y-5"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            onSubmit={handleSubmit}
          >
            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl text-sm"
                >
                  {error}
                </motion.div>
              )}
            </AnimatePresence>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-dark-text mb-2">First Name</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-text" />
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="Enter your first name"
                    className="w-full pl-12 pr-4 py-3.5 border-2 border-gray-200 rounded-xl focus:border-ocean-blue focus:outline-none transition-colors bg-white text-sm"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-dark-text mb-2">Last Name</label>
                <div className="relative">
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder="Enter your last name"
                    className="w-full pl-4 pr-4 py-3.5 border-2 border-gray-200 rounded-xl focus:border-ocean-blue focus:outline-none transition-colors bg-white text-sm"
                    required
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-dark-text mb-2">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-text" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  className="w-full pl-12 pr-4 py-3.5 border-2 border-gray-200 rounded-xl focus:border-ocean-blue focus:outline-none transition-colors bg-white text-sm"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-dark-text mb-2">Phone Number (Optional)</label>
              <div className="relative">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-text" />
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+232 XX XXX XXXX"
                  className="w-full pl-12 pr-4 py-3.5 border-2 border-gray-200 rounded-xl focus:border-ocean-blue focus:outline-none transition-colors bg-white text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-dark-text mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-text" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Create a strong password"
                  className="w-full pl-12 pr-12 py-3.5 border-2 border-gray-200 rounded-xl focus:border-ocean-blue focus:outline-none transition-colors bg-white text-sm"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-text hover:text-dark-text transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              
              <div className="mt-3 space-y-2">
                {passwordRequirements.map((req, i) => (
                  <motion.div 
                    key={i}
                    className="flex items-center gap-2 text-xs"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <div className={`w-4 h-4 rounded-full flex items-center justify-center ${req.met ? 'bg-tropical-green' : 'bg-gray-200'}`}>
                      {req.met && <Check className="w-3 h-3 text-white" />}
                    </div>
                    <span className={req.met ? 'text-tropical-green' : 'text-gray-text'}>{req.text}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-dark-text mb-2">Confirm Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-text" />
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm your password"
                  className="w-full pl-12 pr-12 py-3.5 border-2 border-gray-200 rounded-xl focus:border-ocean-blue focus:outline-none transition-colors bg-white text-sm"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-text hover:text-dark-text transition-colors"
                >
                  {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <label className="flex items-start gap-3 cursor-pointer mt-2">
              <input type="checkbox" className="w-4 h-4 mt-1 rounded border-gray-300 text-ocean-blue focus:ring-ocean-blue" required />
              <span className="text-sm text-gray-text">
                I agree to the{' '}
                <a href="#" className="text-ocean-blue hover:text-ocean-blue-dark font-medium">Terms of Service</a>
                {' '}and{' '}
                <a href="#" className="text-ocean-blue hover:text-ocean-blue-dark font-medium">Privacy Policy</a>
              </span>
            </label>

            <motion.button
              type="submit"
              disabled={isLoading}
              className="w-full py-4 bg-gold text-white rounded-xl font-semibold flex items-center justify-center gap-2 shadow-lg disabled:opacity-50"
              whileHover={{ scale: 1.02, boxShadow: '0 10px 30px rgba(202, 138, 4, 0.3)' }}
              whileTap={{ scale: 0.98 }}
            >
              {isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  Create Account <ArrowRight className="w-5 h-5" />
                </>
              )}
            </motion.button>
          </motion.form>

          <motion.p 
            className="mt-8 text-center text-gray-text"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            Already have an account?{' '}
            <a href="/login" className="text-ocean-blue hover:text-ocean-blue-dark font-semibold">
              Sign in
            </a>
          </motion.p>
        </div>
      </motion.div>
    </div>
  )
}
