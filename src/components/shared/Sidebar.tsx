import { Link, useLocation } from 'react-router-dom';
import {
  FiHome, FiUsers, FiSettings, FiFileText, FiPieChart,
  FiGrid, FiChevronDown, FiChevronRight, FiMenu, FiX
} from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

type SidebarProps = {
  isCollapsed: boolean;
  setIsCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
};

const Sidebar = ({ isCollapsed, setIsCollapsed }: SidebarProps) => {
  const [openSubmenus, setOpenSubmenus] = useState<Record<string, boolean>>({});
  const location = useLocation();

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
    if (!isCollapsed) setOpenSubmenus({});
  };

  const toggleSubmenu = (menuKey: string) => {
    if (isCollapsed) {
      setIsCollapsed(false);
      setOpenSubmenus({ [menuKey]: true });
    } else {
      setOpenSubmenus(prev => ({
        ...prev,
        [menuKey]: !prev[menuKey]
      }));
    }
  };

  const menuItems = [
    { key: 'dashboard', label: 'Dashboard', icon: <FiHome />, path: '/' },
    {
      key: 'employee', label: 'Employee', icon: <FiUsers />, submenu: [
        { label: 'All Employees', path: '/employee' },
        { label: 'Bank Details', path: '/bank-details' },
        { label: 'Salary Details', path: '/salary-details' },
        { label: 'Documents', path: '/documents' },
      ]
    },
    {
      key: 'content', label: 'Content', icon: <FiFileText />, submenu: [
        { label: 'Posts', path: '/content/posts' },
        { label: 'Pages', path: '/content/pages' },
        { label: 'Media', path: '/content/media' }
      ]
    },
    { key: 'analytics', label: 'Analytics', icon: <FiPieChart />, path: '/analytics' },
    {
      key: 'apps', label: 'Apps', icon: <FiGrid />, submenu: [
        { label: 'Calendar', path: '/apps/calendar' },
        { label: 'Email', path: '/apps/email' },
        { label: 'Chat', path: '/apps/chat' }
      ]
    },
    { key: 'settings', label: 'Settings', icon: <FiSettings />, path: '/settings' }
  ];

  const isActive = (item: any) => {
    if (item.path) return location.pathname === item.path;
    if (item.submenu) return item.submenu.some((subItem: any) => location.pathname === subItem.path);
    return false;
  };

  return (
    <>
      {/* Mobile Toggle */}
      <div className="md:hidden fixed top-4 left-4 z-[50000]">
        <button
          onClick={toggleSidebar}
          className="p-2 transition-all font-[var(--font-satoshi-medium)]"
        >
          {isCollapsed ? <FiX size={20} /> : <FiMenu size={20} />}
        </button>
      </div>

      <motion.div
        initial={{ x: -300 }}
        animate={{
          x: 0,
          width: isCollapsed ? '5rem' : '16rem'
        }}
        transition={{ type: 'tween', duration: 0.25, ease: 'easeInOut' }}
        className={`fixed top-0 left-0 h-screen bg-white shadow-lg z-40 flex flex-col overflow-hidden transition-all duration-300 ${isCollapsed ? 'w-20' : 'w-64'} font-[var(--font-satoshi-regular)]`}
      >
        <div className="flex items-center justify-between">
          <div className="holder-top h-[55px]">

          </div>

          <button
            onClick={toggleSidebar}
            className="hidden md:flex items-center justify-center p-1 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500 transition-all font-[var(--font-satoshi-medium)]"
          >
            {isCollapsed ? <FiChevronRight size={18} /> : <FiChevronRight size={18} className="rotate-180" />}
          </button>
        </div>

        <div className="flex-1 overflow-y-auto py-4 px-2">
          <ul className={`space-y-1 ${isCollapsed ? 'flex flex-col justify-center items-center' : ''}`}>
            {menuItems.map((item) => (
              <li key={item.key} className={isCollapsed ? 'w-full flex justify-center' : ''}>
                {item.submenu ? (
                  <>
                    <button
                      onClick={() => toggleSubmenu(item.key)}
                      className={`${isCollapsed ? 'w-fit' : 'w-full'} flex items-center justify-between p-3 rounded-lg transition-all ${isActive(item) ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-50'} font-[var(--font-satoshi-medium)]`}
                    >
                      <div className="flex items-center">
                        <span className={`text-lg ${isActive(item) ? 'text-blue-600' : 'text-gray-500'}`}>{item.icon}</span>
                        {!isCollapsed && (
                          <span className="ml-3 font-bold font-[var(--font-satoshi-bold)]">{item.label}</span>
                        )}
                      </div>
                      {!isCollapsed && (
                        <motion.span
                          animate={{ rotate: openSubmenus[item.key] ? 0 : -90 }}
                          transition={{ duration: 0.5 }}
                        >
                          <FiChevronDown size={16} />
                        </motion.span>
                      )}
                    </button>

                    <AnimatePresence>
                      {(!isCollapsed && openSubmenus[item.key]) && (
                        <motion.ul
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.5 }}
                          className="pl-4 mt-1 space-y-1 overflow-hidden"
                        >
                          {item.submenu.map((subItem) => (
                            <li key={subItem.path}>
                              <Link
                                to={subItem.path}
                                className={`flex items-center p-2 rounded-lg transition-all ${isCollapsed ? 'w-fit justify-center' : 'w-full'} ${location.pathname === subItem.path ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:bg-gray-50'} font-[var(--font-satoshi-regular)]`}
                              >
                                {!isCollapsed && <span className="w-1 h-1 rounded-full bg-gray-400 mr-3" />}
                                <span>{isCollapsed ? null : subItem.label}</span>
                              </Link>
                            </li>
                          ))}
                        </motion.ul>
                      )}
                    </AnimatePresence>
                  </>
                ) : (
                  <Link
                    to={item.path}
                    className={`${isCollapsed ? 'w-fit flex justify-center' : 'w-full'} flex items-center p-3 rounded-lg transition-all ${isActive(item) ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-50'} font-[var(--font-satoshi-medium)]`}
                  >
                    <span className={`text-lg ${isActive(item) ? 'text-blue-600' : 'text-gray-500'}`}>
                      {item.icon}
                    </span>
                    {!isCollapsed && (
                      <span className="ml-3 font-bold font-[var(--font-satoshi-bold)]">{item.label}</span>
                    )}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-100">
          <div className={`flex items-center ${isCollapsed ? 'justify-center' : 'justify-between'}`}>
            {!isCollapsed && (
              <div>
                <p className="text-sm font-bold text-gray-800 font-[var(--font-satoshi-bold)]">Admin User</p>
                <p className="text-xs text-gray-500 font-[var(--font-satoshi-regular)]">admin@example.com</p>
              </div>
            )}
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center text-white font-[var(--font-satoshi-medium)]">
              <span className="text-sm font-medium">AU</span>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default Sidebar;
