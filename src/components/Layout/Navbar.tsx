import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LogIn, LogOut, Menu, Moon, Sun, User } from 'lucide-react';
import { toggleTheme } from '../../store/slices/themeSlice';
import { logout } from '../../store/slices/authSlice';
import { RootState } from '../../store/store';
import AuthModal from '../Auth/AuthModal';

interface NavbarProps {
  toggleSidebar: () => void;
  sidebarOpen: boolean;
}

export default function Navbar({ toggleSidebar, sidebarOpen }: NavbarProps) {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const dispatch = useDispatch();
  const { darkMode } = useSelector((state: RootState) => state.theme);
  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);

  const handleToggleTheme = () => {
    dispatch(toggleTheme());
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-20 ${
        darkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-800'
      } shadow-md py-2 px-4 transition-all duration-300 ${
        sidebarOpen ? 'md:pl-64' : 'md:pl-4'
      }`}
    >
      <div className="flex items-center justify-between h-14">
        <div className="flex items-center">
          <button
            id="hamburger-button"
            onClick={toggleSidebar}
            className="p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700"
            aria-label="Toggle sidebar"
          >
            <Menu size={24} />
          </button>

          <h1 className="text-xl font-bold ml-4">R&N QBanks</h1>
        </div>

        <div className="flex items-center space-x-4">
          <button
            onClick={handleToggleTheme}
            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
            aria-label="Toggle theme"
          >
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          {isAuthenticated ? (
            <div className="flex items-center gap-3">
              <span className="hidden md:inline-block text-sm">
                {user?.isAdmin ? 'Admin' : 'User'}: {user?.username}
              </span>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-3 py-1.5 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700"
              >
                <LogOut size={18} />
                <span className="hidden md:inline-block">Logout</span>
              </button>
            </div>
          ) : (
            <button
              onClick={() => setShowAuthModal(true)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700"
            >
              <LogIn size={18} />
              <span className="hidden md:inline-block">Login</span>
            </button>
          )}
        </div>
      </div>

      {showAuthModal && (
        <AuthModal onClose={() => setShowAuthModal(false)} />
      )}
    </header>
  );
}
