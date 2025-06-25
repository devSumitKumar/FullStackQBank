import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Code, FileCode, House, Mail, MessageSquare, Pencil, Server, Smartphone, X } from 'lucide-react';
import { RootState } from '../../store/store';

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

export default function Sidebar({ isOpen, toggleSidebar }: SidebarProps) {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);
  const { darkMode } = useSelector((state: RootState) => state.theme);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const menuItems = [
    { name: 'House', path: '/', icon: <House size={20} /> },
    { name: 'React', path: '/react', icon: <Code size={20} /> },
    { name: 'NodeJS', path: '/nodejs', icon: <Server size={20} /> },
    { name: 'MobileApp', path: '/mobileapp', icon: <Smartphone size={20} /> },
    { name: 'Codes', path: '/codes', icon: <FileCode size={20} /> },
    { name: 'Feedback', path: '/feedback', icon: <MessageSquare size={20} /> },
    { name: 'Contact Us', path: '/contact', icon: <Mail size={20} /> },
  ];

  // Add Notes menu item for admin users only
  if (isAuthenticated && user?.isAdmin) {
    menuItems.splice(5, 0, {
      name: 'Add Notes',
      path: '/add-notes',
      icon: <Pencil size={20} />
    });
  }

  const closeOnMobileClick = () => {
    if (isMobile) {
      toggleSidebar();
    }
  };

  return (
    <div
      className={`fixed top-0 left-0 h-full z-30 transition-all duration-300 ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-800'
        } ${isOpen ? 'translate-x-0' : '-translate-x-full'} 
      shadow-lg md:shadow-none md:w-64`}
    >

      <nav className="p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                onClick={closeOnMobileClick}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-md transition-colors ${isActive
                    ? (darkMode ? 'bg-blue-900 text-white' : 'bg-blue-100 text-blue-800')
                    : (darkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-100')
                  }`
                }
              >
                {item.icon}
                <span>{item.name}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
