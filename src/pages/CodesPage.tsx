import { useState, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import NoteCard from '../components/NoteCard';
import SearchBar from '../components/SearchBar';

export default function CodesPage() {
  const { notes } = useSelector((state: RootState) => state.notes);
  const [searchTerm, setSearchTerm] = useState('');
  
  const codeNotes = useMemo(() => {
    const filtered = notes.filter(note => note.category === 'code');
    
    if (!searchTerm) return filtered;
    
    return filtered.filter(note => 
      note.question.toLowerCase().includes(searchTerm.toLowerCase()) || 
      note.answer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (note.code && note.code.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  }, [notes, searchTerm]);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Code Snippets</h1>
      
      <SearchBar 
        onSearch={setSearchTerm} 
        placeholder="Search code snippets..." 
      />
      
      {codeNotes.length === 0 ? (
        <div className="text-center py-10">
          {searchTerm ? (
            <p className="text-gray-500 dark:text-gray-400">No code snippets match your search.</p>
          ) : (
            <p className="text-gray-500 dark:text-gray-400">No code snippets found.</p>
          )}
        </div>
      ) : (
        <div>
          {codeNotes.map(note => (
            <NoteCard key={note.id} note={note} />
          ))}
        </div>
      )}
    </div>
  );
}
