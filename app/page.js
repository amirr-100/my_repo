'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useScroll, useTransform, useSpring, useInView } from 'framer-motion'
import { 
  Mountain, Waves, TreePine, Landmark, Camera, MapPin, Star, Menu, X, 
  ChevronRight, Play, Heart, Compass, Map, Utensils, Hotel, MessageCircle,
  Calendar, Sparkles, Globe, ArrowRight, Mail, Phone, Facebook, Twitter, 
  Instagram, Youtube, Quote, Send, Check, ExternalLink, PlayCircle
} from 'lucide-react'

const SplashScreen = ({ onComplete }) => {
  const [progress, setProgress] = useState(0)
  
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          setTimeout(onComplete, 1000)
          return 100
        }
        return prev + 1
      })
    }, 50)
    
    return () => clearInterval(interval)
  }, [onComplete])
  
  return (
    <motion.div 
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ background: 'linear-gradient(135deg, #0891b2 0%, #0e7490 50%, #047857 100%)' }}
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: 'easeInOut' }}
    >
      <div className="text-center text-white">
        <motion.div
          className="w-32 h-32 mx-auto mb-8 rounded-full flex items-center justify-center"
          style={{ background: 'rgba(255, 255, 255, 0.2)' }}
          animate={{ 
            scale: [1, 1.1, 1],
            rotate: [0, 5, -5, 0]
          }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
        >
          <Mountain className="w-16 h-16" />
        </motion.div>
        
        <motion.h1 
          className="text-5xl font-bold mb-3 font-serif"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Sierra Explorer
        </motion.h1>
        
        <motion.p 
          className="text-lg opacity-90 mb-10"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          Discover the Beauty of Sierra Leone
        </motion.p>
        
        <motion.div 
          className="w-64 h-2 bg-white/30 rounded-full mx-auto overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          <motion.div 
            className="h-full bg-gradient-to-r from-yellow-400 to-yellow-300 rounded-full"
            style={{ width: `${progress}%` }}
            transition={{ duration: 0.1 }}
          />
        </motion.div>
        
        <motion.p 
          className="mt-4 text-sm opacity-70"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.7 }}
          transition={{ delay: 0.9 }}
        >
          {progress < 100 ? 'Loading amazing experiences...' : 'Welcome!'}
        </motion.p>
      </div>
      
      {/* Floating particles */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-3 h-3 bg-white/20 rounded-full"
          initial={{ 
            x: Math.random() * 400 - 200, 
            y: Math.random() * 400 - 200 
          }}
          animate={{
            y: [null, Math.random() * -100 - 50],
            opacity: [0.3, 0.8, 0.3]
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2
          }}
        />
      ))}
    </motion.div>
  )
}

import { useRouter } from 'next/navigation'

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const router = useRouter()
  
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])
  
  const navLinks = ['Features', 'Destinations', 'About', 'Contact']
  
  return (
    <motion.nav 
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled ? 'bg-ocean-blue/95 backdrop-blur-md shadow-lg' : 'bg-ocean-blue'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <motion.div 
          className="flex items-center gap-3 text-white cursor-pointer"
          whileHover={{ scale: 1.05 }}
          onClick={() => router.push('/')}
        >
          <Mountain className="w-8 h-8" />
          <span className="text-xl font-semibold">Sierra Explorer</span>
        </motion.div>
        
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link, i) => (
            <motion.a
              key={link}
              href={`#${link.toLowerCase()}`}
              className="text-white/90 hover:text-gold-light transition-colors font-medium"
              whileHover={{ y: -2 }}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              {link}
            </motion.a>
          ))}
        </div>
        
        <div className="hidden md:flex items-center gap-4">
          <motion.button 
            className="px-5 py-2 text-white border-2 border-tropical-green rounded-lg font-medium hover:bg-tropical-green transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => router.push('/login')}
          >
            Log In
          </motion.button>
          <motion.button 
            className="px-5 py-2 bg-ocean-blue-dark text-white rounded-lg font-medium hover:bg-ocean-blue transition-colors shadow-lg"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => router.push('/signup')}
          >
            Get Started
          </motion.button>
        </div>
        
        <motion.button 
          className="md:hidden text-white"
          whileTap={{ scale: 0.9 }}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </motion.button>
      </div>
      
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            className="md:hidden bg-ocean-blue-dark/95 backdrop-blur-md px-6 py-6"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
          >
            {navLinks.map((link, i) => (
              <motion.a
                key={link}
                href={`#${link.toLowerCase()}`}
                className="block py-3 text-white/90 hover:text-gold-light transition-colors font-medium"
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: i * 0.1 }}
                onClick={() => setMobileMenuOpen(false)}
              >
                {link}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}

