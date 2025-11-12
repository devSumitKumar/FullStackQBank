import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../../store/store';
import useCategory from '../../hooks/servicecalls/useCategory';

interface TileProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  path: string;
}

const Tile = ({ title, description, icon, path }: TileProps) => {
  const navigate = useNavigate();
  const { darkMode } = useSelector((state: RootState) => state.theme);
  
  return (
    <div 
      className={`relative overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer ${
        darkMode ? 'bg-gray-800 hover:bg-gray-750' : 'bg-white hover:bg-gray-50'
      }`}
      onClick={() => navigate(path)}
    >
      <div className="p-6">
        <div className="flex items-center mb-4">
          <div className={`p-2 rounded-full ${darkMode ? 'bg-blue-900' : 'bg-blue-100'}`}>
            {icon}
          </div>
          <h3 className="ml-3 text-xl font-semibold">{title}</h3>
        </div>
        <p className={`mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>{description}</p>
        <button 
          className={`px-4 py-2 rounded-md transition-colors ${
            darkMode 
              ? 'bg-blue-700 hover:bg-blue-600 text-white' 
              : 'bg-blue-600 hover:bg-blue-700 text-white'
          }`}
        >
          View All
        </button>
      </div>
    </div>
  );
};

export default function HomePage() {
  const { darkMode } = useSelector((state: RootState) => state.theme);
  const { categoryListPath } = useCategory();
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">R&N QBanks</h1>
        <p className={darkMode ? 'text-gray-300' : 'text-gray-600'}>
          Your comprehensive guide to web and mobile development technologies
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categoryListPath.map((tile) => (
          <Tile
            key={tile.title}
            title={tile.title}
            description={tile.description}
            icon={tile.icon}
            path={tile.path}
          />
        ))}
      </div>
    </div>
  );
}
