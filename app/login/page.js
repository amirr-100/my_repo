'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Mountain, Mail, Lock, Eye, EyeOff, ArrowRight, Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)
    
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    if (email && password) {
      const storedName = localStorage.getItem('userName') || 'Traveler'
      localStorage.setItem('userName', storedName)
      router.push('/home')
    } else {
      setError('Please fill in all fields')
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-soft-white flex">
      {/* Left side - Form */}
      <motion.div 
        className="flex-1 flex items-center justify-center px-8 py-12"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="w-full max-w-md">
          <motion.div 
            className="mb-10"
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
            <h1 className="text-3xl font-bold text-dark-text mb-2 font-serif">Welcome Back</h1>
            <p className="text-gray-text">Sign in to continue your adventure</p>
          </motion.div>

          <motion.form 
            className="space-y-6"
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

            <div>
              <label className="block text-sm font-medium text-dark-text mb-2">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-text" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:border-ocean-blue focus:outline-none transition-colors bg-white"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-dark-text mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-text" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full pl-12 pr-12 py-4 border-2 border-gray-200 rounded-xl focus:border-ocean-blue focus:outline-none transition-colors bg-white"
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
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-ocean-blue focus:ring-ocean-blue" />
                <span className="text-sm text-gray-text">Remember me</span>
              </label>
              <a href="#" className="text-sm text-ocean-blue hover:text-ocean-blue-dark font-medium">
                Forgot password?
              </a>
            </div>

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
                  Sign In <ArrowRight className="w-5 h-5" />
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
            Don't have an account?{' '}
            <a href="/signup" className="text-ocean-blue hover:text-ocean-blue-dark font-semibold">
              Sign up
            </a>
          </motion.p>
        </div>
      </motion.div>

      {/* Right side - Visual */}
      <motion.div 
        className="hidden lg:flex flex-1 bg-gradient-to-br from-ocean-blue to-tropical-green items-center justify-center p-12"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-md text-center text-white">
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
            Continue Your Journey
          </motion.h2>
          
          <motion.p 
            className="text-lg opacity-90"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            Access your saved destinations, personalized recommendations, and exclusive travel deals.
          </motion.p>

          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-3 h-3 bg-white/20 rounded-full"
              initial={{ 
                x: Math.random() * 400 - 200, 
                y: Math.random() * 400 - 200 
              }}
              animate={{
                y: [null, Math.random() * -100 - 50],
                opacity: [0.2, 0.6, 0.2]
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2
              }}
            />
          ))}
        </div>
      </motion.div>
    </div>
  )
}