const HeroSection = () => {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start']
  })
  
  const y = useTransform(scrollYProgress, [0, 1], [0, 200])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  
  const stats = [
    { number: '50+', label: 'Destinations' },
    { number: '10K+', label: 'Happy Travelers' },
    { number: '4.9', label: 'App Rating' }
  ]
  
  return (
    <section ref={ref} className="min-h-screen flex items-center pt-24 pb-16 px-6 overflow-hidden">
      <motion.div 
        className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center"
        style={{ y, opacity }}
      >
        <div>
          <motion.div
            className="inline-flex items-center gap-2 bg-ocean-blue/10 text-ocean-blue px-4 py-2 rounded-full mb-6"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Sparkles className="w-4 h-4" />
            <span className="text-sm font-medium">Your Adventure Awaits</span>
          </motion.div>
          
          <motion.h1 
            className="text-5xl lg:text-6xl font-bold text-dark-text mb-6 leading-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            Explore the Natural Wonders of{' '}
            <span className="gradient-text">Sierra Leone</span>
          </motion.h1>
          
          <motion.p 
            className="text-lg text-gray-text mb-8 max-w-lg"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            Your ultimate travel companion for discovering pristine beaches, lush mountains, 
            and rich cultural heritage. Start your adventure today.
          </motion.p>
          
          <motion.div 
            className="flex flex-wrap gap-4 mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <motion.button 
              className="px-8 py-4 bg-gold text-white rounded-xl font-semibold flex items-center gap-2 shadow-lg hover:bg-gold-dark transition-colors"
              whileHover={{ scale: 1.05, boxShadow: '0 20px 40px rgba(202, 138, 4, 0.3)' }}
              whileTap={{ scale: 0.95 }}
            >
              Start Exploring <ArrowRight className="w-5 h-5" />
            </motion.button>
            <motion.button 
              className="px-8 py-4 border-2 border-ocean-blue text-ocean-blue rounded-xl font-semibold flex items-center gap-2 hover:bg-ocean-blue hover:text-white transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <PlayCircle className="w-5 h-5" /> Watch Demo
            </motion.button>
          </motion.div>
          
          <motion.div 
            className="flex gap-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            {stats.map((stat, i) => (
              <motion.div 
                key={stat.label}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 + i * 0.1 }}
              >
                <div className="text-3xl font-bold text-ocean-blue">{stat.number}</div>
                <div className="text-sm text-gray-text">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
        
        <motion.div 
          className="relative h-[500px]"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
        >
          <ImageCarousel />
        </motion.div>
      </motion.div>
    </section>
  )
}

const ImageCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  
  const destinations = [
    { 
      name: 'Tokeh Beach',
      description: 'Pristine white sand beaches',
      image: 'https://picsum.photos/seed/beach-carousel/800/600'
    },
    { 
      name: 'Bintumani Peak',
      description: 'Highest mountain in Sierra Leone',
      image: 'https://picsum.photos/seed/mountain-carousel/800/600'
    },
    { 
      name: 'Tacugama Chimp Sanctuary',
      description: 'Chimpanzee conservation sanctuary',
      image: 'https://picsum.photos/seed/wildlife-carousel/800/600'
    },
    { 
      name: 'Freetown City',
      description: 'Vibrant capital city',
      image: 'https://picsum.photos/seed/city-carousel/800/600'
    },
    { 
      name: 'Outamba Kilimi National Park',
      description: 'Wildlife and nature reserve',
      image: 'https://picsum.photos/seed/nature-carousel/800/600'
    }
  ]
  
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % destinations.length)
    }, 4000)
    return () => clearInterval(timer)
  }, [])
  
  const goToSlide = (index) => {
    setCurrentIndex(index)
  }
  
  return (
    <div className="relative w-full h-full rounded-3xl overflow-hidden shadow-2xl">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
          className="absolute inset-0"
        >
          <div className="absolute inset-0">
            <img 
              src={destinations[currentIndex].image}
              alt={destinations[currentIndex].name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/30" />
          </div>
          
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 bg-gradient-to-t from-black/60 to-transparent">
            <motion.h3 
              className="text-2xl md:text-3xl font-bold text-white mb-2"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              {destinations[currentIndex].name}
            </motion.h3>
            <motion.p 
              className="text-white/90 text-sm md:text-base"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              {destinations[currentIndex].description}
            </motion.p>
          </div>
        </motion.div>
      </AnimatePresence>
      
      <div className="absolute top-4 right-4 flex gap-2">
        {destinations.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentIndex 
                ? 'bg-white scale-125' 
                : 'bg-white/50 hover:bg-white/80'
            }`}
          />
        ))}
      </div>
      
      <div className="absolute bottom-20 md:bottom-24 right-4 flex gap-2">
        <button
          onClick={() => setCurrentIndex((prev) => (prev - 1 + destinations.length) % destinations.length)}
          className="p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/40 transition-colors"
        >
          <ChevronRight className="w-5 h-5 text-white rotate-180" />
        </button>
        <button
          onClick={() => setCurrentIndex((prev) => (prev + 1) % destinations.length)}
          className="p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/40 transition-colors"
        >
          <ChevronRight className="w-5 h-5 text-white" />
        </button>
      </div>
      
      <motion.div
        className="absolute top-4 left-4 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full"
        animate={{ y: [0, -5, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <span className="text-white text-sm font-medium">
          {currentIndex + 1} / {destinations.length}
        </span>
      </motion.div>
    </div>
  )
}

const FeatureCard = ({ icon: Icon, title, description, delay = 0, gradient }) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  
  return (
    <motion.div
      ref={ref}
      className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-shadow cursor-pointer group"
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: delay * 0.1, duration: 0.5 }}
      whileHover={{ y: -8 }}
    >
      <motion.div 
        className={`w-16 h-16 rounded-xl ${gradient} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform`}
      >
        <Icon className="w-8 h-8 text-white" />
      </motion.div>
      <h3 className="text-xl font-semibold text-dark-text mb-3">{title}</h3>
      <p className="text-gray-text leading-relaxed">{description}</p>
    </motion.div>
  )
}

const FeaturesSection = () => {
  const features = [
    { icon: Map, title: 'Interactive Maps', description: 'Navigate with detailed maps featuring offline capabilities and real-time GPS tracking.', gradient: 'bg-gradient-to-br from-ocean-blue-light to-ocean-blue' },
    { icon: Camera, title: 'Photo Spots', description: 'Discover the most Instagrammable locations and hidden gems across the country.', gradient: 'bg-gradient-to-br from-tropical-green-light to-tropical-green' },
    { icon: Calendar, title: 'Trip Planner', description: 'Plan your perfect itinerary with smart recommendations and customizable schedules.', gradient: 'bg-gradient-to-br from-ocean-blue-light to-ocean-blue' },
    { icon: MessageCircle, title: 'Local Guides', description: 'Connect with verified local guides for authentic experiences and insider knowledge.', gradient: 'bg-gradient-to-br from-tropical-green-light to-tropical-green' },
    { icon: Hotel, title: 'Accommodation', description: 'Find the perfect place to stay from luxury resorts to cozy local guesthouses.', gradient: 'bg-gradient-to-br from-gold-light to-gold' },
    { icon: Utensils, title: 'Local Cuisine', description: 'Explore authentic Sierra Leonean dishes and the best local restaurants.', gradient: 'bg-gradient-to-br from-tropical-green-light to-tropical-green' }
  ]
  
  return (
    <section id="features" className="py-24 px-6 bg-off-white">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="inline-block bg-ocean-blue text-white px-5 py-2 rounded-full text-sm font-medium mb-4">
            Features
          </span>
          <h2 className="text-4xl lg:text-5xl font-bold text-dark-text mb-4 font-serif">
            Everything You Need for Your Journey
          </h2>
          <p className="text-gray-text text-lg max-w-2xl mx-auto">
            Discover amazing features that make exploring Sierra Leone easier and more enjoyable.
          </p>
        </motion.div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, i) => (
            <FeatureCard key={feature.title} {...feature} delay={i} />
          ))}
        </div>
      </div>
    </section>
  )
}

const DestinationCard = ({ name, description, rating, location, image, mapLink, delay = 0 }) => {
  const [isHovered, setIsHovered] = useState(false)
  
  return (
    <motion.div
      className="bg-white rounded-2xl overflow-hidden shadow-lg cursor-pointer group"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: delay * 0.1 }}
      whileHover={{ y: -8, boxShadow: '0 25px 50px rgba(0, 0, 0, 0.15)' }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="h-48 lg:h-64 relative overflow-hidden">
        <motion.div
          className="absolute inset-0 bg-black/10"
          animate={{ opacity: isHovered ? 0.2 : 0 }}
        />
        <img 
          src={image}
          alt={name}
          className="w-full h-full object-cover"
        />
        
        <motion.div 
          className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-1"
          animate={{ y: isHovered ? -5 : 0 }}
        >
          <Star className="w-4 h-4 text-gold fill-gold" />
          <span className="text-sm font-medium text-dark-text">{rating}</span>
        </motion.div>
        
        <a 
          href={mapLink}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm p-2 rounded-full hover:bg-white transition-colors"
          onClick={(e) => e.stopPropagation()}
        >
          <Map className="w-4 h-4 text-ocean-blue" />
        </a>
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-semibold text-dark-text mb-2 group-hover:text-ocean-blue transition-colors">{name}</h3>
        <p className="text-gray-text text-sm mb-4">{description}</p>
        <div className="flex items-center gap-2 text-gray-text text-sm">
          <MapPin className="w-4 h-4 text-tropical-green" />
          <span>{location}</span>
        </div>
      </div>
    </motion.div>
  )
}

const DestinationsSection = () => {
  const destinations = [
    { name: 'Tokeh Beach', description: 'Pristine white sand beaches with crystal-clear waters', rating: 4.8, location: 'Western Area', image: 'https://picsum.photos/seed/beach/600/400', mapLink: 'https://maps.google.com/?q=Tokeh+Beach+Sierra+Leone' },
    { name: 'Bintumani Peak', description: 'Highest mountain peak with stunning views', rating: 4.9, location: 'Northern Province', image: 'https://picsum.photos/seed/mountain/600/400', mapLink: 'https://maps.google.com/?q=Bintumani+Peak+Sierra+Leone' },
    { name: 'Tacugama Chimp Sanctuary', description: 'Experience chimpanzee conservation up close', rating: 4.7, location: 'Western Area', image: 'https://picsum.photos/seed/wildlife/600/400', mapLink: 'https://maps.google.com/?q=Tacugama+Chimp+Sanctuary+Sierra+Leone' },
  ]
  
  return (
    <section id="destinations" className="py-24 px-6 bg-soft-white">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="inline-block bg-ocean-blue text-white px-5 py-2 rounded-full text-sm font-medium mb-4">
            Popular Destinations
          </span>
          <h2 className="text-4xl lg:text-5xl font-bold text-dark-text mb-4 font-serif">
            Must-Visit Places in Sierra Leone
          </h2>
          <p className="text-gray-text text-lg max-w-2xl mx-auto">
            Explore breathtaking destinations that showcase the natural beauty and culture of Sierra Leone.
          </p>
        </motion.div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {destinations.map((dest, i) => (
            <DestinationCard key={dest.name} {...dest} delay={i} />
          ))}
        </div>
      </div>
    </section>
  )
}

const CTASection = () => {
  return (
    <section className="py-24 px-6 bg-gradient-to-r from-ocean-blue to-tropical-green relative overflow-hidden">
      {/* Animated background elements */}
      {[...Array(10)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-4 h-4 bg-white/10 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.1, 0.3, 0.1]
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2
          }}
        />
      ))}
      
      <motion.div 
        className="max-w-4xl mx-auto text-center relative z-10"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <motion.h2 
          className="text-4xl lg:text-5xl font-bold text-white mb-6 font-serif"
          initial={{ scale: 0.9 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
        >
          Ready to Explore Sierra Leone?
        </motion.h2>
        <p className="text-white/90 text-lg mb-10 max-w-2xl mx-auto">
          Download the Sierra Explorer app today and start your unforgettable journey through 
          stunning beaches, majestic mountains, and vibrant culture.
        </p>
        
        <div className="flex flex-wrap justify-center gap-4">
          <motion.button 
            className="px-8 py-4 bg-gold text-white rounded-xl font-semibold flex items-center gap-3 shadow-lg"
            whileHover={{ scale: 1.05, boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)' }}
            whileTap={{ scale: 0.95 }}
          >
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
            </svg>
            Download for iOS
          </motion.button>
          <motion.button 
            className="px-8 py-4 bg-gold text-white rounded-xl font-semibold flex items-center gap-3 shadow-lg"
            whileHover={{ scale: 1.05, boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)' }}
            whileTap={{ scale: 0.95 }}
          >
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
              <path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 01-.61-.92V2.734a1 1 0 01.609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-3.198l2.807 1.626a1 1 0 010 1.73l-2.808 1.626L15.206 12l2.492-2.491zM5.864 2.658L16.8 8.99l-2.302 2.302-8.635-8.635z"/>
            </svg>
            Download for Android
          </motion.button>
        </div>
      </motion.div>
    </section>
  )
}

const TestimonialCard = ({ name, role, content, delay = 0 }) => {
  return (
    <motion.div
      className="bg-white p-8 rounded-2xl shadow-lg"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: delay * 0.1 }}
      whileHover={{ y: -5, boxShadow: '0 25px 50px rgba(0, 0, 0, 0.1)' }}
    >
      <Quote className="w-10 h-10 text-ocean-blue/30 mb-4" />
      <p className="text-dark-text leading-relaxed mb-6">{content}</p>
      <div className="flex items-center gap-4">
        <motion.div 
          className="w-12 h-12 rounded-full bg-gradient-to-br from-ocean-blue to-tropical-green flex items-center justify-center text-white font-semibold"
          whileHover={{ scale: 1.1 }}
        >
          {name.charAt(0)}
        </motion.div>
        <div>
          <h4 className="font-semibold text-dark-text">{name}</h4>
          <span className="text-sm text-gray-text">{role}</span>
        </div>
      </div>
    </motion.div>
  )
}

const AboutSection = () => {
  const testimonials = [
    { name: 'Amara Johnson', role: 'Travel Blogger', content: '"Sierra Explorer helped me discover amazing places I never knew existed. The offline maps were incredibly useful in remote areas."' },
    { name: 'Michael Kargbo', role: 'Adventure Seeker', content: '"The local guide connections through this app made my trip truly authentic. I felt welcomed everywhere I went."' },
    { name: 'Fatima Sesay', role: 'Tour Guide', content: '"Best travel app for Sierra Leone! The recommendations were spot-on and the itinerary planner saved me so much time."' }
  ]
  
  return (
    <section id="about" className="py-24 px-6 bg-off-white">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="inline-block bg-ocean-blue text-white px-5 py-2 rounded-full text-sm font-medium mb-4">
            Testimonials
          </span>
          <h2 className="text-4xl lg:text-5xl font-bold text-dark-text mb-4 font-serif">
            What Our Travelers Say
          </h2>
        </motion.div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, i) => (
            <TestimonialCard key={testimonial.name} {...testimonial} delay={i} />
          ))}
        </div>
      </div>
    </section>
  )
}

const NewsletterSection = () => {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  
  const handleSubmit = (e) => {
    e.preventDefault()
    if (email) {
      setSubmitted(true)
      setTimeout(() => {
        setSubmitted(false)
        setEmail('')
      }, 3000)
    }
  }
  
  return (
    <section id="contact" className="py-24 px-6 bg-soft-white">
      <motion.div 
        className="max-w-2xl mx-auto text-center"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <Globe className="w-16 h-16 text-ocean-blue mx-auto mb-6" />
        <h2 className="text-4xl font-bold text-dark-text mb-4 font-serif">Stay Updated</h2>
        <p className="text-gray-text mb-8">
          Subscribe to our newsletter for the latest destinations, travel tips, and exclusive offers.
        </p>
        
        <motion.form 
          className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto"
          onSubmit={handleSubmit}
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
        >
          <div className="flex-1 relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-text" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:border-ocean-blue focus:outline-none transition-colors"
              required
            />
          </div>
          <motion.button
            type="submit"
            className="px-8 py-4 bg-gold text-white rounded-xl font-semibold flex items-center justify-center gap-2 shadow-lg"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {submitted ? <Check className="w-5 h-5" /> : <Send className="w-5 h-5" />}
            {submitted ? 'Subscribed!' : 'Subscribe'}
          </motion.button>
        </motion.form>
        
        <AnimatePresence>
          {submitted && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mt-4 text-tropical-green font-medium"
            >
              Thank you for subscribing!
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  )
}

const Footer = () => {
  const quickLinks = ['Features', 'Destinations', 'About Us', 'Contact']
  const support = ['Help Center', 'FAQs', 'Community', 'Partners']
  const legal = ['Privacy Policy', 'Terms of Service', 'Cookie Policy']
  const socialLinks = [
    { icon: Facebook, href: '#' },
    { icon: Twitter, href: '#' },
    { icon: Instagram, href: '#' },
    { icon: Youtube, href: '#' }
  ]
  
  return (
    <footer className="bg-dark-text text-white py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          <div>
            <motion.div 
              className="flex items-center gap-3 mb-6"
              whileHover={{ scale: 1.05 }}
            >
              <Mountain className="w-8 h-8" />
              <span className="text-xl font-semibold">Sierra Explorer</span>
            </motion.div>
            <p className="text-white/70 mb-6 leading-relaxed">
              Your gateway to discovering the natural beauty and rich culture of Sierra Leone.
            </p>
            <div className="flex gap-3">
              {socialLinks.map(({ icon: Icon, href }, i) => (
                <motion.a
                  key={i}
                  href={href}
                  className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-ocean-blue transition-colors"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            {quickLinks.map((link, i) => (
              <motion.a
                key={link}
                href={`#${link.toLowerCase().replace(' ', '-')}`}
                className="block text-white/70 py-2 hover:text-gold-light transition-colors"
                whileHover={{ x: 5 }}
              >
                {link}
              </motion.a>
            ))}
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            {support.map((link, i) => (
              <motion.a
                key={link}
                href="#"
                className="block text-white/70 py-2 hover:text-gold-light transition-colors"
                whileHover={{ x: 5 }}
              >
                {link}
              </motion.a>
            ))}
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            {legal.map((link, i) => (
              <motion.a
                key={link}
                href="#"
                className="block text-white/70 py-2 hover:text-gold-light transition-colors"
                whileHover={{ x: 5 }}
              >
                {link}
              </motion.a>
            ))}
          </div>
        </div>
        
        <div className="pt-8 border-t border-white/10 text-center">
          <p className="text-white/50">
            © 2026 Sierra Explorer. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default function Home() {
  const [showSplash, setShowSplash] = useState(true)
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false)
    }, 100)
    return () => clearTimeout(timer)
  }, [])
  
  return (
    <>
      <AnimatePresence>
        {showSplash && <SplashScreen onComplete={() => setShowSplash(false)} />}
      </AnimatePresence>
      
      {!showSplash && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Navbar />
          <main>
            <HeroSection />
            <FeaturesSection />
            <DestinationsSection />
            <CTASection />
            <AboutSection />
            <NewsletterSection />
          </main>
          <Footer />
        </motion.div>
      )}
    </>
  )
}
