import { useState, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import NoteCard from '../components/NoteCard';
import SearchBar from '../components/SearchBar';

export default function ReactPage() {
  const { notes } = useSelector((state: RootState) => state.notes);
  const [searchTerm, setSearchTerm] = useState('');
  
  const reactNotes = useMemo(() => {
    const filtered = notes.filter(note => note.category === 'react');
    
    if (!searchTerm) return filtered;
    
    return filtered.filter(note => 
      note.question.toLowerCase().includes(searchTerm.toLowerCase()) || 
      note.answer.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [notes, searchTerm]);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">React Notes</h1>
      
      <SearchBar 
        onSearch={setSearchTerm} 
        placeholder="Search React notes..." 
      />
      
      {reactNotes.length === 0 ? (
        <div className="text-center py-10">
          {searchTerm ? (
            <p className="text-gray-500 dark:text-gray-400">No React notes match your search.</p>
          ) : (
            <p className="text-gray-500 dark:text-gray-400">No React notes found.</p>
          )}
        </div>
      ) : (
        <div>
          {reactNotes.map(note => (
            <NoteCard key={note.id} note={note} />
          ))}
        </div>
      )}
    </div>
  );
}
