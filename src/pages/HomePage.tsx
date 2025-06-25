import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Code, FileCode, Mail, MessageSquare, Server, Smartphone } from 'lucide-react';
import { RootState } from '../store/store';

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
  
  const tiles = [
    {
      title: 'React',
      description: 'A JavaScript library for building user interfaces with reusable components.',
      icon: <Code size={24} className={darkMode ? 'text-blue-400' : 'text-blue-600'} />,
      path: '/react'
    },
    {
      title: 'NodeJS',
      description: 'A JavaScript runtime built on Chrome\'s V8 engine for server-side applications.',
      icon: <Server size={24} className={darkMode ? 'text-blue-400' : 'text-blue-600'} />,
      path: '/nodejs'
    },
    {
      title: 'MobileApp',
      description: 'Build native mobile applications using React Native and other frameworks.',
      icon: <Smartphone size={24} className={darkMode ? 'text-blue-400' : 'text-blue-600'} />,
      path: '/mobileapp'
    },
    {
      title: 'Codes',
      description: 'Snippets and examples for various programming challenges and solutions.',
      icon: <FileCode size={24} className={darkMode ? 'text-blue-400' : 'text-blue-600'} />,
      path: '/codes'
    },
    {
      title: 'Feedback',
      description: 'Share your thoughts and suggestions to help us improve our platform.',
      icon: <MessageSquare size={24} className={darkMode ? 'text-blue-400' : 'text-blue-600'} />,
      path: '/feedback'
    },
    {
      title: 'Contact Us',
      description: 'Get in touch with our team for support, partnerships, or general inquiries.',
      icon: <Mail size={24} className={darkMode ? 'text-blue-400' : 'text-blue-600'} />,
      path: '/contact'
    }
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">R&N QBanks</h1>
        <p className={darkMode ? 'text-gray-300' : 'text-gray-600'}>
          Your comprehensive guide to web and mobile development technologies
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tiles.map((tile) => (
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
