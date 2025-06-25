import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Note } from '../../types';

interface NotesState {
  notes: Note[];
  isLoading: boolean;
  error: string | null;
}

// Mock data for initial state
const mockNotes: Note[] = [
  {
    id: '1',
    question: 'What is React?',
    answer: 'React is a JavaScript library for building user interfaces, particularly single-page applications.',
    category: 'react',
    createdAt: new Date().toISOString(),
  },
  {
    id: '2',
    question: 'What are React Hooks?',
    answer: 'Hooks are functions that let you "hook into" React state and lifecycle features from function components.',
    category: 'react',
    createdAt: new Date().toISOString(),
  },
  {
    id: '3',
    question: 'What is Node.js?',
    answer: 'Node.js is a JavaScript runtime built on Chrome\'s V8 JavaScript engine for building scalable network applications.',
    category: 'nodejs',
    createdAt: new Date().toISOString(),
  },
  {
    id: '4',
    question: 'What is Express.js?',
    answer: 'Express is a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications.',
    category: 'nodejs',
    createdAt: new Date().toISOString(),
  },
  {
    id: '5',
    question: 'What is React Native?',
    answer: 'React Native is a framework for building native mobile apps using React and JavaScript.',
    category: 'mobileapp',
    createdAt: new Date().toISOString(),
  },
  {
    id: '6',
    question: 'How to implement Dark Mode in React?',
    answer: 'You can implement dark mode using CSS variables, styled-components, or context API to manage the theme state.',
    category: 'code',
    code: `// Using React Context
const ThemeContext = React.createContext();

function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light');
  
  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };
  
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}`,
    createdAt: new Date().toISOString(),
  },
];

const initialState: NotesState = {
  notes: mockNotes,
  isLoading: false,
  error: null,
};

const notesSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    addNote: (state, action: PayloadAction<Note>) => {
      state.notes.unshift(action.payload);
    },
    updateNote: (state, action: PayloadAction<Note>) => {
      const index = state.notes.findIndex((note) => note.id === action.payload.id);
      if (index !== -1) {
        state.notes[index] = action.payload;
      }
    },
    deleteNote: (state, action: PayloadAction<string>) => {
      state.notes = state.notes.filter((note) => note.id !== action.payload);
    },
  },
});

export const { addNote, updateNote, deleteNote } = notesSlice.actions;

export default notesSlice.reducer;
