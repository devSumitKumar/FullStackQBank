import React, { useState } from 'react';
import { Plus,  Sparkles } from 'lucide-react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
 export default function AddCategoryScreen  ()  {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const { darkMode } = useSelector((state: RootState) => state.theme);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim() || !description.trim()) {
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call delay for better UX
    await new Promise(resolve => setTimeout(resolve, 800));

    setShowSuccess(true);
    
    // Reset form after success animation
    setTimeout(() => {
      setTitle('');
      setDescription('');
      setIsSubmitting(false);
      setShowSuccess(false);
    }, 2000);
  };

  const handleReset = () => {
    setTitle('');
    setDescription('');
    setShowSuccess(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 relative overflow-hidden">
 

      <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
        <div className="w-full max-w-2xl">         

          {/* Form Card */}
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 md:p-12 shadow-2xl border border-white/20 relative overflow-hidden">
            {/* Success overlay */}
            {showSuccess && (
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-3xl flex items-center justify-center z-20 animate-fade-in">
                <div className="text-center text-white">
                  <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 rounded-full mb-4 animate-bounce">
                    <Sparkles size={32} />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">Category Created!</h3>
                  <p className="text-emerald-100">Your new category has been added successfully.</p>
                </div>
              </div>
            )}

            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-full -translate-y-16 translate-x-16 opacity-50"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-purple-100 to-pink-100 rounded-full translate-y-12 -translate-x-12 opacity-50"></div>

            <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
              <div className="space-y-6">
                <div>
                  <label htmlFor="title" className="block text-lg font-semibold text-gray-800 mb-3">
                    Category Title
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      id="title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="Enter a descriptive title..."
                      className={`w-full p-3 border rounded-md ${
              darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
            }`}
                      required
                      disabled={isSubmitting}
                    />
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-indigo-500/5 to-purple-500/5 pointer-events-none opacity-0 transition-opacity duration-300 peer-focus:opacity-100"></div>
                  </div>
                </div>
                
                <div>
                  
                  <label htmlFor="description" className="block text-lg font-semibold text-gray-800 mb-3">
                    Description
                  </label>
                  <div className="relative">
                    <textarea
                      id="description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Describe what this category will contain..."
                      rows={5}
                      className={`w-full p-3 border rounded-md min-h-[150px] ${
              darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
            }`}
                      required
                      disabled={isSubmitting}
                    />
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting || !title.trim() || !description.trim()}
                  className="flex-1 group relative bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-4 rounded-2xl font-semibold text-lg hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 shadow-xl hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02] active:scale-[0.98]"
                >
                  <div className="flex items-center justify-center gap-3">
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        <span>Creating...</span>
                      </>
                    ) : (
                      <>
                        <Plus size={20} className="group-hover:rotate-90 transition-transform duration-300" />
                        <span>Create Category</span>
                      </>
                    )}
                  </div>
                  <div className="absolute inset-0 rounded-2xl bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </button>
                
                <button
                  type="button"
                  onClick={handleReset}
                  disabled={isSubmitting}
                  className="px-8 py-4 border-2 border-gray-300 text-gray-700 rounded-2xl font-semibold text-lg hover:bg-gray-50 hover:border-gray-400 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02] active:scale-[0.98]"
                >
                  Reset
                </button>
              </div>
            </form>
          </div>

        
        </div>
      </div>
    </div>
  );
};

