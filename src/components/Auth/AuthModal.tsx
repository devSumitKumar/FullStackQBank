import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Loader, X } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { loginSuccess, signupSuccess, loginFailure, signupFailure } from '../../store/slices/authSlice';
import toast from 'react-hot-toast';

interface AuthModalProps {
  onClose: () => void;
}

type FormData = {
  username: string;
  password: string;
  confirmPassword?: string;
  specialCode?: string;
  rememberMe?: boolean;
};

// Simulated API call
const simulateApiCall = (data: any, success: boolean = true): Promise<any> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (success) {
        resolve({
          id: Math.random().toString(36).substr(2, 9),
          username: data.username,
          isAdmin: data.username.toLowerCase() === 'admin' || data.specialCode === 'ADMIN123'
        });
      } else {
        reject(new Error('Authentication failed. Please check your credentials.'));
      }
    }, 1500); // 1.5 seconds delay to simulate network request
  });
};

export default function AuthModal({ onClose }: AuthModalProps) {
  const [activeTab, setActiveTab] = useState<'login' | 'signup'>('login');
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  
  const { 
    register, 
    handleSubmit, 
    formState: { errors },
    watch,
    reset
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    
    try {
      if (activeTab === 'login') {
        // Simulate failed login for specific test case
        const shouldFail = data.username.toLowerCase() === 'fail';
        
        if (shouldFail) {
          throw new Error('Invalid credentials');
        }
        
        const user = await simulateApiCall(data);
        dispatch(loginSuccess(user));
        toast.success(`Welcome back, ${user.username}!`);
        onClose();
      } else {
        // Signup validation
        if (data.password !== data.confirmPassword) {
          toast.error('Passwords do not match');
          setIsLoading(false);
          return;
        }
        
        const user = await simulateApiCall(data);
        dispatch(signupSuccess(user));
        toast.success('Account created successfully!');
        onClose();
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
      toast.error(errorMessage);
      
      if (activeTab === 'login') {
        dispatch(loginFailure(errorMessage));
      } else {
        dispatch(signupFailure(errorMessage));
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleTabChange = (tab: 'login' | 'signup') => {
    setActiveTab(tab);
    reset();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-md mx-4">
        <div className="flex justify-between items-center p-4 border-b dark:border-gray-700">
          <h2 className="text-xl font-semibold dark:text-white">
            {activeTab === 'login' ? 'Login to Your Account' : 'Create New Account'}
          </h2>
          <button 
            onClick={onClose}
            className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
            disabled={isLoading}
          >
            <X size={20} />
          </button>
        </div>
        
        <div className="flex border-b dark:border-gray-700">
          <button
            className={`flex-1 py-3 font-medium ${
              activeTab === 'login' 
                ? 'text-blue-600 border-b-2 border-blue-600 dark:text-blue-400 dark:border-blue-400' 
                : 'text-gray-500 dark:text-gray-400'
            }`}
            onClick={() => handleTabChange('login')}
            disabled={isLoading}
          >
            Login
          </button>
          <button
            className={`flex-1 py-3 font-medium ${
              activeTab === 'signup' 
                ? 'text-blue-600 border-b-2 border-blue-600 dark:text-blue-400 dark:border-blue-400' 
                : 'text-gray-500 dark:text-gray-400'
            }`}
            onClick={() => handleTabChange('signup')}
            disabled={isLoading}
          >
            Sign Up
          </button>
        </div>
        
        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Username
            </label>
            <input
              type="text"
              className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
              {...register('username', { 
                required: 'Username is required',
                minLength: {
                  value: 3,
                  message: 'Username must be at least 3 characters'
                }
              })}
              disabled={isLoading}
            />
            {errors.username && (
              <p className="mt-1 text-sm text-red-600">{errors.username.message}</p>
            )}
            {activeTab === 'login' && (
              <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                (Try "admin" for admin access or "fail" to test error handling)
              </p>
            )}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Password
            </label>
            <input
              type="password"
              className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
              {...register('password', { 
                required: 'Password is required',
                minLength: {
                  value: 6,
                  message: 'Password must be at least 6 characters'
                }
              })}
              disabled={isLoading}
            />
            {errors.password && (
              <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
            )}
          </div>
          
          {activeTab === 'signup' && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Confirm Password
                </label>
                <input
                  type="password"
                  className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
                  {...register('confirmPassword', { 
                    required: 'Please confirm your password',
                    validate: value => value === watch('password') || 'Passwords do not match'
                  })}
                  disabled={isLoading}
                />
                {errors.confirmPassword && (
                  <p className="mt-1 text-sm text-red-600">{errors.confirmPassword.message}</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Special Code (Optional)
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
                  {...register('specialCode')}
                  disabled={isLoading}
                />
                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                  Use "ADMIN123" for admin access in this demo
                </p>
              </div>
            </>
          )}
          
          {activeTab === 'login' && (
            <div className="flex items-center">
              <input
                type="checkbox"
                id="remember-me"
                className="h-4 w-4 text-blue-600 rounded"
                {...register('rememberMe')}
                disabled={isLoading}
              />
              <label htmlFor="remember-me" className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                Remember me
              </label>
            </div>
          )}
          
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md shadow transition duration-200 flex items-center justify-center"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader size={18} className="animate-spin mr-2" />
                <span>{activeTab === 'login' ? 'Logging in...' : 'Signing up...'}</span>
              </>
            ) : (
              <span>{activeTab === 'login' ? 'Login' : 'Sign Up'}</span>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
