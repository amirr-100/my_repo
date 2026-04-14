'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Mountain, Menu, X, Home, Compass, MapPin, Calendar, Heart, User, Settings, 
  LogOut, Bell, Search, TrendingUp, Star, Waves, TreePine, Landmark, 
  Camera, ChevronRight, Clock, Map, Bookmark, Plane, Instagram, Facebook, 
  Twitter, Youtube, Sun, Cloud, ThermometerSun, Wind
} from 'lucide-react'
import { useRouter } from 'next/navigation'

const Sidebar = ({ isOpen, setIsOpen }) => {
  const router = useRouter()
  const [activeItem, setActiveItem] = useState('home')
  
  const menuItems = [
    { id: 'home', icon: Home, label: 'Dashboard', path: '/home' },
    { id: 'explore', icon: Compass, label: 'Explore', path: '/home' },
    { id: 'trips', icon: Calendar, label: 'My Trips', path: '/home' },
    { id: 'saved', icon: Bookmark, label: 'Saved', path: '/home' },
    { id: 'map', icon: Map, label: 'Map View', path: '/home' },
  ]
  
  const bottomMenuItems = [
    { id: 'settings', icon: Settings, label: 'Settings', path: '/home' },
    { id: 'logout', icon: LogOut, label: 'Log Out', path: '/' },
  ]
  
  const handleNavigation = (item) => {
    if (item.id === 'logout') {
      router.push('/')
    } else {
      setActiveItem(item.id)
    }
  }

  return (
    <>
      {/* Sidebar */}
      <motion.aside 
        className="fixed top-0 left-0 h-full bg-dark-text text-white z-50 flex flex-col"
        initial={false}
        animate={{ 
          x: isOpen ? 0 : -280,
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      >
        <div className="p-5 flex items-center justify-between border-b border-white/10">
          <motion.div 
            className="flex items-center gap-3 cursor-pointer"
            whileHover={{ scale: 1.05 }}
            onClick={() => router.push('/')}
          >
            <div className="w-10 h-10 bg-ocean-blue rounded-xl flex items-center justify-center">
              <Mountain className="w-5 h-5" />
            </div>
            <motion.span 
              className="font-semibold whitespace-nowrap"
              initial={{ opacity: 0 }}
              animate={{ opacity: isOpen ? 1 : 0 }}
              transition={{ delay: isOpen ? 0.1 : 0 }}
            >
              Sierra Explorer
            </motion.span>
          </motion.div>
          <button 
            onClick={() => setIsOpen(false)}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <nav className="flex-1 py-6 px-3 space-y-1">
          {menuItems.map((item) => (
            <motion.button
              key={item.id}
              onClick={() => handleNavigation(item)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                activeItem === item.id 
                  ? 'bg-ocean-blue text-white' 
                  : 'hover:bg-white/10 text-white/80'
              }`}
              whileHover={{ x: 5 }}
              whileTap={{ scale: 0.98 }}
            >
              <item.icon className="w-5 h-5 flex-shrink-0" />
              <motion.span 
                className="whitespace-nowrap"
                initial={{ opacity: 0 }}
                animate={{ opacity: isOpen ? 1 : 0 }}
                transition={{ delay: isOpen ? 0.1 : 0 }}
              >
                {item.label}
              </motion.span>
            </motion.button>
          ))}
        </nav>
        
        <div className="p-3 border-t border-white/10 space-y-1">
          {bottomMenuItems.map((item) => (
            <motion.button
              key={item.id}
              onClick={() => handleNavigation(item)}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-white/80 hover:bg-white/10 hover:text-white transition-colors"
              whileHover={{ x: 5 }}
              whileTap={{ scale: 0.98 }}
            >
              <item.icon className="w-5 h-5 flex-shrink-0" />
              <motion.span 
                className="whitespace-nowrap"
                initial={{ opacity: 0 }}
                animate={{ opacity: isOpen ? 1 : 0 }}
                transition={{ delay: isOpen ? 0.1 : 0 }}
              >
                {item.label}
              </motion.span>
            </motion.button>
          ))}
        </div>
      </motion.aside>
      
      {/* Overlay for mobile */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 bg-black/50 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>
    </>
  )
}

// Floating Menu Button
const FloatingMenuButton = ({ onClick }) => {
  return (
    <motion.button
      onClick={onClick}
      className="fixed top-4 left-4 z-40 w-12 h-12 bg-ocean-blue text-white rounded-xl shadow-lg flex items-center justify-center hover:bg-ocean-blue-dark transition-colors"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      <Menu className="w-6 h-6" />
    </motion.button>
  )
}

const Header = ({ setIsOpen }) => {
  const [showNotifications, setShowNotifications] = useState(false)
  
  const notifications = [
    { id: 1, title: 'New destination added', message: 'Sherbro Island is now available', time: '2 min ago', unread: true },
    { id: 2, title: 'Trip reminder', message: 'Your Freetown trip is in 3 days', time: '1 hour ago', unread: true },
    { id: 3, title: 'Special offer', message: '20% off on guided tours this week', time: '3 hours ago', unread: false },
  ]
  
  return (
    <header className="fixed top-0 right-0 left-0 bg-soft-white border-b border-gray-200 z-30">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-4">
          <div className="relative pl-16 lg:pl-20">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-text" />
            <input
              type="text"
              placeholder="Search destinations, trips..."
              className="pl-10 pr-4 py-2 w-64 lg:w-96 bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-ocean-blue transition-colors"
            />
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="relative">
            <motion.button
              className="relative p-2 hover:bg-gray-100 rounded-xl transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowNotifications(!showNotifications)}
            >
              <Bell className="w-5 h-5 text-dark-text" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
            </motion.button>
            
            <AnimatePresence>
              {showNotifications && (
                <motion.div
                  className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden"
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                >
                  <div className="p-4 border-b border-gray-100">
                    <h3 className="font-semibold text-dark-text">Notifications</h3>
                  </div>
                  <div className="max-h-80 overflow-y-auto">
                    {notifications.map((notif) => (
                      <div 
                        key={notif.id}
                        className={`p-4 border-b border-gray-50 hover:bg-gray-50 cursor-pointer transition-colors ${
                          notif.unread ? 'bg-ocean-blue/5' : ''
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          {notif.unread && <div className="w-2 h-2 bg-ocean-blue rounded-full mt-2 flex-shrink-0" />}
                          <div className={notif.unread ? '' : 'ml-5'}>
                            <h4 className="font-medium text-dark-text text-sm">{notif.title}</h4>
                            <p className="text-xs text-gray-text mt-1">{notif.message}</p>
                            <div className="flex items-center gap-1 mt-2 text-xs text-gray-text">
                              <Clock className="w-3 h-3" />
                              {notif.time}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="p-3 text-center border-t border-gray-100">
                    <a href="#" className="text-sm text-ocean-blue hover:text-ocean-blue-dark font-medium">
                      View all notifications
                    </a>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          
          <motion.div 
            className="flex items-center gap-3 cursor-pointer"
            whileHover={{ scale: 1.02 }}
          >
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-ocean-blue to-tropical-green flex items-center justify-center text-white font-semibold">
              AC
            </div>
            <div className="hidden sm:block">
              <p className="font-medium text-dark-text text-sm">Amirr Conteh</p>
              <p className="text-xs text-gray-text">explorer</p>
            </div>
          </motion.div>
        </div>
      </div>
    </header>
  )
}

const WeatherWidget = () => {
  return (
    <motion.div 
      className="bg-gradient-to-r from-ocean-blue to-tropical-green rounded-2xl p-6 text-white"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-white/80 text-sm">Current Weather</p>
          <h3 className="text-4xl font-bold mt-1">28°C</h3>
          <p className="text-white/80 text-sm mt-1">Freetown, Sierra Leone</p>
        </div>
        <div className="text-right">
          <Sun className="w-16 h-16 text-yellow-300" />
          <p className="text-sm mt-2">Sunny</p>
        </div>
      </div>
      <div className="flex gap-6 mt-4 pt-4 border-t border-white/20">
        <div className="flex items-center gap-2">
          <Wind className="w-4 h-4" />
          <span className="text-sm">15 km/h</span>
        </div>
        <div className="flex items-center gap-2">
          <Cloud className="w-4 h-4" />
          <span className="text-sm">45%</span>
        </div>
        <div className="flex items-center gap-2">
          <ThermometerSun className="w-4 h-4" />
          <span className="text-sm">26° / 31°</span>
        </div>
      </div>
    </motion.div>
  )
}

const QuickStats = () => {
  const stats = [
    { label: 'Places Visited', value: '12', icon: MapPin, color: 'text-ocean-blue', bg: 'bg-ocean-blue/10' },
    { label: 'Upcoming Trips', value: '3', icon: Calendar, color: 'text-tropical-green', bg: 'bg-tropical-green/10' },
    { label: 'Saved Places', value: '24', icon: Heart, color: 'text-red-500', bg: 'bg-red-50' },
    { label: 'Reviews Written', value: '8', icon: Star, color: 'text-gold', bg: 'bg-gold/10' },
  ]
  
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, i) => (
        <motion.div
          key={stat.label}
          className="bg-white rounded-xl p-5 shadow-sm"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 + i * 0.1 }}
          whileHover={{ y: -5, boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}
        >
          <div className={`w-12 h-12 ${stat.bg} rounded-xl flex items-center justify-center mb-3`}>
            <stat.icon className={`w-6 h-6 ${stat.color}`} />
          </div>
          <h3 className="text-2xl font-bold text-dark-text">{stat.value}</h3>
          <p className="text-sm text-gray-text">{stat.label}</p>
        </motion.div>
      ))}
    </div>
  )
}

const FeaturedDestinations = () => {
  const destinations = [
    { name: 'Tokeh Beach', type: 'Beach', rating: 4.8, image: 'https://picsum.photos/seed/beach/400/300' },
    { name: 'Bintumani Peak', type: 'Mountain', rating: 4.9, image: 'https://picsum.photos/seed/mountain/400/300' },
    { name: 'Tacugama Chimp Sanctuary', type: 'Wildlife', rating: 4.7, image: 'https://picsum.photos/seed/wildlife/400/300' },
  ]
  
  return (
    <section>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-dark-text">Featured Destinations</h2>
        <a href="#" className="text-ocean-blue hover:text-ocean-blue-dark font-medium text-sm flex items-center gap-1">
          View all <ChevronRight className="w-4 h-4" />
        </a>
      </div>
      <div className="grid md:grid-cols-3 gap-4">
        {destinations.map((dest, i) => (
          <motion.div
            key={dest.name}
            className="bg-white rounded-xl overflow-hidden shadow-sm cursor-pointer group"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 + i * 0.1 }}
            whileHover={{ y: -5, boxShadow: '0 15px 40px rgba(0,0,0,0.12)' }}
          >
            <div className="h-32 relative overflow-hidden">
              <img
                src={dest.image}
                alt={dest.name}
                className="w-full h-full object-cover"
              />
              <button className="absolute top-3 right-3 p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/40 transition-colors">
                <Heart className="w-4 h-4 text-white" />
              </button>
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-dark-text group-hover:text-ocean-blue transition-colors">{dest.name}</h3>
              <p className="text-sm text-gray-text mt-1">{dest.type}</p>
              <div className="flex items-center justify-between mt-3">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-gold fill-gold" />
                  <span className="text-sm font-medium text-dark-text">{dest.rating}</span>
                </div>
                <span className="text-sm text-ocean-blue font-medium">Explore →</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

const UpcomingTrips = () => {
  const trips = [
    { name: 'Freetown City Tour', date: 'Mar 15 - Mar 18', status: 'Confirmed', color: 'bg-tropical-green' },
    { name: 'Beach Weekend at Tokeh', date: 'Mar 22 - Mar 24', status: 'Pending', color: 'bg-gold' },
    { name: 'Mountain Trekking Bintumani', date: 'Apr 5 - Apr 8', status: 'Planning', color: 'bg-ocean-blue' },
  ]
  
  return (
    <section>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-dark-text">Upcoming Trips</h2>
        <button className="px-4 py-2 bg-ocean-blue text-white rounded-lg text-sm font-medium hover:bg-ocean-blue-dark transition-colors">
          + New Trip
        </button>
      </div>
      <div className="space-y-3">
        {trips.map((trip, i) => (
          <motion.div
            key={trip.name}
            className="bg-white rounded-xl p-4 shadow-sm flex items-center justify-between cursor-pointer"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 + i * 0.1 }}
            whileHover={{ x: 5, boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}
          >
            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 ${trip.color} rounded-xl flex items-center justify-center`}>
                <Plane className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-dark-text">{trip.name}</h3>
                <p className="text-sm text-gray-text">{trip.date}</p>
              </div>
            </div>
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${
              trip.status === 'Confirmed' ? 'bg-tropical-green/10 text-tropical-green' :
              trip.status === 'Pending' ? 'bg-gold/10 text-gold' :
              'bg-ocean-blue/10 text-ocean-blue'
            }`}>
              {trip.status}
            </span>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

const PopularActivities = () => {
  const activities = [
    { name: 'Beach Activities', icon: Waves, count: 156 },
    { name: 'Hiking', icon: Mountain, count: 89 },
    { name: 'Wildlife', icon: TreePine, count: 67 },
    { name: 'Cultural Tours', icon: Landmark, count: 124 },
    { name: 'Photography', icon: Camera, count: 98 },
  ]
  
  return (
    <section>
      <h2 className="text-xl font-bold text-dark-text mb-6">Popular Activities</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {activities.map((activity, i) => (
          <motion.div
            key={activity.name}
            className="bg-white rounded-xl p-4 text-center cursor-pointer shadow-sm"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6 + i * 0.05 }}
            whileHover={{ y: -5, boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}
          >
            <div className="w-12 h-12 bg-ocean-blue/10 rounded-xl flex items-center justify-center mx-auto mb-3">
              <activity.icon className="w-6 h-6 text-ocean-blue" />
            </div>
            <h3 className="font-medium text-dark-text text-sm">{activity.name}</h3>
            <p className="text-xs text-gray-text mt-1">{activity.count} places</p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

const TravelInsights = () => {
  return (
    <section className="bg-white rounded-2xl p-6 shadow-sm">
      <h2 className="text-xl font-bold text-dark-text mb-6">Travel Insights</h2>
      <div className="space-y-4">
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-text">Beaches</span>
            <span className="text-sm font-medium text-dark-text">45%</span>
          </div>
          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-gradient-to-r from-ocean-blue to-ocean-blue-light rounded-full"
              initial={{ width: 0 }}
              animate={{ width: '45%' }}
              transition={{ delay: 0.7, duration: 1 }}
            />
          </div>
        </div>
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-text">Mountains</span>
            <span className="text-sm font-medium text-dark-text">30%</span>
          </div>
          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-gradient-to-r from-tropical-green to-tropical-green-light rounded-full"
              initial={{ width: 0 }}
              animate={{ width: '30%' }}
              transition={{ delay: 0.8, duration: 1 }}
            />
          </div>
        </div>
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-text">Cultural Sites</span>
            <span className="text-sm font-medium text-dark-text">25%</span>
          </div>
          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-gradient-to-r from-gold to-gold-light rounded-full"
              initial={{ width: 0 }}
              animate={{ width: '25%' }}
              transition={{ delay: 0.9, duration: 1 }}
            />
          </div>
        </div>
      </div>
      <div className="mt-6 pt-6 border-t border-gray-100">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-text">Your ranking this month</p>
            <p className="text-2xl font-bold text-dark-text mt-1">Top 15%</p>
          </div>
          <div className="flex items-center gap-1 text-tropical-green">
            <TrendingUp className="w-5 h-5" />
            <span className="font-semibold">+8%</span>
          </div>
        </div>
      </div>
    </section>
  )
}

const ShareSection = () => {
  const socials = [
    { icon: Facebook, name: 'Facebook', color: 'hover:bg-blue-600' },
    { icon: Twitter, name: 'Twitter', color: 'hover:bg-sky-500' },
    { icon: Instagram, name: 'Instagram', color: 'hover:bg-pink-600' },
    { icon: Youtube, name: 'YouTube', color: 'hover:bg-red-600' },
  ]
  
  return (
    <section className="bg-gradient-to-r from-ocean-blue to-tropical-green rounded-2xl p-6 text-white">
      <h2 className="text-xl font-bold mb-4">Share Your Adventures</h2>
      <p className="text-white/80 text-sm mb-6">Inspire others by sharing your Sierra Leone experiences</p>
      <div className="flex gap-3">
        {socials.map((social, i) => (
          <motion.button
            key={social.name}
            className={`w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center hover:bg-white/30 transition-colors`}
            whileHover={{ scale: 1.1, rotate: 5 }}
            whileTap={{ scale: 0.9 }}
          >
            <social.icon className="w-5 h-5" />
          </motion.button>
        ))}
      </div>
    </section>
  )
}

export default function HomePage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [userName, setUserName] = useState('Traveler')
  
  useEffect(() => {
    const storedName = localStorage.getItem('userName')
    if (storedName) {
      setUserName(storedName)
    }
    const timer = setTimeout(() => setIsLoading(false), 1000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      <AnimatePresence>
        {isLoading && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-soft-white"
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="text-center"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <motion.div
                className="w-20 h-20 bg-ocean-blue rounded-2xl flex items-center justify-center mx-auto mb-4"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                <Mountain className="w-10 h-10 text-white" />
              </motion.div>
              <p className="text-gray-text">Loading your dashboard...</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {!isLoading && (
        <>
          <FloatingMenuButton onClick={() => setSidebarOpen(true)} />
          <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
          <Header setIsOpen={setSidebarOpen} />
        </>
      )}
      
      <motion.main 
        className="min-h-screen bg-soft-white pt-24 pl-32 pr-6 pb-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-3xl font-bold text-dark-text font-serif">Welcome back, {userName}! 👋</h1>
            <p className="text-gray-text mt-2">Discover your next adventure in Sierra Leone</p>
          </motion.div>
          
          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <WeatherWidget />
              <QuickStats />
              <FeaturedDestinations />
              <UpcomingTrips />
              <PopularActivities />
            </div>
            
            <div className="space-y-6">
              <TravelInsights />
              <ShareSection />
              
              <motion.div
                className="bg-white rounded-2xl p-6 shadow-sm"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <h2 className="text-xl font-bold text-dark-text mb-4">Quick Actions</h2>
                <div className="space-y-3">
                  <motion.button
                    className="w-full py-3 bg-ocean-blue text-white rounded-xl font-medium flex items-center justify-center gap-2"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Compass className="w-5 h-5" />
                    Explore Nearby
                  </motion.button>
                  <motion.button
                    className="w-full py-3 border-2 border-ocean-blue text-ocean-blue rounded-xl font-medium flex items-center justify-center gap-2"
                    whileHover={{ scale: 1.02, backgroundColor: 'rgba(8, 145, 178, 0.1)' }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Map className="w-5 h-5" />
                    View Map
                  </motion.button>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.main>
    </>
  )
}
