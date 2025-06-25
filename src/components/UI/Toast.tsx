import { Toaster } from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';

export default function Toast() {
  const { darkMode } = useSelector((state: RootState) => state.theme);
  
  return (
    <Toaster
      position="top-right"
      toastOptions={{
        duration: 4000,
        style: {
          background: darkMode ? '#374151' : '#ffffff',
          color: darkMode ? '#ffffff' : '#1f2937',
          boxShadow: '0 3px 10px rgba(0, 0, 0, 0.1)',
          padding: '16px',
          borderRadius: '8px',
        },
        success: {
          iconTheme: {
            primary: '#10B981',
            secondary: '#ffffff',
          },
        },
        error: {
          iconTheme: {
            primary: '#EF4444',
            secondary: '#ffffff',
          },
        },
      }}
    />
  );
}
