import { useState } from 'react';
import { Search, X } from 'lucide-react';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';

interface SearchBarProps {
  onSearch: (searchTerm: string) => void;
  placeholder?: string;
}

export default function SearchBar({ onSearch, placeholder = 'Search notes...' }: SearchBarProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const { darkMode } = useSelector((state: RootState) => state.theme);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch(value);
  };

  const clearSearch = () => {
    setSearchTerm('');
    onSearch('');
  };

  return (
    <div className={`relative mb-6 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <Search size={18} className="text-gray-500 dark:text-gray-400" />
        </div>
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearch}
          className={`block w-full p-3 pl-10 pr-10 rounded-lg border ${
            darkMode 
              ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-400' 
              : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
          } focus:ring-blue-500 focus:border-blue-500 transition-colors`}
          placeholder={placeholder}
        />
        {searchTerm && (
          <button
            onClick={clearSearch}
            className="absolute inset-y-0 right-0 flex items-center pr-3"
          >
            <X size={18} className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300" />
          </button>
        )}
      </div>
    </div>
  );
}
