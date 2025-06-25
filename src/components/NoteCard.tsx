import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Check, Squircle } from 'lucide-react';
import { updateNote } from '../store/slices/notesSlice';
import { Note } from '../types';
import { RootState } from '../store/store';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { a11yDark, a11yLight } from 'react-syntax-highlighter/dist/esm/styles/hljs';

interface NoteCardProps {
  note: Note;
}

export default function NoteCard({ note }: NoteCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedAnswer, setEditedAnswer] = useState(note.answer);
  const [editedCode, setEditedCode] = useState(note.code || '');
  
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);
  const { darkMode } = useSelector((state: RootState) => state.theme);
  
  const isAdmin = isAuthenticated && user?.isAdmin;

  const handleUpdate = () => {
    dispatch(updateNote({
      ...note,
      answer: editedAnswer,
      code: note.category === 'code' ? editedCode : note.code
    }));
    setIsEditing(false);
  };

  return (
    <div className={`mb-8 rounded-lg shadow-lg overflow-hidden ${
      darkMode ? 'bg-gray-800' : 'bg-white'
    }`}>
      <div className="p-8">
        <h3 className={`text-2xl font-bold mb-4 pb-2 border-b ${
          darkMode ? 'text-blue-300 border-gray-700' : 'text-blue-700 border-gray-300'
        }`}>{note.question}</h3>
        
        {isEditing ? (
          <div className="space-y-4">
            <textarea
              value={editedAnswer}
              onChange={(e) => setEditedAnswer(e.target.value)}
              className={`w-full p-3 border rounded-md min-h-[100px] ${
                darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
              }`}
            />
            
            {note.category === 'code' && (
              <textarea
                value={editedCode}
                onChange={(e) => setEditedCode(e.target.value)}
                className={`w-full p-3 border rounded-md font-mono min-h-[150px] ${
                  darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
                }`}
              />
            )}
            
            <div className="flex justify-end">
              <button
                onClick={handleUpdate}
                className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
              >
                <Check size={16} />
                Update
              </button>
            </div>
          </div>
        ) : (
          <>
            <p className={`mb-6 text-lg leading-relaxed ${
              darkMode ? 'text-gray-300' : 'text-gray-700'
            }`}>{note.answer}</p>
            
            {note.category === 'code' && note.code && (
              <div className="mb-4">
                <SyntaxHighlighter
                  language="javascript"
                  style={darkMode ? a11yDark : a11yLight}
                  className="rounded-md"
                >
                  {note.code}
                </SyntaxHighlighter>
              </div>
            )}
            
            {isAdmin && (
              <div className="flex justify-end">
                <button
                  onClick={() => setIsEditing(true)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-md ${
                    darkMode 
                      ? 'bg-blue-700 hover:bg-blue-600 text-white' 
                      : 'bg-blue-600 hover:bg-blue-700 text-white'
                  }`}
                >
                  <Squircle size={16} />
                  Edit
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
