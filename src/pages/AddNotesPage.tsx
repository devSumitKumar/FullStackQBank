import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addNote } from '../store/slices/notesSlice';
import { RootState } from '../store/store';

export default function AddNotesPage() {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [category, setCategory] = useState<'react' | 'nodejs' | 'mobileapp' | 'code'>('react');
  const [code, setCode] = useState('');
  const [formError, setFormError] = useState('');
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { darkMode } = useSelector((state: RootState) => state.theme);
  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);

  // Redirect if not admin
  if (!isAuthenticated || !user?.isAdmin) {
    navigate('/');
    return null;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!question.trim()) {
      setFormError('Question is required');
      return;
    }
    
    if (!answer.trim()) {
      setFormError('Answer is required');
      return;
    }
    
    const newNote = {
      id: Date.now().toString(),
      question,
      answer,
      category,
      code: category === 'code' ? code : undefined,
      createdAt: new Date().toISOString(),
    };
    
    dispatch(addNote(newNote));
    
    // Reset form
    setQuestion('');
    setAnswer('');
    setCategory('react');
    setCode('');
    setFormError('');
    
    // Navigate to the appropriate page
    navigate(`/${category}`);
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Add New Note</h1>
      
      <form onSubmit={handleSubmit} className="max-w-2xl">
        {formError && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            {formError}
          </div>
        )}
        
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value as any)}
            className={`w-full p-3 border rounded-md ${
              darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
            }`}
          >
            <option value="react">React</option>
            <option value="nodejs">NodeJS</option>
            <option value="mobileapp">Mobile App</option>
            <option value="code">Code</option>
          </select>
        </div>
        
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Question</label>
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            className={`w-full p-3 border rounded-md ${
              darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
            }`}
            placeholder="Enter your question"
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Answer</label>
          <textarea
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            className={`w-full p-3 border rounded-md min-h-[150px] ${
              darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
            }`}
            placeholder="Enter your answer"
          />
        </div>
        
        {category === 'code' && (
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Code Snippet</label>
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className={`w-full p-3 border rounded-md font-mono min-h-[200px] ${
                darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
              }`}
              placeholder="// Enter your code here"
            />
          </div>
        )}
        
        <div className="mt-6">
          <button
            type="submit"
            className={`px-6 py-3 rounded-md transition-colors ${
              darkMode 
                ? 'bg-blue-700 hover:bg-blue-600 text-white' 
                : 'bg-blue-600 hover:bg-blue-700 text-white'
            }`}
          >
            Add Note
          </button>
        </div>
      </form>
    </div>
  );
}
