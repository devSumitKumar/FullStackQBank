import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';

export default function NotFoundPage() {
  const navigate = useNavigate();
  const { darkMode } = useSelector((state: RootState) => state.theme);

  return (
    <div className="flex flex-col items-center justify-center h-[70vh] text-center">
      <h1 className="text-9xl font-bold text-gray-200 dark:text-gray-800">404</h1>
      <div className={`text-2xl font-semibold mb-4 -mt-12 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
        Page Not Found
      </div>
      <p className={`mb-8 max-w-md ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
        The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
      </p>
      <button
        onClick={() => navigate('/')}
        className={`px-6 py-3 rounded-md transition-colors ${
          darkMode 
            ? 'bg-blue-700 hover:bg-blue-600 text-white' 
            : 'bg-blue-600 hover:bg-blue-700 text-white'
        }`}
      >
        Go to Homepage
      </button>
    </div>
  );
}
