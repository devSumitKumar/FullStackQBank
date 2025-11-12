import { useSelector } from 'react-redux';
import './GlobalLoader.css';
import { RootState } from '../../../store/store';
import { Loader } from 'lucide-react';
import './GlobalLoader.css'


const GlobalLoader = () => {
    const isLoading = useSelector((state: RootState) => state.loader.loading);

    if (!isLoading) return null;

    return (
        <>
            <div className="loader-overlay">
                <div className="spinner">
                    <Loader size={18} className="animate-spin mr-2" />
                </div>
            </div>
        </>
    );
};



export default GlobalLoader;
