import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiBell, FiChevronDown,FiSun, FiMoon} from 'react-icons/fi';
import { FaRegUserCircle, FaCog, FaSignOutAlt } from 'react-icons/fa';
import { HiOutlineUser } from 'react-icons/hi';
import { motion, AnimatePresence } from 'framer-motion';
import logoImg from '../../assets/images/logo.png'

const Navbar = () => {
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [notificationDropdownOpen, setNotificationDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleProfileDropdown = () => {
    setProfileDropdownOpen(!profileDropdownOpen);
    if (notificationDropdownOpen) setNotificationDropdownOpen(false);
  };

  const toggleNotificationDropdown = () => {
    setNotificationDropdownOpen(!notificationDropdownOpen);
    if (profileDropdownOpen) setProfileDropdownOpen(false);
  };

  const closeAllDropdowns = () => {
    setProfileDropdownOpen(false);
    setNotificationDropdownOpen(false);
  };

  const notifications = [
    { id: 1, text: 'New user registered', time: '2 mins ago', read: false },
    { id: 2, text: 'System update available', time: '1 hour ago', read: true },
    { id: 3, text: 'New message received', time: '3 hours ago', read: true },
  ];

  return (
    <motion.nav 
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/80 backdrop-blur-lg shadow-sm' : 'bg-white'}`}
    >
      <div className="px-4 sm:px-4 lg:px-4 shadow-sm pl-15 md:pl-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link 
              to="/" 
              className="flex-shrink-0 flex items-center group"
            >
              <img src={logoImg} alt="logo" className='object-fit h-15' />
            </Link>
          </div>

          <div className="flex-1 flex justify-center px-2 lg:ml-6 lg:justify-end">
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="max-w-lg w-full lg:max-w-xs"
            >
              <label htmlFor="search" className="sr-only">
                Search
              </label>
              <div className="relative">
               
                <input
                  id="search"
                  name="search"
                  className="block w-full pl-3 pr-3 py-2 border border-gray-300/70 rounded-lg leading-5 bg-white/50 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-900 sm:text-sm backdrop-blur-sm transition-all duration-200 hover:bg-white/70"
                  placeholder="Search..."
                  type="search"
                />
              </div>
            </motion.div>
          </div>

          <div className="flex items-center">
            <div className="ml-2 relative">
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => setDarkMode(!darkMode)}
                className="p-2 rounded-full text-gray-400 hover:text-gray-500 hover:bg-gray-100/50 focus:outline-none transition-colors"
                aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
              >
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={darkMode ? 'moon' : 'sun'}
                    initial={{ opacity: 0, rotate: 90 }}
                    animate={{ opacity: 1, rotate: 0 }}
                    exit={{ opacity: 0, rotate: -90 }}
                    transition={{ duration: 0.2 }}
                  >
                    {darkMode ? (
                      <FiSun className="h-5 w-5 text-yellow-300" />
                    ) : (
                      <FiMoon className="h-5 w-5 text-gray-600" />
                    )}
                  </motion.div>
                </AnimatePresence>
              </motion.button>
            </div>
            <div className="ml-2 relative">
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={toggleNotificationDropdown}
                className="p-2 rounded-full text-gray-400 hover:text-gray-500 hover:bg-gray-100/50 focus:outline-none relative transition-colors"
              >
                <span className="sr-only">View notifications</span>
                <FiBell className="h-5 w-5" />
                <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500 animate-pulse"></span>
              </motion.button>

              <AnimatePresence>
                {notificationDropdownOpen && (
                  <>
                    <div
                      className="fixed inset-0 z-40"
                      onClick={closeAllDropdowns}
                    ></div>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 20 }}
                      transition={{ duration: 0.2, ease: "easeOut" }}
                      className="origin-top-right absolute right-0 mt-2 w-80 rounded-lg shadow-xl bg-white/80 backdrop-blur-lg ring-1 ring-black/10 z-50 overflow-hidden"
                    >
                      <div className="py-1">
                        <div className="px-4 py-3 border-b border-gray-200/30">
                          <p className="text-sm font-medium text-gray-900">
                            Notifications
                          </p>
                        </div>
                        <div className="max-h-96 overflow-y-auto overflow-x-hidden">
                          {notifications.map((notification) => (
                            <motion.div
                              key={notification.id}
                              whileHover={{ scale: 1.01 }}
                              className={`px-4 py-3 hover:bg-gray-100/50 transition-colors ${!notification.read ? 'bg-blue-50/50' : ''}`}
                            >
                              <div className="flex items-start">
                                <div className="flex-shrink-0 pt-0.5">
                                  <div className="h-10 w-10 rounded-full bg-indigo-100/80 flex items-center justify-center backdrop-blur-sm">
                                    <FiBell className="h-5 w-5 text-indigo-600" />
                                  </div>
                                </div>
                                <div className="ml-3 flex-1">
                                  <p className="text-sm font-medium text-gray-900">
                                    {notification.text}
                                  </p>
                                  <p className="text-xs text-gray-500">
                                    {notification.time}
                                  </p>
                                </div>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                        <div className="border-t border-gray-200/30 px-4 py-2">
                          <Link
                            to="/notifications"
                            className="text-sm font-medium text-indigo-600 hover:text-indigo-800 transition-colors"
                          >
                            View all notifications
                          </Link>
                        </div>
                      </div>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>

            <div className="ml-4 relative">
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={toggleProfileDropdown}
                className="flex items-center max-w-xs rounded-full focus:outline-none group"
              >
                <span className="sr-only">Open user menu</span>
                <motion.div 
                  whileHover={{ scale: 1.05 }}
                  className="h-8 w-8 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow"
                >
                  <HiOutlineUser className="h-4 w-4 text-white" />
                </motion.div>
                <span className="hidden md:inline-block ml-2 text-sm font-medium text-gray-700">
                  Admin User
                </span>
                <FiChevronDown className={`hidden md:inline-block ml-1 h-4 w-4 text-gray-500 transition-transform ${profileDropdownOpen ? 'rotate-180' : ''}`} />
              </motion.button>

              <AnimatePresence>
                {profileDropdownOpen && (
                  <>
                    <div
                      className="fixed inset-0 z-40"
                      onClick={closeAllDropdowns}
                    ></div>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 20 }}
                      transition={{ duration: 0.2, ease: "easeOut" }}
                      className="origin-top-right absolute right-0 mt-2 w-48 rounded-lg shadow-xl bg-white/80 backdrop-blur-lg ring-1 ring-black/10 z-50 divide-y divide-gray-200/30 overflow-hidden"
                    >
                      <div className="px-4 py-3">
                        <p className="text-sm text-gray-500">
                          Signed in as
                        </p>
                        <p className="text-sm font-medium text-gray-900 truncate">
                          admin@example.com
                        </p>
                      </div>
                      <div className="py-1">
                        <Link
                          to="/profile"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100/50 transition-colors"
                        >
                          <div className="flex items-center">
                            <FaRegUserCircle className="mr-2" />
                            Profile
                          </div>
                        </Link>
                        <Link
                          to="/settings"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100/50 transition-colors"
                        >
                          <div className="flex items-center">
                            <FaCog className="mr-2" />
                            Settings
                          </div>
                        </Link>
                      </div>
                      <div className="py-1">
                        <Link
                          to="/logout"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100/50 transition-colors"
                        >
                          <div className="flex items-center">
                            <FaSignOutAlt className="mr-2" />
                            Sign out
                          </div>
                        </Link>
                      </div>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;